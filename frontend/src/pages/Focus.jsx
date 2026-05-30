import { useEffect, useState, useRef } from 'react'
import axios from 'axios'
import API_URL from '../config'
function Focus() {
  const [timeLeft, setTimeLeft] = useState(25 * 60)
  const [running, setRunning] = useState(false)
  const [sessions, setSessions] = useState([])
  const intervalRef = useRef(null)
  const startTimeRef = useRef(25 * 60)

  const token = localStorage.getItem('token')
  const headers = { Authorization: `Bearer ${token}` }

  useEffect(() => {
    axios.get('${API_URL}/api/sessions', { headers })
      .then(res => setSessions(res.data))
  }, [])

  useEffect(() => {
    if (running) {
      intervalRef.current = setInterval(() => {
        setTimeLeft(prev => {
          if (prev <= 1) {
            clearInterval(intervalRef.current)
            setRunning(false)
            saveSession(startTimeRef.current)
            return 0
          }
          return prev - 1
        })
      }, 1000)
    } else {
      clearInterval(intervalRef.current)
    }
    return () => clearInterval(intervalRef.current)
  }, [running])

  async function saveSession(duration) {
    const res = await axios.post('${API_URL}/api/sessions', { duration: Math.floor(duration / 60) }, { headers })
    setSessions(prev => [res.data, ...prev])
  }

  function handleStart() {
    startTimeRef.current = timeLeft
    setRunning(true)
  }

  function handleStop() {
    setRunning(false)
    const elapsed = startTimeRef.current - timeLeft
    if (elapsed > 10) saveSession(elapsed)
    setTimeLeft(25 * 60)
  }
  async function deleteSession(id) {
  await axios.delete(`${API_URL}/api/sessions/${id}`, { headers })
  setSessions(sessions.filter(s => s._id !== id))
}

  const minutes = String(Math.floor(timeLeft / 60)).padStart(2, '0')
  const seconds = String(timeLeft % 60).padStart(2, '0')

  return (
    <div style={{ color: 'var(--text)' }}>
      <h1 className="text-2xl font-semibold mb-6">Focus</h1>

      <div className="flex flex-col items-center justify-center rounded-lg py-16 gap-6 mb-6" style={{ background: 'var(--bg-secondary)', border: '1px solid var(--border)' }}>
        <p className="text-6xl font-semibold tracking-tight">{minutes}:{seconds}</p>
        <p className="text-sm" style={{ color: 'var(--text-muted)' }}>{running ? 'Stay focused...' : 'Session not started'}</p>
        <div className="flex gap-3">
          {!running ? (
            <button onClick={handleStart} className="px-5 py-2 rounded-lg text-sm font-medium text-white" style={{ background: 'var(--accent)' }}>Start</button>
          ) : (
            <button onClick={handleStop} className="px-5 py-2 rounded-lg text-sm font-medium text-white" style={{ background: '#ef4444' }}>Stop</button>
          )}
          <button onClick={() => { setRunning(false); setTimeLeft(25 * 60) }} className="px-5 py-2 rounded-lg text-sm font-medium" style={{ border: '1px solid var(--border)', color: 'var(--text-muted)' }}>Reset</button>
        </div>
      </div>

      <div>
        <p className="text-sm font-medium mb-3">Recent Sessions</p>
        {sessions.length === 0 && <p style={{ color: 'var(--text-muted)' }} className="text-sm">No sessions yet.</p>}
        {sessions.map(session => (
          <div key={session._id} className="flex justify-between rounded-lg px-4 py-3 mb-2" style={{ background: 'var(--bg-secondary)', border: '1px solid var(--border)' }}>
            <p className="text-sm">Pomodoro</p>
            <p className="text-sm" style={{ color: 'var(--accent)' }}>{session.duration} mins</p>
            <button onClick={() => deleteSession(session._id)} className="text-xs px-2 py-1 rounded" style={{ color: '#ef4444' }}>×</button>
          </div>
        ))}
      </div>
    </div>
  )
}

export default Focus