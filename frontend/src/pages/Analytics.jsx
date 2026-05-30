import { useEffect, useState } from 'react'
import axios from 'axios'
import API_URL from '../config'
function Analytics() {
  const [tasks, setTasks] = useState([])
  const [sessions, setSessions] = useState([])

  const token = localStorage.getItem('token')
  const headers = { Authorization: `Bearer ${token}` }

  useEffect(() => {
    axios.get(`${API_URL}/api/tasks`, { headers })
      .then(res => setTasks(res.data))
    axios.get(`${API_URL}/api/sessions`, { headers })
      .then(res => setSessions(res.data))
  }, [])

  const completed = tasks.filter(t => t.completed).length
  const completionRate = tasks.length > 0 ? Math.round((completed / tasks.length) * 100) : 0
  const focusMinutes = sessions.reduce((acc, s) => acc + s.duration, 0)

  const stats = [
    { label: 'Total Tasks', value: tasks.length },
    { label: 'Completed', value: completed },
    { label: 'Completion Rate', value: `${completionRate}%` },
    { label: 'Focus Minutes', value: focusMinutes },
  ]

  return (
    <div style={{ color: 'var(--text)' }}>
      <h1 className="text-2xl font-semibold mb-6">Analytics</h1>

      <div className="grid grid-cols-2 gap-4 mb-6 xl:grid-cols-4">
        {stats.map(stat => (
          <div key={stat.label} className="rounded-lg p-4" style={{ background: 'var(--bg-secondary)', border: '1px solid var(--border)' }}>
            <p className="text-xs uppercase tracking-wider mb-2" style={{ color: 'var(--text-muted)' }}>{stat.label}</p>
            <p className="text-2xl font-semibold">{stat.value}</p>
          </div>
        ))}
      </div>

      <div className="rounded-lg p-6 mb-4" style={{ background: 'var(--bg-secondary)', border: '1px solid var(--border)' }}>
        <p className="text-sm font-medium mb-4">Task Completion</p>
        <div className="h-2 rounded-full" style={{ background: 'var(--border)' }}>
          <div className="h-2 rounded-full transition-all" style={{ width: `${completionRate}%`, background: 'var(--accent)' }} />
        </div>
        <p className="text-xs mt-2" style={{ color: 'var(--text-muted)' }}>{completed} of {tasks.length} tasks completed</p>
      </div>

      <div className="rounded-lg p-6" style={{ background: 'var(--bg-secondary)', border: '1px solid var(--border)' }}>
        <p className="text-sm font-medium mb-4">Recent Sessions</p>
        {sessions.length === 0 && <p style={{ color: 'var(--text-muted)' }} className="text-sm">No sessions yet.</p>}
        {sessions.slice(0, 5).map(session => (
          <div key={session._id} className="flex justify-between py-2" style={{ borderBottom: '1px solid var(--border)' }}>
            <p className="text-sm">Pomodoro</p>
            <p className="text-sm" style={{ color: 'var(--accent)' }}>{session.duration} mins</p>
          </div>
        ))}
      </div>
    </div>
  )
}

export default Analytics