'use client'

import { useState } from 'react'
import AppShell from '@/components/layout/AppShell'
import { createClient } from '@/lib/supabase/client'
import { Check, Calendar as CalendarIcon, Info } from 'lucide-react'
import { useRouter } from 'next/navigation'
import type { Habit, HabitProgress } from '@/types/database'

interface HabitsClientProps {
  user: { id: string }
  habits: Habit[]
  recentLogs: HabitProgress[]
}

export default function HabitsClient({ user, habits, recentLogs }: HabitsClientProps) {
  const router = useRouter()
  const [loading, setLoading] = useState(false)
  
  // Format today's date for comparison (YYYY-MM-DD)
  const today = new Date().toISOString().split('T')[0]

  // Check if a habit is completed today
  const isCompletedToday = (habitId: string) => {
    return recentLogs.some(
      (log) => log.habit_id === habitId && log.date === today
    )
  }

  const handleToggleHabit = async (habitId: string) => {
    if (loading) return
    setLoading(true)
    
    const completed = isCompletedToday(habitId)
    const supabase = createClient()

    const habitTable = supabase.from('habit_progress')

    if (completed) {
      // Un-complete
      await habitTable
        .delete()
        .match({ user_id: user.id, habit_id: habitId, date: today })
    } else {
      // Complete
      await habitTable
        .insert({ user_id: user.id, habit_id: habitId, date: today, completed: true })
    }

    setLoading(false)
    router.refresh()
  }

  return (
    <AppShell title="Habit Tracker">
      <div style={{ maxWidth: 900, margin: '0 auto' }}>
        <div style={{ marginBottom: '2rem' }}>
          <h1 style={{ fontSize: 'clamp(1.5rem, 3vw, 2rem)', fontWeight: 800, marginBottom: '0.25rem' }}>
            Daily Habits
          </h1>
          <p style={{ color: 'var(--text-secondary)' }}>
            Build consistency and earn XP by completing your daily health goals.
          </p>
        </div>

        <div className="grid-auto">
          {habits.map((habit) => {
            const completed = isCompletedToday(habit.id)
            return (
              <div 
                key={habit.id} 
                className="card" 
                style={{ 
                  padding: '1.5rem', 
                  display: 'flex', 
                  alignItems: 'center', 
                  gap: '1rem',
                  border: completed ? '1px solid var(--brand-400)' : undefined,
                  background: completed ? 'hsla(168,72%,40%,0.05)' : undefined
                }}
              >
                <div style={{ flex: 1 }}>
                  <h3 style={{ fontSize: '1.125rem', fontWeight: 700, marginBottom: '0.25rem' }}>{habit.name}</h3>
                  <p style={{ fontSize: '0.875rem', color: 'var(--text-secondary)', marginBottom: '0.5rem' }}>{habit.description}</p>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', fontSize: '0.75rem', color: 'var(--text-muted)' }}>
                    <span style={{ display: 'flex', alignItems: 'center', gap: '0.25rem', color: 'var(--brand-400)' }}>
                      <CalendarIcon size={14} /> Daily
                    </span>
                  </div>
                </div>
                
                <button
                  onClick={() => handleToggleHabit(habit.id)}
                  disabled={loading}
                  style={{
                    width: 48,
                    height: 48,
                    borderRadius: '50%',
                    border: completed ? 'none' : '2px solid var(--border-subtle)',
                    background: completed ? 'linear-gradient(135deg, var(--brand-500), var(--brand-400))' : 'transparent',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    cursor: loading ? 'wait' : 'pointer',
                    color: completed ? 'white' : 'var(--text-muted)',
                    transition: 'all 0.2s',
                  }}
                  aria-label={completed ? `Unmark ${habit.name}` : `Mark ${habit.name} complete`}
                >
                  {completed && <Check size={24} />}
                </button>
              </div>
            )
          })}
        </div>
        
        <div style={{ marginTop: '3rem', padding: '1.5rem', background: 'hsla(220,20%,15%,0.5)', borderRadius: '16px', display: 'flex', gap: '1rem' }}>
          <Info size={24} style={{ color: 'var(--brand-400)', flexShrink: 0 }} />
          <div>
            <h4 style={{ fontSize: '1rem', fontWeight: 600, marginBottom: '0.25rem' }}>Why track habits?</h4>
            <p style={{ fontSize: '0.875rem', color: 'var(--text-secondary)', lineHeight: 1.6 }}>
              Consistency is key to a healthy lifestyle. Completing daily habits not only improves your physical and mental well-being but also earns you XP on HealthEdu AI, helping you unlock achievements and level up!
            </p>
          </div>
        </div>
      </div>
    </AppShell>
  )
}
