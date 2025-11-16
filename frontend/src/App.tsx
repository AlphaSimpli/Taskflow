import { useState, useEffect } from 'react'
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom'
import Login from './pages/Login'
import Dashboard from './pages/Dashboard'
import ProjectView from './pages/ProjectView'
import Users from './pages/Users'
import Tasks from './pages/Tasks'
import Settings from './pages/Settings'
import Admin from './pages/Admin'
import AdminDashboard from './pages/AdminDashboard'
import EditorPageRoute from './pages/EditorPageRoute'
import Navbar from './components/Navbar'
import Sidebar from './components/Sidebar'

function App() {
  // Keep token in state so the app responds immediately when login sets localStorage
  const [token, setToken] = useState<string | null>(localStorage.getItem('token'))

  useEffect(() => {
    // Custom event dispatched from Login after storing token
    const onLogin = () => setToken(localStorage.getItem('token'))
    // storage event for other tabs/windows
    const onStorage = (e: StorageEvent) => {
      if (e.key === 'token') setToken(e.newValue)
    }

    window.addEventListener('login', onLogin)
    window.addEventListener('storage', onStorage)
    return () => {
      window.removeEventListener('login', onLogin)
      window.removeEventListener('storage', onStorage)
    }
  }, [])

  return (
    <Router>
      <div className="min-h-screen bg-gray-50">
        {token && <Navbar />}

        {token ? (
          <div className="flex">
            <Sidebar />
            <main className="flex-1 pt-16 px-4 md:px-8">
              <Routes>
                <Route path="/login" element={<Navigate to="/dashboard" />} />
                <Route path="/dashboard" element={<Dashboard />} />
                <Route path="/editor" element={<EditorPageRoute />} />
                <Route path="/admin-dashboard" element={<AdminDashboard />} />
                <Route path="/project/:id" element={<ProjectView />} />
                <Route path="/users" element={<Users />} />
                <Route path="/admin" element={<Admin />} />
                <Route path="/tasks" element={<Tasks />} />
                <Route path="/settings" element={<Settings />} />
                <Route path="/" element={<Navigate to="/dashboard" />} />
              </Routes>
            </main>
          </div>
        ) : (
          <Routes>
            <Route path="/login" element={<Login />} />
            <Route path="/" element={<Navigate to="/login" />} />
          </Routes>
        )}
      </div>
    </Router>
  )
}

export default App

