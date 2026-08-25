'use client'

import { useEffect } from 'react'

export function ForceLightTheme() {
  useEffect(() => {
    const wasDark = document.documentElement.classList.contains('dark')
    if (wasDark) document.documentElement.classList.remove('dark')
    return () => {
      if (wasDark) document.documentElement.classList.add('dark')
    }
  }, [])

  return null
}
