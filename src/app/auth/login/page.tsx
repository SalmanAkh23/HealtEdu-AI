'use client'

import { useState, FormEvent } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { createClient } from '@/lib/supabase/client'
import { Eye, EyeOff, AlertCircle, Loader2 } from 'lucide-react'
import BrandLogo from '@/components/layout/BrandLogo'

export default function LoginPage() {
  const router = useRouter()
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [showPassword, setShowPassword] = useState(false)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const handleLogin = async (e: FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setError(null)

    const supabase = createClient()
    const { error: authError } = await supabase.auth.signInWithPassword({
      email,
      password,
    })

    if (authError) {
      setError(authError.message)
      setLoading(false)
    } else {
      const redirectTo = new URLSearchParams(window.location.search).get('redirectTo')
      router.push(redirectTo?.startsWith('/') ? redirectTo : '/dashboard')
    }
  }

  return (
    <div
      style={{
        minHeight: '100dvh',
        background: 'linear-gradient(135deg, hsl(168,72%,8%) 0%, hsl(200,70%,12%) 50%, hsl(220,60%,10%) 100%)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '2rem 1rem',
        position: 'relative',
        overflow: 'hidden',
      }}
    >
      {/* Background blobs */}
      <div style={{ position: 'absolute', top: '20%', left: '10%', width: 300, height: 300, borderRadius: '50%', background: 'radial-gradient(circle, hsla(168,72%,40%,0.12), transparent 70%)', pointerEvents: 'none' }} />
      <div style={{ position: 'absolute', bottom: '20%', right: '10%', width: 400, height: 400, borderRadius: '50%', background: 'radial-gradient(circle, hsla(198,95%,58%,0.08), transparent 70%)', pointerEvents: 'none' }} />

      <div style={{ width: '100%', maxWidth: 420, position: 'relative', zIndex: 1 }}>
        {/* Logo */}
        <div style={{ textAlign: 'center', marginBottom: '2rem' }}>
          <div style={{ margin: '0 auto 1rem', display: 'flex', justifyContent: 'center' }}>
            <BrandLogo size="full" priority />
          </div>
          <h1 style={{ fontSize: '1.75rem', fontWeight: 800, color: 'white', marginBottom: '0.25rem' }}>
            Welcome back
          </h1>
          <p style={{ color: 'hsla(0,0%,100%,0.6)', fontSize: '0.9375rem' }}>
            Sign in to continue your health journey
          </p>
        </div>

        {/* Form Card */}
        <div
          style={{
            background: 'hsla(220,28%,11%,0.85)',
            backdropFilter: 'blur(20px)',
            border: '1px solid hsla(220,20%,25%,0.8)',
            borderRadius: '20px',
            padding: '2rem',
            boxShadow: '0 20px 60px hsla(0,0%,0%,0.4)',
          }}
        >
          {error && (
            <div
              style={{
                background: 'hsla(0,65%,42%,0.15)',
                border: '1px solid hsla(0,65%,42%,0.3)',
                borderRadius: '10px',
                padding: '0.75rem 1rem',
                marginBottom: '1.25rem',
                display: 'flex',
                alignItems: 'center',
                gap: '0.5rem',
                color: 'hsl(0,80%,70%)',
                fontSize: '0.875rem',
              }}
            >
              <AlertCircle size={18} />
              <span>{error}</span>
            </div>
          )}

          <form onSubmit={handleLogin} style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
            <div>
              <label style={{ display: 'block', fontSize: '0.875rem', fontWeight: 600, color: 'hsla(0,0%,100%,0.9)', marginBottom: '0.5rem' }}>
                Email Address
              </label>
              <input
                type="email"
                required
                className="form-input"
                placeholder="you@example.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                style={{ background: 'hsla(220,20%,15%,0.5)', borderColor: 'hsla(220,20%,30%,0.5)', color: 'white' }}
              />
            </div>
            <div>
              <label style={{ display: 'block', fontSize: '0.875rem', fontWeight: 600, color: 'hsla(0,0%,100%,0.9)', marginBottom: '0.5rem' }}>
                Password
              </label>
              <div style={{ position: 'relative' }}>
                <input
                  type={showPassword ? 'text' : 'password'}
                  required
                  className="form-input"
                  placeholder="••••••••"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  style={{ background: 'hsla(220,20%,15%,0.5)', borderColor: 'hsla(220,20%,30%,0.5)', color: 'white', paddingRight: '2.5rem' }}
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  style={{
                    position: 'absolute',
                    right: '0.75rem',
                    top: '50%',
                    transform: 'translateY(-50%)',
                    background: 'none',
                    border: 'none',
                    color: 'hsla(0,0%,100%,0.4)',
                    cursor: 'pointer',
                    padding: 0,
                  }}
                >
                  {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                </button>
              </div>
            </div>

            <button
              type="submit"
              className="btn btn-primary"
              disabled={loading}
              style={{
                width: '100%',
                padding: '0.875rem',
                fontSize: '1rem',
                marginTop: '0.5rem',
                opacity: loading ? 0.7 : 1,
              }}
            >
              {loading ? <Loader2 size={20} className="animate-spin" /> : 'Sign In'}
            </button>
          </form>

          <div style={{ marginTop: '1.5rem', textAlign: 'center', fontSize: '0.875rem', color: 'hsla(0,0%,100%,0.6)' }}>
            Don&apos;t have an account?{' '}
            <Link href="/auth/register" style={{ color: 'var(--brand-400)', fontWeight: 600, textDecoration: 'none' }}>
              Create account
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}
