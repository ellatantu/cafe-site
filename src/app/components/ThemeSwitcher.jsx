'use client'

import { useState, useEffect } from 'react'
import { getTheme, setTheme } from '@/lib/theme'

export default function ThemeSwitcher() {
  const [current, setCurrent] = useState(null)

  useEffect(() => {
    const stored = getTheme()
    setCurrent(stored)
    setTheme(stored)
  }, [])

  const toggle = () => {
    const next = current === 'light' ? 'dark' : 'light'
    setCurrent(next)
    setTheme(next)
  }

  if (current === null) return null

  return (
    <button onClick={toggle} className="w-9 h-9 rounded-full border border-white/30 flex items-center justify-center text-sm hover:bg-white/10 transition">
      {current === 'light' ? '🌙' : '☀️'}
    </button>
  )
}