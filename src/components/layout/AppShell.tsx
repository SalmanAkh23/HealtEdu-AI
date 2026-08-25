'use client'

import { useState } from 'react'
import Sidebar from './Sidebar'
import TopBar from './TopBar'

interface AppShellProps {
  children: React.ReactNode
  title?: string
}

export default function AppShell({ children, title }: AppShellProps) {
  const [sidebarOpen, setSidebarOpen] = useState(false)

  return (
    <div className="app-layout">
      <Sidebar open={sidebarOpen} onClose={() => setSidebarOpen(false)} />
      <div className="main-content">
        <TopBar onMenuClick={() => setSidebarOpen(true)} title={title} />
        <main style={{ flex: 1, padding: '2rem 1.5rem' }}>
          {children}
        </main>
      </div>
    </div>
  )
}
