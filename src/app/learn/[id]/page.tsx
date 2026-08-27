import { notFound, redirect } from 'next/navigation'
import { ArrowLeft, CheckCircle2, Clock, Trophy } from 'lucide-react'
import Link from 'next/link'
import AppShell from '@/components/layout/AppShell'
import { createClient } from '@/lib/supabase/server'
import ModuleCompleteButton from './ModuleCompleteButton'

interface ModulePageProps {
  params: Promise<{ id: string }>
}

export default async function ModulePage({ params }: ModulePageProps) {
  const { id } = await params
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()
  if (!user) redirect('/auth/login')

  const [{ data: module }, { data: progress }] = await Promise.all([
    supabase.from('learning_modules').select('*').eq('id', id).eq('is_published', true).maybeSingle(),
    supabase.from('learning_progress').select('status').eq('user_id', user.id).eq('module_id', id).maybeSingle(),
  ])

  if (!module) notFound()

  const isCompleted = progress?.status === 'completed'

  return (
    <AppShell title="Learning Module">
      <article style={{ maxWidth: 820, margin: '0 auto' }}>
        <Link href="/learn" className="btn btn-ghost" style={{ display: 'inline-flex', gap: '0.5rem', marginBottom: '1.5rem' }}>
          <ArrowLeft size={17} /> Back to modules
        </Link>
        <div className="card" style={{ padding: 'clamp(1.5rem, 4vw, 3rem)' }}>
          <span className="badge badge-brand">{module.difficulty ?? 'General'}</span>
          <h1 style={{ fontSize: 'clamp(2rem, 5vw, 3rem)', lineHeight: 1.1, margin: '1rem 0' }}>{module.title}</h1>
          <p style={{ color: 'var(--text-secondary)', fontSize: '1.1rem', lineHeight: 1.6 }}>{module.description}</p>
          <div style={{ display: 'flex', gap: '1.5rem', color: 'var(--text-muted)', margin: '1.5rem 0 2rem', fontSize: '0.9rem' }}>
            <span style={{ display: 'inline-flex', alignItems: 'center', gap: '0.4rem' }}><Clock size={16} /> {module.estimated_minutes ?? '—'} min</span>
            <span style={{ display: 'inline-flex', alignItems: 'center', gap: '0.4rem' }}><Trophy size={16} /> {module.xp_reward} XP</span>
          </div>
          <div style={{ padding: '1.25rem', background: 'var(--bg-default)', borderRadius: 12, lineHeight: 1.7, color: 'var(--text-secondary)' }}>
            Read the module description carefully, reflect on how it applies to your daily health education, then mark this module complete.
          </div>
          <div style={{ marginTop: '2rem' }}>
            {isCompleted ? (
              <p style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', color: 'var(--success-500)' }}><CheckCircle2 size={20} /> Module completed</p>
            ) : <ModuleCompleteButton userId={user.id} moduleId={module.id} />}
          </div>
        </div>
      </article>
    </AppShell>
  )
}
