import { Sun, Moon, Monitor } from 'lucide-react'
import { useTheme } from '../context/ThemeContext'

const modes = [
  { value: 'light', icon: Sun, label: 'Light mode' },
  { value: 'dark', icon: Moon, label: 'Dark mode' },
  { value: 'system', icon: Monitor, label: 'System mode' },
]

export default function ThemeToggle({ className = '' }) {
  const { theme, setTheme } = useTheme()
  const current = modes.find((m) => m.value === theme) || modes[0]
  const next = modes[(modes.indexOf(current) + 1) % modes.length]

  return (
    <button
      onClick={() => setTheme(next.value)}
      className={`flex items-center justify-center rounded-lg p-2 text-black dark:text-white transition-colors cursor-pointer ${className}`}
      aria-label={`Switch to ${next.label}`}
      title={current.label}
    >
      <current.icon size={20} aria-hidden="true" />
    </button>
  )
}
