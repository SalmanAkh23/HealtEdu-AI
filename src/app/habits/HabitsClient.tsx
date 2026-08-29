'use client'

import { useState } from 'react'
import AppShell from '@/components/layout/AppShell'
import { createClient } from '@/lib/supabase/client'
import { Check, Calendar as CalendarIcon, Info, Loader2, CheckCircle2 } from 'lucide-react'
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
  const [error, setError] = useState<string | null>(null)
  const [success, setSuccess] = useState<string | null>(null)
  
  const now = new Date()
  const today = `${now.getFullYear()}-${String(now.getMonth() + 1).padStart(2, '0')}-${String(now.getDate()).padStart(2, '0')}`

  // Check if a habit is completed today
  const isCompletedToday = (habitId: string) => {
    return recentLogs.some(
      (log) => log.habit_id === habitId && log.date === today
    )
  }

  const handleToggleHabit = async (habitId: string) => {
    if (loading) return
    setLoading(true)
    setError(null)
    setSuccess(null)
    
    const completed = isCompletedToday(habitId)
    const supabase = createClient()

    const habitTable = supabase.from('habit_progress')

    const result = completed
      ? await habitTable
        .delete()
        .match({ user_id: user.id, habit_id: habitId, date: today })
      : await habitTable
        .insert({ user_id: user.id, habit_id: habitId, date: today, completed: true })

    if (result.error) {
      setError('Habit belum dapat diperbarui. Silakan coba lagi.')
      setLoading(false)
      return
    }

    setLoading(false)
    setSuccess(completed ? 'Catatan habit dibatalkan.' : 'Terima kasih sudah mengisi habit hari ini! Data kamu sudah tersimpan.')
    router.refresh()
  }

  const dateKey = (date: Date) => `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, '0')}-${String(date.getDate()).padStart(2, '0')}`
  const todayDate = new Date()
  const weekStart = new Date(todayDate)
  const day = weekStart.getDay()
  weekStart.setDate(weekStart.getDate() - (day === 0 ? 6 : day - 1))
  const monthStart = new Date(todayDate.getFullYear(), todayDate.getMonth(), 1)
  const yearStart = new Date(todayDate.getFullYear(), 0, 1)
  const countFrom = (start: Date) => recentLogs.filter((log) => log.date >= dateKey(start) && log.date <= today).length
  const daysBetween = (start: Date) => Math.floor((todayDate.getTime() - start.getTime()) / 86400000) + 1
  const summaries = [
    { label: 'Minggu ini', completed: countFrom(weekStart), target: habits.length * daysBetween(weekStart) },
    { label: 'Bulan ini', completed: countFrom(monthStart), target: habits.length * daysBetween(monthStart) },
    { label: 'Tahun ini', completed: countFrom(yearStart), target: habits.length * daysBetween(yearStart) },
  ].map((summary) => ({ ...summary, percentage: summary.target ? Math.round((summary.completed / summary.target) * 100) : 0 }))

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

        {error && (
          <p role="alert" style={{ color: 'var(--danger-500)', marginBottom: '1rem' }}>
            {error}
          </p>
        )}

        {success && (
          <div role="status" style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', padding: '0.875rem 1rem', marginBottom: '1rem', borderRadius: 12, background: 'hsla(145, 63%, 42%, 0.12)', color: 'var(--brand-600)' }}>
            <CheckCircle2 size={18} />
            <span>{success}</span>
          </div>
        )}

        <section aria-label="Ringkasan habit" className="habit-summary-grid" style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))', gap: '1rem', marginBottom: '2rem' }}>
          {summaries.map((summary) => (
            <div key={summary.label} className="card" style={{ padding: '1.25rem' }}>
              <p style={{ color: 'var(--text-secondary)', fontSize: '0.875rem', marginBottom: '0.5rem' }}>{summary.label}</p>
              <strong style={{ fontSize: '1.5rem' }}>{summary.percentage}%</strong>
              <p style={{ color: 'var(--text-muted)', fontSize: '0.8rem', marginTop: '0.35rem' }}>{summary.completed} dari {summary.target} target</p>
              <div style={{ height: 6, borderRadius: 99, background: 'var(--bg-default)', marginTop: '0.75rem', overflow: 'hidden' }}>
                <div style={{ height: '100%', width: `${Math.min(summary.percentage, 100)}%`, background: 'var(--brand-500)', borderRadius: 99 }} />
              </div>
            </div>
          ))}
        </section>

        <div className="grid-auto">
          {habits.map((habit) => {
            const completed = isCompletedToday(habit.id)
            return (
              <div 
                key={habit.id} 
                className="card habit-card" 
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
                  className="habit-action"
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
                  {loading ? <Loader2 size={20} className="animate-spin" /> : completed ? <Check size={24} /> : null}
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
