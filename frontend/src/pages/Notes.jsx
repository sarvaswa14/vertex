import { useEffect, useState } from 'react'
import axios from 'axios'
import API_URL from '../config'

function Notes() {
  const [notes, setNotes] = useState([])
  const [selected, setSelected] = useState(null)
  const [title, setTitle] = useState('')
  const [content, setContent] = useState('')

  const token = localStorage.getItem('token')
  const headers = { Authorization: `Bearer ${token}` }

  useEffect(() => {
    axios.get('${API_URL}/api/notes', { headers })
      .then(res => {
        setNotes(res.data)
        if (res.data.length > 0) {
          setSelected(res.data[0])
          setTitle(res.data[0].title)
          setContent(res.data[0].content)
        }
      })
  }, [])

  async function createNote() {
    const res = await axios.post('${API_URL}/api/notes', { title: 'Untitled', content: '' }, { headers })
    setNotes([res.data, ...notes])
    setSelected(res.data)
    setTitle(res.data.title)
    setContent(res.data.content)
  }

  async function saveNote() {
    await axios.put(`${API_URL}/api/notes/${selected._id}`, { title, content }, { headers })
    setNotes(notes.map(n => n._id === selected._id ? { ...n, title, content } : n))
  }

  async function deleteNote(id) {
    await axios.delete(`${API_URL}/api/notes/${id}`, { headers })
    setNotes(notes.filter(n => n._id !== id))
    if (selected?._id === id) {
      setSelected(null)
      setTitle('')
      setContent('')
    }
  }

  return (
    <div style={{ color: 'var(--text)' }}>
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-semibold">Notes</h1>
        <button onClick={createNote} className="px-4 py-2 rounded-lg text-sm font-medium text-white" style={{ background: 'var(--accent)' }}>New Note</button>
      </div>

      <div className="grid gap-4" style={{ gridTemplateColumns: '280px 1fr' }}>
        <div>
          {notes.length === 0 && <p style={{ color: 'var(--text-muted)' }} className="text-sm">No notes yet.</p>}
          {notes.map(note => (
            <div key={note._id} className="flex items-center justify-between rounded-lg px-3 py-3 mb-1"
              style={{ background: selected?._id === note._id ? 'var(--bg-secondary)' : 'transparent' }}>
              <div onClick={() => { setSelected(note); setTitle(note.title); setContent(note.content) }} className="cursor-pointer flex-1">
                <p className="text-sm font-medium">{note.title || 'Untitled'}</p>
                <p className="text-xs mt-0.5 truncate" style={{ color: 'var(--text-muted)' }}>{note.content || 'No content'}</p>
              </div>
              <button onClick={() => deleteNote(note._id)} className="text-xs px-2 py-1 rounded ml-2" style={{ color: '#ef4444' }}>×</button>
            </div>
          ))}
        </div>

        <div className="rounded-lg p-5 flex flex-col gap-3" style={{ background: 'var(--bg-secondary)', border: '1px solid var(--border)' }}>
          {selected ? (
            <>
              <input
                value={title}
                onChange={e => setTitle(e.target.value)}
                placeholder="Note title"
                className="w-full bg-transparent text-lg font-medium outline-none pb-3"
                style={{ color: 'var(--text)', borderBottom: '1px solid var(--border)' }}
              />
              <textarea
                value={content}
                onChange={e => setContent(e.target.value)}
                placeholder="Start writing..."
                className="flex-1 w-full bg-transparent text-sm outline-none resize-none leading-relaxed"
                style={{ color: 'var(--text)', minHeight: '300px' }}
              />
              <div className="flex justify-end">
                <button onClick={saveNote} className="px-4 py-2 rounded-lg text-xs font-medium" style={{ background: 'var(--bg)', border: '1px solid var(--border)', color: 'var(--text-muted)' }}>Save</button>
              </div>
            </>
          ) : (
            <p style={{ color: 'var(--text-muted)' }} className="text-sm">Create a note to get started.</p>
          )}
        </div>
      </div>
    </div>
  )
}

export default Notes