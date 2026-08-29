'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { useState } from 'react'
import {
  LayoutDashboard,
  FileText,
  GraduationCap,
  CheckSquare,
  Bot,
  User,
} from 'lucide-react'
import Sidebar from './Sidebar'
import TopBar from './TopBar'

interface AppShellProps {
  children: React.ReactNode
  title?: string
}

const MOBILE_NAV_ITEMS = [
  { href: '/dashboard', label: 'Home', icon: LayoutDashboard },
  { href: '/learn', label: 'Learn', icon: GraduationCap },
  { href: '/habits', label: 'Habits', icon: CheckSquare },
  { href: '/articles', label: 'Articles', icon: FileText },
  { href: '/ai-assistant', label: 'AI', icon: Bot },
  { href: '/profile', label: 'Profile', icon: User },
]

export default function AppShell({ children, title }: AppShellProps) {
  const pathname = usePathname()
  const [sidebarOpen, setSidebarOpen] = useState(false)

  return (
    <div className="app-layout">
      <Sidebar open={sidebarOpen} onClose={() => setSidebarOpen(false)} />
      <div className="main-content">
        <TopBar onMenuClick={() => setSidebarOpen(true)} title={title} />
        <main className="app-shell-main">
          {children}
        </main>

        <nav className="mobile-bottom-nav" aria-label="Mobile navigation">
          {MOBILE_NAV_ITEMS.map(({ href, label, icon: Icon }) => {
            const isActive = href === pathname || (href !== '/dashboard' && pathname.startsWith(href))

            return (
              <Link
                key={href}
                href={href}
                className={`mobile-nav-item ${isActive ? 'active' : ''}`}
              >
                <Icon size={18} />
                <span>{label}</span>
              </Link>
            )
          })}
        </nav>
      </div>
    </div>
  )
}
