import { useState, useEffect } from 'react'

export function useViewMode() {
  const [viewMode, setViewMode] = useState(() => {
    const saved = localStorage.getItem('viewMode')
    return saved || 'design'
  })

  useEffect(() => {
    localStorage.setItem('viewMode', viewMode)
    if (viewMode === 'code') {
      document.documentElement.classList.add('code-mode')
    } else {
      document.documentElement.classList.remove('code-mode')
    }
  }, [viewMode])

  const toggleViewMode = () => {
    setViewMode(prev => prev === 'design' ? 'code' : 'design')
  }

  return { viewMode, toggleViewMode }
}
