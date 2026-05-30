import { Link, useNavigate, useLocation } from 'react-router-dom'
import { useTheme } from '../context/ThemeContext'

function Sidebar() {
  const navigate = useNavigate()
  const location = useLocation()
  const { theme, toggleTheme } = useTheme()
  function handleLogout() {
    localStorage.removeItem('token')
    navigate('/login')
  }

  const links = [
    { to: '/dashboard', label: 'Dashboard' },
    { to: '/tasks', label: 'Tasks' },
    { to: '/focus', label: 'Focus' },
    { to: '/analytics', label: 'Analytics' },
    { to: '/notes', label: 'Notes' },
  ]

  return (
    <div className="w-60 h-screen flex flex-col flex-shrink-0" style={{ background: 'var(--bg-secondary)', borderRight: '1px solid var(--border)' }}>
      
      <div className="px-5 py-5" style={{ borderBottom: '1px solid var(--border)' }}>
        <div className="flex items-center gap-2">
          <div className="w-7 h-7 rounded-lg flex items-center justify-center" style={{ background: 'var(--accent)' }}>
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none">
              <path d="M13 2L3 14h9l-1 8 10-12h-9l1-8z" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </div>
          <span className="text-sm font-semibold" style={{ color: 'var(--text)' }}>Vertex</span>
        </div>
      </div>

      <nav className="flex flex-col gap-0.5 px-3 py-4 flex-1">
        {links.map(link => (
          <Link
            key={link.to}
            to={link.to}
            className="flex items-center rounded-lg px-3 py-2.5 text-sm font-medium transition-all"
            style={{
              background: location.pathname === link.to ? 'var(--accent-subtle)' : 'transparent',
              color: location.pathname === link.to ? 'var(--accent)' : 'var(--text-muted)',
            }}
          >
            {link.label}
          </Link>
        ))}
      </nav>

      <div className="px-3 py-4" style={{ borderTop: '1px solid var(--border)' }}>
        <button
            onClick={toggleTheme}
            className="flex items-center gap-3 w-full rounded-lg px-3 py-2.5 text-sm transition-all mb-1"
            style={{ color: 'var(--text-muted)' }}
        >
            {theme === 'dark' ? ' Light mode' : ' Dark mode'}
        </button>

        <button
            onClick={handleLogout}
            className="flex items-center gap-3 w-full rounded-lg px-3 py-2.5 text-sm transition-all"
            style={{ color: 'var(--text-muted)' }}
        >
            Sign out
        </button>
        </div>
    </div>
  )
}

export default Sidebar