import { createClient } from '@/lib/supabase/server'
import { redirect } from 'next/navigation'
import DashboardClient from './DashboardClient'

export const metadata = {
  title: 'Dashboard | HealthEdu AI',
  description: 'Your personal health education dashboard.',
}

export default async function DashboardPage() {
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()

  if (!user) {
    redirect('/auth/login')
  }

  // Fetch some basic data for the dashboard
  const [profileResult, articlesResult, modulesResult] = await Promise.all([
    supabase.from('profiles').select('*').eq('id', user.id).single(),
    supabase.from('articles').select('id, title, slug, excerpt, cover_image, reading_time').eq('is_published', true).order('created_at', { ascending: false }).limit(3),
    supabase.from('learning_modules').select('id, title, description, thumbnail, estimated_minutes').eq('is_published', true).order('created_at', { ascending: false }).limit(3),
  ])

  return (
    <DashboardClient 
      user={user} 
      profile={profileResult.data} 
      recentArticles={articlesResult.data ?? []}
      featuredModules={modulesResult.data ?? []}
    />
  )
}
