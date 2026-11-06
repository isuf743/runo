import { createContext, useCallback, useContext, useEffect, useMemo, useReducer, useState } from 'react'

const BagContext = createContext(null)
const STORAGE_KEY = 'runo-bag'

function reducer(state, action) {
  switch (action.type) {
    case 'add': {
      const key = `${action.item.id}:${action.item.color}`
      const existing = state.find((l) => l.key === key)
      if (existing) return state.map((l) => (l.key === key ? { ...l, qty: l.qty + 1 } : l))
      return [...state, { ...action.item, key, qty: 1 }]
    }
    case 'qty':
      return state
        .map((l) => (l.key === action.key ? { ...l, qty: Math.max(0, l.qty + action.delta) } : l))
        .filter((l) => l.qty > 0)
    case 'remove':
      return state.filter((l) => l.key !== action.key)
    default:
      return state
  }
}

function loadInitial() {
  try {
    const raw = localStorage.getItem(STORAGE_KEY)
    return raw ? JSON.parse(raw) : []
  } catch {
    return []
  }
}

export function BagProvider({ children }) {
  const [lines, dispatch] = useReducer(reducer, undefined, loadInitial)
  const [isOpen, setOpen] = useState(false)
  const [lastAdded, setLastAdded] = useState(null)

  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(lines))
    } catch {
      /* storage unavailable — bag still works for this visit */
    }
  }, [lines])

  const add = useCallback((item) => {
    dispatch({ type: 'add', item })
    setLastAdded({ ...item, at: Date.now() })
  }, [])

  const value = useMemo(() => {
    const count = lines.reduce((n, l) => n + l.qty, 0)
    const allPriced = lines.length > 0 && lines.every((l) => typeof l.price === 'number')
    const subtotal = allPriced ? lines.reduce((s, l) => s + l.price * l.qty, 0) : null
    return {
      lines,
      count,
      subtotal,
      isOpen,
      lastAdded,
      open: () => setOpen(true),
      close: () => setOpen(false),
      add,
      changeQty: (key, delta) => dispatch({ type: 'qty', key, delta }),
      remove: (key) => dispatch({ type: 'remove', key }),
    }
  }, [lines, isOpen, lastAdded, add])

  return <BagContext.Provider value={value}>{children}</BagContext.Provider>
}

export function useBag() {
  const ctx = useContext(BagContext)
  if (!ctx) throw new Error('useBag must be used inside <BagProvider>')
  return ctx
}
