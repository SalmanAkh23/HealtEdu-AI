'use client'

import AppShell from '@/components/layout/AppShell'
import Link from 'next/link'
import { BookOpen, Clock, Trophy, ChevronRight, Lock } from 'lucide-react'
import type { LearningModule } from '@/types/database'

interface LearnClientProps {
  modules: LearningModule[]
}

export default function LearnClient({ modules }: LearnClientProps) {
  return (
    <AppShell title="Learning Modules">
      <div style={{ maxWidth: 1000, margin: '0 auto' }}>
        <div style={{ marginBottom: '2rem' }}>
          <h1 style={{ fontSize: 'clamp(1.5rem, 3vw, 2rem)', fontWeight: 800, marginBottom: '0.25rem' }}>
            Learning Path
          </h1>
          <p style={{ color: 'var(--text-secondary)' }}>
            Follow our structured courses to expand your health knowledge and earn XP.
          </p>
        </div>

        <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
          {modules.map((module, index) => {
            // For demo purposes, unlock first two
            const isLocked = index > 1 

            return (
              <div 
                key={module.id} 
                className="card"
                style={{ 
                  padding: '1.5rem',
                  display: 'flex',
                  gap: '1.5rem',
                  alignItems: 'center',
                  opacity: isLocked ? 0.6 : 1,
                  position: 'relative'
                }}
              >
                <div 
                  style={{ 
                    width: 64, 
                    height: 64, 
                    borderRadius: '16px', 
                    background: isLocked ? 'var(--bg-default)' : 'linear-gradient(135deg, hsla(168,72%,40%,0.2), hsla(198,95%,58%,0.2))',
                    display: 'flex', 
                    alignItems: 'center', 
                    justifyContent: 'center',
                    flexShrink: 0,
                    color: isLocked ? 'var(--text-muted)' : 'var(--brand-400)'
                  }}
                >
                  {isLocked ? <Lock size={28} /> : <BookOpen size={28} />}
                </div>

                <div style={{ flex: 1 }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '0.25rem' }}>
                    <span style={{ fontSize: '0.75rem', fontWeight: 700, color: 'var(--text-muted)', textTransform: 'uppercase', letterSpacing: '0.05em' }}>
                      Module {index + 1}
                    </span>
                    {module.difficulty && (
                      <span className={`badge difficulty-${module.difficulty}`} style={{ fontSize: '0.7rem' }}>
                        {module.difficulty}
                      </span>
                    )}
                  </div>
                  <h2 style={{ fontSize: '1.25rem', fontWeight: 700, marginBottom: '0.5rem', color: 'var(--text-primary)' }}>
                    {module.title}
                  </h2>
                  <p style={{ color: 'var(--text-secondary)', fontSize: '0.9375rem', marginBottom: '1rem', lineHeight: 1.5, maxWidth: 600 }}>
                    {module.description}
                  </p>
                  
                  <div style={{ display: 'flex', alignItems: 'center', gap: '1.5rem', fontSize: '0.875rem', color: 'var(--text-muted)' }}>
                    <span style={{ display: 'flex', alignItems: 'center', gap: '0.375rem' }}>
                      <Clock size={16} /> {module.estimated_minutes ?? '—'} min
                    </span>
                    <span style={{ display: 'flex', alignItems: 'center', gap: '0.375rem' }}>
                      <Trophy size={16} /> {module.xp_reward} XP
                    </span>
                  </div>
                </div>

                {!isLocked ? (
                  <Link 
                    href={`/learn/${module.id}`}
                    className="btn btn-primary"
                    style={{ flexShrink: 0 }}
                  >
                    Start <ChevronRight size={18} />
                  </Link>
                ) : (
                  <button 
                    className="btn btn-outline" 
                    disabled 
                    style={{ flexShrink: 0 }}
                  >
                    Locked
                  </button>
                )}
              </div>
            )
          })}
        </div>
      </div>
    </AppShell>
  )
}
