import { useEffect, useState } from 'react'
import axios from 'axios'

function Tasks() {
  const [tasks, setTasks] = useState([])
  const [title, setTitle] = useState('')

  const token = localStorage.getItem('token')
  const headers = { Authorization: `Bearer ${token}` }

  useEffect(() => {
    axios.get('http://localhost:5000/api/tasks', { headers })
      .then(res => setTasks(res.data))
  }, [])

  async function addTask() {
    if (!title.trim()) return
    const res = await axios.post('http://localhost:5000/api/tasks', { title }, { headers })
    setTasks([res.data, ...tasks])
    setTitle('')
  }

  async function toggleComplete(task) {
    const res = await axios.put(`http://localhost:5000/api/tasks/${task._id}`, { completed: !task.completed }, { headers })
    setTasks(tasks.map(t => t._id === task._id ? res.data : t))
  }

  async function deleteTask(id) {
    await axios.delete(`http://localhost:5000/api/tasks/${id}`, { headers })
    setTasks(tasks.filter(t => t._id !== id))
  }

  return (
    <div style={{ color: 'var(--text)' }}>
      <h1 className="text-2xl font-semibold mb-6">Tasks</h1>

      <div className="flex gap-2 mb-6">
        <input
          value={title}
          onChange={e => setTitle(e.target.value)}
          onKeyDown={e => e.key === 'Enter' && addTask()}
          placeholder="Add a task..."
          className="flex-1 rounded-lg px-4 py-2 text-sm outline-none"
          style={{ background: 'var(--bg-secondary)', border: '1px solid var(--border)', color: 'var(--text)' }}
        />
        <button
          onClick={addTask}
          className="px-4 py-2 rounded-lg text-sm font-medium text-white"
          style={{ background: 'var(--accent)' }}
        >
          Add
        </button>
      </div>

      <div className="space-y-2">
        {tasks.length === 0 && <p style={{ color: 'var(--text-muted)' }} className="text-sm">No tasks yet.</p>}
        {tasks.map(task => (
          <div key={task._id} className="flex items-center justify-between rounded-lg px-4 py-3" style={{ background: 'var(--bg-secondary)', border: '1px solid var(--border)' }}>
            <div className="flex items-center gap-3">
              <input
                type="checkbox"
                checked={task.completed}
                onChange={() => toggleComplete(task)}
                className="cursor-pointer"
              />
              <p className="text-sm" style={{ color: task.completed ? 'var(--text-muted)' : 'var(--text)', textDecoration: task.completed ? 'line-through' : 'none' }}>
                {task.title}
              </p>
            </div>
            <button
              onClick={() => deleteTask(task._id)}
              className="text-xs px-2 py-1 rounded"
              style={{ color: '#ef4444' }}
            >
              Delete
            </button>
          </div>
        ))}
      </div>
    </div>
  )
}

export default Tasks