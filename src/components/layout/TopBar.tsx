'use client'

import { Menu } from 'lucide-react'
import Link from 'next/link'

interface TopBarProps {
  onMenuClick: () => void
  title?: string
}

export default function TopBar({ onMenuClick, title }: TopBarProps) {
  return (
    <header
      style={{
        height: '64px',
        background: 'var(--bg-surface)',
        borderBottom: '1px solid var(--border-subtle)',
        display: 'flex',
        alignItems: 'center',
        padding: '0 1.5rem',
        gap: '1rem',
        position: 'sticky',
        top: 0,
        zIndex: 40,
      }}
    >
      <button
        className="btn btn-ghost btn-sm"
        onClick={onMenuClick}
        style={{ padding: '0.5rem' }}
        aria-label="Toggle menu"
      >
        <Menu size={20} />
      </button>

      {title && (
        <h1 style={{ fontSize: '1.1rem', fontWeight: 700, color: 'var(--text-primary)', margin: 0 }}>
          {title}
        </h1>
      )}

      <div style={{ flex: 1 }} />

      <Link href="/profile" className="btn btn-ghost btn-sm" style={{ padding: '0.5rem', borderRadius: '50%' }} aria-label="Profile">
        <div
          style={{
            width: 32,
            height: 32,
            borderRadius: '50%',
            background: 'linear-gradient(135deg, var(--brand-400), var(--accent-400))',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            color: 'white',
            fontSize: '0.8rem',
            fontWeight: 700,
          }}
        >
          U
        </div>
      </Link>
    </header>
  )
}
