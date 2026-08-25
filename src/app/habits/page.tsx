import { createClient } from '@/lib/supabase/server'
import { redirect } from 'next/navigation'
import HabitsClient from './HabitsClient'

export const metadata = {
  title: 'Habit Tracker | HealthEdu AI',
  description: 'Track your daily health habits and build consistency.',
}

function sevenDaysAgoISO() {
  return new Date(Date.now() - 7 * 24 * 60 * 60 * 1000).toISOString()
}

export default async function HabitsPage() {
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()
  if (!user) redirect('/auth/login')

  // Fetch habits and the user's logs
  const [habitsResult, logsResult] = await Promise.all([
    supabase.from('habits').select('*').eq('is_active', true).order('name'),
    supabase
      .from('habit_progress')
      .select('*')
      .eq('user_id', user.id)
      .eq('completed', true)
      .gte('date', sevenDaysAgoISO()), // last 7 days
  ])

  return (
    <HabitsClient
      user={user}
      habits={habitsResult.data ?? []}
      recentLogs={logsResult.data ?? []}
    />
  )
}
