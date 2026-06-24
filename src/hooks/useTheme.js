import { useState, useEffect } from 'react'

export function useTheme() {
  const [isDark, setIsDark] = useState(() => {
    if (typeof window !== 'undefined') {
      const saved = localStorage.getItem('theme')
      // If user has a saved preference, use it; otherwise default to dark
      if (saved === 'light') return false
      return true // dark by default on first visit
    }
    return true
  })

  useEffect(() => {
    const root = document.documentElement
    if (isDark) { root.classList.add('dark') } else { root.classList.remove('dark') }
    localStorage.setItem('theme', isDark ? 'dark' : 'light')
  }, [isDark])

  return { isDark, toggle: () => setIsDark(v => !v) }
}
