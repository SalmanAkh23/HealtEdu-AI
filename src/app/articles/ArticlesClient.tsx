'use client'

import { useState } from 'react'
import AppShell from '@/components/layout/AppShell'
import Link from 'next/link'
import { Search, Clock, BookOpen,  } from 'lucide-react'
import type { Article, Category } from '@/types/database'

interface ArticlesClientProps {
  articles: Partial<Article>[]
  categories: Category[]
}

export default function ArticlesClient({ articles, categories }: ArticlesClientProps) {
  const [search, setSearch] = useState('')
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null)
  const [selectedDifficulty, setSelectedDifficulty] = useState<string | null>(null)

  const filtered = articles.filter((a) => {
    const matchSearch =
      !search ||
      a.title?.toLowerCase().includes(search.toLowerCase()) ||
      a.excerpt?.toLowerCase().includes(search.toLowerCase())
    const matchCategory = !selectedCategory || a.category_id === selectedCategory
    const matchDifficulty = !selectedDifficulty || a.difficulty === selectedDifficulty
    return matchSearch && matchCategory && matchDifficulty
  })

  const categoryMap = Object.fromEntries(categories.map((c) => [c.id, c]))

  return (
    <AppShell title="Articles">
      <div style={{ maxWidth: 1100, margin: '0 auto' }}>
        {/* Header */}
        <div style={{ marginBottom: '2rem' }}>
          <h1 style={{ fontSize: 'clamp(1.5rem, 3vw, 2rem)', fontWeight: 800, marginBottom: '0.25rem' }}>
            Health Articles
          </h1>
          <p style={{ color: 'var(--text-secondary)' }}>
            Evidence-based health education articles written by our editorial team.
          </p>
        </div>

        {/* Filters */}
        <div
          style={{
            display: 'flex',
            gap: '0.75rem',
            flexWrap: 'wrap',
            marginBottom: '1.75rem',
            alignItems: 'center',
          }}
        >
          {/* Search */}
          <div style={{ position: 'relative', flex: '1 1 240px', minWidth: 200 }}>
            <Search
              size={16}
              style={{
                position: 'absolute',
                left: '0.875rem',
                top: '50%',
                transform: 'translateY(-50%)',
                color: 'var(--text-muted)',
              }}
            />
            <input
              type="text"
              className="form-input"
              placeholder="Search articles..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              style={{ paddingLeft: '2.5rem' }}
              aria-label="Search articles"
            />
          </div>

          {/* Category Filter */}
          <select
            className="form-input"
            style={{ flex: '0 1 200px', cursor: 'pointer' }}
            value={selectedCategory ?? ''}
            onChange={(e) => setSelectedCategory(e.target.value || null)}
            aria-label="Filter by category"
          >
            <option value="">All Categories</option>
            {categories.map((c) => (
              <option key={c.id} value={c.id}>{c.name}</option>
            ))}
          </select>

          {/* Difficulty Filter */}
          <select
            className="form-input"
            style={{ flex: '0 1 160px', cursor: 'pointer' }}
            value={selectedDifficulty ?? ''}
            onChange={(e) => setSelectedDifficulty(e.target.value || null)}
            aria-label="Filter by difficulty"
          >
            <option value="">All Levels</option>
            <option value="beginner">Beginner</option>
            <option value="intermediate">Intermediate</option>
            <option value="advanced">Advanced</option>
          </select>
        </div>

        {/* Results count */}
        <p style={{ fontSize: '0.875rem', color: 'var(--text-muted)', marginBottom: '1.25rem' }}>
          {filtered.length} article{filtered.length !== 1 ? 's' : ''} found
        </p>

        {/* Articles Grid */}
        {filtered.length === 0 ? (
          <div style={{ textAlign: 'center', padding: '4rem 1rem' }}>
            <BookOpen size={48} style={{ color: 'var(--text-muted)', margin: '0 auto 1rem' }} />
            <h3 style={{ fontSize: '1.1rem', fontWeight: 700, marginBottom: '0.5rem' }}>No articles found</h3>
            <p style={{ color: 'var(--text-secondary)' }}>Try adjusting your search or filters.</p>
          </div>
        ) : (
          <div className="grid-auto">
            {filtered.map((article) => {
              const cat = article.category_id ? categoryMap[article.category_id] : null
              return (
                <Link
                  key={article.id}
                  href={`/articles/${article.slug}`}
                  className="card card-interactive"
                  style={{ display: 'block', textDecoration: 'none', overflow: 'hidden' }}
                >
                  {article.cover_image && (
                    <img
                      src={article.cover_image}
                      alt={article.title}
                      style={{ width: '100%', height: 160, objectFit: 'cover' }}
                      loading="lazy"
                    />
                  )}
                  <div style={{ padding: '1.125rem' }}>
                    {/* Meta */}
                    <div style={{ display: 'flex', gap: '0.5rem', flexWrap: 'wrap', marginBottom: '0.625rem', alignItems: 'center' }}>
                      {cat && (
                        <span className="badge badge-brand" style={{ fontSize: '0.7rem' }}>
                          {cat.name}
                        </span>
                      )}
                      {article.difficulty && (
                        <span className={`badge difficulty-${article.difficulty}`} style={{ fontSize: '0.7rem' }}>
                          {article.difficulty}
                        </span>
                      )}
                    </div>

                    <h3
                      className="line-clamp-2"
                      style={{ fontSize: '0.9375rem', fontWeight: 700, color: 'var(--text-primary)', marginBottom: '0.5rem' }}
                    >
                      {article.title}
                    </h3>
                    <p
                      className="line-clamp-2"
                      style={{ fontSize: '0.825rem', color: 'var(--text-secondary)', lineHeight: 1.5 }}
                    >
                      {article.excerpt}
                    </p>

                    <div
                      style={{
                        display: 'flex',
                        alignItems: 'center',
                        gap: '0.375rem',
                        marginTop: '0.75rem',
                        fontSize: '0.75rem',
                        color: 'var(--text-muted)',
                      }}
                    >
                      <Clock size={12} />
                      {article.reading_time} read
                    </div>
                  </div>
                </Link>
              )
            })}
          </div>
        )}
      </div>
    </AppShell>
  )
}
