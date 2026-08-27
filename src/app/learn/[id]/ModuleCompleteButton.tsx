'use client'

import { useState } from 'react'
import { CheckCircle2, Loader2 } from 'lucide-react'
import { useRouter } from 'next/navigation'
import { createClient } from '@/lib/supabase/client'

interface ModuleCompleteButtonProps {
  userId: string
  moduleId: string
}

export default function ModuleCompleteButton({ userId, moduleId }: ModuleCompleteButtonProps) {
  const router = useRouter()
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  async function handleComplete() {
    if (loading) return
    setLoading(true)
    setError(null)

    const supabase = createClient()
    const { error: saveError } = await supabase.from('learning_progress').upsert(
      {
        user_id: userId,
        module_id: moduleId,
        status: 'completed',
        progress_percentage: 100,
        completed_at: new Date().toISOString(),
        updated_at: new Date().toISOString(),
      },
      { onConflict: 'user_id,module_id' },
    )

    if (saveError) {
      setError('Modul belum dapat disimpan. Silakan coba lagi.')
      setLoading(false)
      return
    }

    router.refresh()
  }

  return (
    <div>
      <button type="button" className="btn btn-primary" onClick={handleComplete} disabled={loading}>
        {loading ? <Loader2 size={18} className="animate-spin" /> : <CheckCircle2 size={18} />}
        {loading ? 'Saving...' : 'Mark as complete'}
      </button>
      {error && <p role="alert" style={{ color: 'var(--danger-500)', marginTop: '0.75rem' }}>{error}</p>}
    </div>
  )
}
