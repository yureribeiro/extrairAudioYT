'use client'
import React, { useState, createContext, useContext, useEffect } from 'react'

interface IContext {
  theme: string
  toogleTheme: () => void
}


export const ThemeContext = createContext<IContext>({
  theme: 'dark',
  toogleTheme: () => { },
});

export const useTheme = () => {
  const context = useContext(ThemeContext)
  if (context === undefined) {
    throw new Error('useTheme must be used within a ThemeProvider')
  }
  return context
}

export const ThemeProvider = ({ children }: {children: React.ReactNode}) => {
  const [theme, setTheme] = useState('dark');

  useEffect(() => {
    async function getTheme() {
      const hasTheme = localStorage.getItem('theme')
      if (!hasTheme) {
        localStorage.setItem('theme', 'dark')
      }
      const themeLocal = localStorage.getItem('theme') || 'dark'
      setTheme(themeLocal)
    }
    getTheme()
  }, [])

  const toogleTheme = () => {
    const newTheme = theme === 'dark' ? 'light' : 'dark'
    setTheme(newTheme)
    localStorage.setItem('theme', newTheme)
  }

  return (
    <ThemeContext.Provider value={{ theme, toogleTheme }}>{children}</ThemeContext.Provider>
  )
}