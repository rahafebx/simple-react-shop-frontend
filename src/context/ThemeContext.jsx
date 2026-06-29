import { createContext, useEffect, useState } from 'react'

// eslint-disable-next-line react-refresh/only-export-components
export const ThemeContext = createContext(null)

function getInitialTheme() {
  const stored = localStorage.getItem('ebx-theme')
  if (stored === 'dark' || stored === 'light') return stored
  return 'system'
}

function resolveTheme(theme) {
  if (theme === 'system') {
    return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light'
  }
  return theme
}

export function ThemeProvider({ children }) {
  const [theme, setTheme] = useState(getInitialTheme)

  useEffect(() => {
    const resolved = resolveTheme(theme)
    document.documentElement.setAttribute('data-theme', resolved)
    localStorage.setItem('ebx-theme', theme)
  }, [theme])

  useEffect(() => {
    if (theme !== 'system') return
    const mq = window.matchMedia('(prefers-color-scheme: dark)')
    const handler = () => {
      document.documentElement.setAttribute('data-theme', resolveTheme('system'))
    }
    mq.addEventListener('change', handler)
    return () => mq.removeEventListener('change', handler)
  }, [theme])

  return (
    <ThemeContext.Provider value={{ theme, setTheme }}>
      {children}
    </ThemeContext.Provider>
  )
}
