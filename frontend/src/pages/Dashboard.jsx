import { useEffect, useState } from 'react'
import axios from 'axios'
import API_URL from '../config'
function Dashboard() {
  const [tasks, setTasks] = useState([])
  const [sessions, setSessions] = useState([])

  useEffect(() => {
    const token = localStorage.getItem('token')
    const headers = { Authorization: `Bearer ${token}` }
    
    axios.get('${API_URL}/api/tasks', { headers })
      .then(res => setTasks(res.data))
    
    axios.get('${API_URL}/api/sessions', { headers })
      .then(res => setSessions(res.data))
  }, [])

  const completed = tasks.filter(t => t.completed).length
  const focusMinutes = sessions.reduce((acc, s) => acc + s.duration, 0)

  return (
    <div style={{ color: 'var(--text)' }}>
      <h1 className="text-2xl font-semibold mb-1">Dashboard</h1>
      <p className="text-sm mb-6" style={{ color: 'var(--text-muted)' }}>
        {new Date().toLocaleDateString('en-US', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}
      </p>

      <div className="grid grid-cols-2 gap-4 mb-6 xl:grid-cols-4">
        {[
          { label: 'Tasks Completed', value: completed },
          { label: 'Total Tasks', value: tasks.length },
          { label: 'Focus Minutes', value: focusMinutes },
          { label: 'Sessions', value: sessions.length },
        ].map(stat => (
          <div key={stat.label} className="rounded-lg p-4" style={{ background: 'var(--bg-secondary)', border: '1px solid var(--border)' }}>
            <p className="text-xs uppercase tracking-wider mb-2" style={{ color: 'var(--text-muted)' }}>{stat.label}</p>
            <p className="text-2xl font-semibold">{stat.value}</p>
          </div>
        ))}
      </div>

      <div className="rounded-lg p-5" style={{ background: 'var(--bg-secondary)', border: '1px solid var(--border)' }}>
        <p className="text-sm font-medium mb-4">Recent Tasks</p>
        {tasks.length === 0 && <p style={{ color: 'var(--text-muted)' }} className="text-sm">No tasks yet.</p>}
        {tasks.slice(0, 4).map(task => (
          <div key={task._id} className="flex items-center gap-3 py-2">
            <div className="w-1.5 h-1.5 rounded-full" style={{ background: task.completed ? '#22c55e' : 'var(--border)' }} />
            <p className="text-sm" style={{ color: task.completed ? 'var(--text-muted)' : 'var(--text)', textDecoration: task.completed ? 'line-through' : 'none' }}>
              {task.title}
            </p>
          </div>
        ))}
      </div>
    </div>
  )
}

export default Dashboard