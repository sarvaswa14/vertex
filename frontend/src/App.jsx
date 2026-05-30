import { BrowserRouter, Routes, Route } from "react-router-dom";
import Analytics from './pages/Analytics'
import Login from './pages/Login'
import Dashboard from './pages/Dashboard'
import Focus from './pages/Focus'
import Notes from './pages/Notes'
import Signup from './pages/Signup'
import Tasks from './pages/Tasks'
import Layout from './components/Layout'
import ProtectedRoute from './components/ProtectedRoute'
import { Navigate } from 'react-router-dom'
function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Navigate to="/login" />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/dashboard" element={<ProtectedRoute><Layout><Dashboard /></Layout></ProtectedRoute>} />
        <Route path="/tasks" element={<ProtectedRoute><Layout><Tasks /></Layout></ProtectedRoute>} />
        <Route path="/focus" element={<ProtectedRoute><Layout><Focus /></Layout></ProtectedRoute>} />
        <Route path="/analytics" element={<ProtectedRoute><Layout><Analytics /></Layout></ProtectedRoute>} />
        <Route path="/notes" element={<ProtectedRoute><Layout><Notes /></Layout></ProtectedRoute>} />
      </Routes>
    </BrowserRouter>
  )
}

export default App