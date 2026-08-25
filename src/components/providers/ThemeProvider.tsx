'use client'

import { createContext, useContext, useEffect, useState } from 'react'

type Theme = 'light' | 'dark'

interface ThemeContextType {
  theme: Theme
  toggleTheme: () => void
}

const ThemeContext = createContext<ThemeContextType>({
  theme: 'dark',
  toggleTheme: () => {},
})

export function ThemeProvider({ children }: { children: React.ReactNode }) {
  const [theme, setTheme] = useState<Theme>('dark')
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    const applyStoredTheme = (stored: Theme | null) => {
      if (!stored) return
      setTheme(stored)
      document.documentElement.classList.toggle('dark', stored === 'dark')
    }

    const stored = localStorage.getItem('healthedu-theme') as Theme | null
    if (stored) {
      applyStoredTheme(stored)
    } else {
      // Default dark mode
      document.documentElement.classList.add('dark')
    }

    const raf = requestAnimationFrame(() => setMounted(true))
    return () => cancelAnimationFrame(raf)
  }, [])

  const toggleTheme = () => {
    const next = theme === 'dark' ? 'light' : 'dark'
    setTheme(next)
    localStorage.setItem('healthedu-theme', next)
    document.documentElement.classList.toggle('dark', next === 'dark')
  }

  if (!mounted) return <>{children}</>

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  )
}

export function useTheme() {
  return useContext(ThemeContext)
}
