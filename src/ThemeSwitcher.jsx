import { useEffect, useState } from 'react'

const THEMES = [
  { id: 'original', label: 'Original', swatch: '#8B5A2B' },
  { id: 'cool-tech', label: 'Cool Tech', swatch: '#3D5A80' },
  { id: 'forest', label: 'Forest', swatch: '#4A6B3E' },
  { id: 'monochrome', label: 'Monochrome', swatch: '#FF4B1F' },
]

const STORAGE_KEY = 'theme-preview'

export default function ThemeSwitcher() {
  const [active, setActive] = useState('original')

  useEffect(() => {
    const stored = localStorage.getItem(STORAGE_KEY) || 'original'
    document.documentElement.dataset.theme = stored
    setActive(stored)
  }, [])

  function selectTheme(id) {
    document.documentElement.dataset.theme = id
    localStorage.setItem(STORAGE_KEY, id)
    setActive(id)
  }

  return (
    <div
      style={{
        position: 'fixed',
        bottom: '16px',
        right: '16px',
        zIndex: 9999,
        display: 'flex',
        gap: '8px',
        padding: '8px',
        borderRadius: '999px',
        background: 'rgba(20,20,20,0.85)',
        backdropFilter: 'blur(8px)',
      }}
    >
      {THEMES.map((theme) => (
        <button
          key={theme.id}
          type="button"
          onClick={() => selectTheme(theme.id)}
          title={theme.label}
          style={{
            width: '28px',
            height: '28px',
            borderRadius: '50%',
            background: theme.swatch,
            border: active === theme.id ? '2px solid white' : '2px solid transparent',
            cursor: 'pointer',
            padding: 0,
          }}
        />
      ))}
    </div>
  )
}
