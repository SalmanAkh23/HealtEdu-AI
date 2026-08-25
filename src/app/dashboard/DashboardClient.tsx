'use client'

import AppShell from '@/components/layout/AppShell'
import Link from 'next/link'
import { Brain, FileText, Zap, ChevronRight, CheckSquare, Award } from 'lucide-react'
import type { Article, LearningModule, Profile } from '@/types/database'
import type { User } from '@supabase/auth-js'

interface DashboardClientProps {
  user: User
  profile: Profile | null
  recentArticles: Pick<Article, 'id' | 'title' | 'slug' | 'cover_image' | 'reading_time'>[]
  featuredModules: Pick<LearningModule, 'id' | 'title' | 'estimated_minutes'>[]
}

export default function DashboardClient({ user, profile, recentArticles, featuredModules }: DashboardClientProps) {
  const userName = profile?.full_name || user.email?.split('@')[0] || 'Learner'

  return (
    <AppShell title="Dashboard">
      <div style={{ maxWidth: 1200, margin: '0 auto', display: 'flex', flexDirection: 'column', gap: '2rem' }}>
        
        {/* Welcome Banner */}
        <section
          style={{
            background: 'linear-gradient(135deg, hsla(168,72%,40%,0.15), hsla(198,95%,58%,0.15))',
            border: '1px solid hsla(168,72%,40%,0.2)',
            borderRadius: '24px',
            padding: '2.5rem',
            position: 'relative',
            overflow: 'hidden',
          }}
        >
          <div style={{ position: 'relative', zIndex: 1 }}>
            <h1 style={{ fontSize: '2rem', fontWeight: 800, marginBottom: '0.5rem', color: 'var(--text-primary)' }}>
              Welcome back, {userName}! 👋
            </h1>
            <p style={{ color: 'var(--text-secondary)', fontSize: '1.125rem', maxWidth: 600 }}>
              Ready to continue your health education journey? You have a 3-day streak going!
            </p>
          </div>
          <div style={{ position: 'absolute', right: '-5%', top: '-20%', opacity: 0.1, pointerEvents: 'none' }}>
            <Brain size={300} />
          </div>
        </section>

        {/* Quick Stats Grid */}
        <section className="grid-auto">
          <div className="card" style={{ padding: '1.5rem', display: 'flex', alignItems: 'center', gap: '1rem' }}>
            <div style={{ width: 48, height: 48, borderRadius: '12px', background: 'hsla(45,100%,50%,0.1)', color: 'hsl(45,100%,50%)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <Zap size={24} />
            </div>
            <div>
              <p style={{ color: 'var(--text-muted)', fontSize: '0.875rem', fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.05em' }}>Total XP</p>
              <p style={{ fontSize: '1.5rem', fontWeight: 800 }}>{profile?.total_xp ?? 0}</p>
            </div>
          </div>
          <div className="card" style={{ padding: '1.5rem', display: 'flex', alignItems: 'center', gap: '1rem' }}>
            <div style={{ width: 48, height: 48, borderRadius: '12px', background: 'hsla(168,72%,40%,0.1)', color: 'var(--brand-400)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <CheckSquare size={24} />
            </div>
            <div>
              <p style={{ color: 'var(--text-muted)', fontSize: '0.875rem', fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.05em' }}>Modules Completed</p>
              <p style={{ fontSize: '1.5rem', fontWeight: 800 }}>0</p>
            </div>
          </div>
          <div className="card" style={{ padding: '1.5rem', display: 'flex', alignItems: 'center', gap: '1rem' }}>
            <div style={{ width: 48, height: 48, borderRadius: '12px', background: 'hsla(280,70%,60%,0.1)', color: 'hsl(280,70%,60%)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <Award size={24} />
            </div>
            <div>
              <p style={{ color: 'var(--text-muted)', fontSize: '0.875rem', fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.05em' }}>Achievements</p>
              <p style={{ fontSize: '1.5rem', fontWeight: 800 }}>0</p>
            </div>
          </div>
        </section>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '2rem' }}>
          {/* Featured Modules */}
          <section>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.25rem' }}>
              <h2 style={{ fontSize: '1.25rem', fontWeight: 700 }}>Learning Path</h2>
              <Link href="/learn" style={{ color: 'var(--brand-400)', fontSize: '0.875rem', fontWeight: 600, display: 'flex', alignItems: 'center' }}>
                View all <ChevronRight size={16} />
              </Link>
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
              {featuredModules.map((module) => (
                <Link key={module.id} href={`/learn/${module.id}`} className="card card-interactive" style={{ padding: '1.25rem', display: 'flex', gap: '1rem', textDecoration: 'none' }}>
                  <div style={{ width: 40, height: 40, borderRadius: '10px', background: 'var(--bg-default)', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                    <FileText size={20} color="var(--text-secondary)" />
                  </div>
                  <div>
                    <h3 style={{ fontSize: '1rem', fontWeight: 600, color: 'var(--text-primary)', marginBottom: '0.25rem' }}>{module.title}</h3>
                    <p style={{ fontSize: '0.875rem', color: 'var(--text-secondary)' }}>{module.estimated_minutes ?? '—'} min</p>
                  </div>
                </Link>
              ))}
            </div>
          </section>

          {/* Recent Articles */}
          <section>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.25rem' }}>
              <h2 style={{ fontSize: '1.25rem', fontWeight: 700 }}>Latest Articles</h2>
              <Link href="/articles" style={{ color: 'var(--brand-400)', fontSize: '0.875rem', fontWeight: 600, display: 'flex', alignItems: 'center' }}>
                Read more <ChevronRight size={16} />
              </Link>
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
              {recentArticles.map((article) => (
                <Link key={article.id} href={`/articles/${article.slug}`} className="card card-interactive" style={{ padding: '1rem', display: 'flex', gap: '1rem', textDecoration: 'none' }}>
                  {article.cover_image && (
                    <img src={article.cover_image} alt={article.title} style={{ width: 80, height: 60, borderRadius: '8px', objectFit: 'cover' }} />
                  )}
                  <div style={{ flex: 1 }}>
                    <h3 className="line-clamp-2" style={{ fontSize: '0.9375rem', fontWeight: 600, color: 'var(--text-primary)', marginBottom: '0.25rem', lineHeight: 1.4 }}>
                      {article.title}
                    </h3>
                    <p style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>{article.reading_time} min read</p>
                  </div>
                </Link>
              ))}
            </div>
          </section>
        </div>

      </div>
    </AppShell>
  )
}
