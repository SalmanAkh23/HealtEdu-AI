'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { useTheme } from '@/components/providers/ThemeProvider'
import { createClient } from '@/lib/supabase/client'
import { useRouter } from 'next/navigation'
import {
  LayoutDashboard, FileText,
  CheckSquare, User,
  LogOut, Sun, Moon, X, GraduationCap, Bot
} from 'lucide-react'
import BrandLogo from './BrandLogo'

const NAV_ITEMS = [
  { href: '/dashboard', label: 'Dashboard', icon: LayoutDashboard },
  { href: '/articles', label: 'Articles', icon: FileText },
  { href: '/learn', label: 'Learning Modules', icon: GraduationCap },
  { href: '/habits', label: 'Habit Tracker', icon: CheckSquare },
  { href: '/ai-assistant', label: 'AI Assistant', icon: Bot },
]

const BOTTOM_ITEMS = [
  { href: '/profile', label: 'Profile', icon: User },
]

interface SidebarProps {
  open: boolean
  onClose: () => void
}

export default function Sidebar({ open, onClose }: SidebarProps) {
  const pathname = usePathname()
  const { theme, toggleTheme } = useTheme()
  const router = useRouter()

  const handleLogout = async () => {
    const supabase = createClient()
    await supabase.auth.signOut()
    router.push('/')
  }

  return (
    <>
      {/* Mobile overlay */}
      {open && (
        <div
          className="lg:hidden"
          style={{
            position: 'fixed',
            inset: 0,
            background: 'hsla(220,30%,5%,0.5)',
            zIndex: 49,
          }}
          onClick={onClose}
        />
      )}

      <aside className={`sidebar ${open ? 'open' : ''}`}>
        {/* Logo */}
        <div style={{ padding: '1.5rem 1.25rem 1rem' }}>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
            <Link
              href="/dashboard"
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '0.625rem',
                textDecoration: 'none',
              }}
            >
              <BrandLogo size="compact" />
              <span
                style={{
                  fontFamily: '"Plus Jakarta Sans", sans-serif',
                  fontWeight: 800,
                  fontSize: '1.05rem',
                  background: 'linear-gradient(135deg, var(--brand-400), var(--accent-400))',
                  WebkitBackgroundClip: 'text',
                  WebkitTextFillColor: 'transparent',
                }}
              >
                HealthEdu AI
              </span>
            </Link>
            <button
              className="btn btn-ghost btn-sm lg:hidden"
              onClick={onClose}
              style={{ padding: '0.4rem' }}
              aria-label="Close sidebar"
            >
              <X size={18} />
            </button>
          </div>
        </div>

        <hr className="divider" style={{ margin: '0 1.25rem' }} />

        {/* Main Nav */}
        <nav style={{ flex: 1, padding: '0.75rem 0.875rem', overflowY: 'auto' }}>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '2px' }}>
            {NAV_ITEMS.map(({ href, label, icon: Icon }) => (
              <Link key={href} href={href} className={`nav-link ${pathname === href || pathname.startsWith(href + '/') ? 'active' : ''}`} onClick={onClose}>
                <Icon size={18} className="nav-icon" />
                {label}
              </Link>
            ))}
          </div>
        </nav>

        <hr className="divider" style={{ margin: '0 1.25rem' }} />

        {/* Bottom Nav */}
        <div style={{ padding: '0.75rem 0.875rem 1.5rem', display: 'flex', flexDirection: 'column', gap: '2px' }}>
          {BOTTOM_ITEMS.map(({ href, label, icon: Icon }) => (
            <Link key={href} href={href} className={`nav-link ${pathname === href ? 'active' : ''}`} onClick={onClose}>
              <Icon size={18} />
              {label}
            </Link>
          ))}
          <button className="nav-link" onClick={toggleTheme}>
            {theme === 'dark' ? <Sun size={18} /> : <Moon size={18} />}
            {theme === 'dark' ? 'Light Mode' : 'Dark Mode'}
          </button>
          <button className="nav-link" onClick={handleLogout} style={{ color: 'hsl(0,65%,52%)' }}>
            <LogOut size={18} />
            Sign Out
          </button>
        </div>
      </aside>
    </>
  )
}
