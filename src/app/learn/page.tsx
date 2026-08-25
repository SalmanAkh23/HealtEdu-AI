import { createClient } from '@/lib/supabase/server'
import { redirect } from 'next/navigation'
import LearnClient from './LearnClient'

export const metadata = {
  title: 'Learning Modules | HealthEdu AI',
  description: 'Interactive health education modules.',
}

export default async function LearnPage() {
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()
  if (!user) redirect('/auth/login')

  const { data: modules } = await supabase
    .from('learning_modules')
    .select('*')
    .eq('is_published', true)
    .order('created_at')

  return (
    <LearnClient modules={modules ?? []} />
  )
}
