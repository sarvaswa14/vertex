import { useState } from 'react'
import axios from 'axios'
import { useNavigate, Link } from 'react-router-dom'

function Login() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)
  const navigate = useNavigate()

  async function handleSubmit(e) {
    e.preventDefault()
    setLoading(true)
    setError('')
    try {
      const response = await axios.post('http://localhost:5000/api/auth/login', { email, password })
      localStorage.setItem('token', response.data.token)
      navigate('/dashboard')
    } catch (err) {
      setError(err.response?.data?.message || 'Something went wrong')
      setLoading(false)
    }
  }

  return (
    <main style={{ minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', background: '#080c14' }}>
      <div style={{ width: '100%', maxWidth: '400px', padding: '0 1.5rem' }}>

        <div style={{ textAlign: 'center', marginBottom: '2rem' }}>
          <div style={{ width: '48px', height: '48px', borderRadius: '14px', background: 'linear-gradient(135deg, #3b82f6, #1d4ed8)', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 1rem', boxShadow: '0 0 24px rgba(59,130,246,0.3)' }}>
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
              <path d="M13 2L3 14h9l-1 8 10-12h-9l1-8z" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </div>
          <h1 style={{ color: '#f0f4ff', fontSize: '1.5rem', fontWeight: 600, letterSpacing: '-0.02em' }}>Vertexx</h1>
          <p style={{ color: '#4a5568', fontSize: '0.8rem', marginTop: '0.25rem' }}>Your productivity workspace</p>
        </div>

        <div style={{ background: 'rgba(15,20,35,0.8)', border: '1px solid rgba(59,130,246,0.15)', borderRadius: '16px', padding: '2rem', boxShadow: '0 0 40px rgba(59,130,246,0.05), 0 20px 60px rgba(0,0,0,0.4)' }}>
          <h2 style={{ color: '#f0f4ff', fontSize: '1.1rem', fontWeight: 600, marginBottom: '0.25rem' }}>Welcome back</h2>
          <p style={{ color: '#4a5568', fontSize: '0.8rem', marginBottom: '1.5rem' }}>Sign in to your account</p>

          <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '0.875rem' }}>
            <div>
              <label style={{ color: '#6b7280', fontSize: '0.75rem', fontWeight: 500, display: 'block', marginBottom: '0.375rem', textTransform: 'uppercase', letterSpacing: '0.05em' }}>Email</label>
              <input type="email" value={email} onChange={e => setEmail(e.target.value)} placeholder="you@example.com" required
                style={{ width: '100%', padding: '0.625rem 0.875rem', borderRadius: '8px', border: '1px solid rgba(59,130,246,0.15)', background: 'rgba(255,255,255,0.03)', color: '#f0f4ff', fontSize: '0.875rem', outline: 'none', boxSizing: 'border-box' }} />
            </div>
            <div>
              <label style={{ color: '#6b7280', fontSize: '0.75rem', fontWeight: 500, display: 'block', marginBottom: '0.375rem', textTransform: 'uppercase', letterSpacing: '0.05em' }}>Password</label>
              <input type="password" value={password} onChange={e => setPassword(e.target.value)} placeholder="••••••••" required
                style={{ width: '100%', padding: '0.625rem 0.875rem', borderRadius: '8px', border: '1px solid rgba(59,130,246,0.15)', background: 'rgba(255,255,255,0.03)', color: '#f0f4ff', fontSize: '0.875rem', outline: 'none', boxSizing: 'border-box' }} />
            </div>
            {error && <p style={{ color: '#ef4444', fontSize: '0.75rem' }}>{error}</p>}
            <button type="submit" disabled={loading}
              style={{ width: '100%', padding: '0.7rem', borderRadius: '8px', background: loading ? 'rgba(59,130,246,0.5)' : 'linear-gradient(135deg, #3b82f6, #1d4ed8)', color: 'white', fontWeight: 500, fontSize: '0.875rem', border: 'none', cursor: loading ? 'not-allowed' : 'pointer', boxShadow: loading ? 'none' : '0 0 20px rgba(59,130,246,0.3)', marginTop: '0.25rem' }}>
              {loading ? 'Signing in...' : 'Sign in →'}
            </button>
          </form>

          <p style={{ color: '#4a5568', fontSize: '0.75rem', textAlign: 'center', marginTop: '1.25rem' }}>
            No account? <Link to="/signup" style={{ color: '#3b82f6', textDecoration: 'none' }}>Create one</Link>
          </p>
        </div>
      </div>
    </main>
  )
}

export default Login