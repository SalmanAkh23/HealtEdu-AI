import { createClient } from '@/lib/supabase/server'
import { redirect } from 'next/navigation'
import ArticlesClient from './ArticlesClient'

export const metadata = {
  title: 'Health Articles | HealthEdu AI',
  description: 'Read evidence-based health education articles on nutrition, exercise, sleep, mental health, and more.',
}

export default async function ArticlesPage() {
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()
  if (!user) redirect('/auth/login')

  const [articlesResult, categoriesResult] = await Promise.all([
    supabase
      .from('articles')
      .select('id, title, slug, excerpt, cover_image, reading_time, difficulty, author_name, category_id, view_count, created_at')
      .eq('is_published', true)
      .order('created_at', { ascending: false }),
    supabase.from('categories').select('*').order('name'),
  ])

  return (
    <ArticlesClient
      articles={articlesResult.data ?? []}
      categories={categoriesResult.data ?? []}
    />
  )
}
