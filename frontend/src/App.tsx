
import { useState, useEffect } from 'react'
import { BrowserRouter as Router, Routes, Route, Navigate, useLocation } from 'react-router-dom'
import { AnimatePresence, motion } from 'framer-motion'
import Login from './pages/Login'
import Dashboard from './pages/Dashboard'
import ProjectView from './pages/ProjectView'
import Users from './pages/Users'
import Tasks from './pages/Tasks'
import Settings from './pages/Settings'
import AdminDashboard from './pages/AdminDashboard'
import EditorPageRoute from './pages/EditorPageRoute'
import Navbar from './components/Navbar'
import Sidebar from './components/Sidebar'

const PageWrapper = ({ children }: { children: React.ReactNode }) => (
  <motion.div
    initial={{ opacity: 0, y: 20 }}
    animate={{ opacity: 1, y: 0 }}
    exit={{ opacity: 0, y: -20 }}
    transition={{ duration: 0.3 }}
  >
    {children}
  </motion.div>
)

function AppContent() {
  const [token, setToken] = useState<string | null>(localStorage.getItem('token'))
  const location = useLocation()

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
    <div className="min-h-screen bg-gray-50">
      {token && <Navbar />}

      {token ? (
        <div className="flex">
          <Sidebar />
          <main className="flex-1 pt-16 px-4 md:px-8">
            <AnimatePresence mode="wait">
              <Routes location={location} key={location.pathname}>
                <Route path="/login" element={<Navigate to="/dashboard" />} />
                <Route path="/dashboard" element={<PageWrapper><Dashboard /></PageWrapper>} />
                <Route path="/editor" element={<PageWrapper><EditorPageRoute /></PageWrapper>} />
                <Route path="/admin-dashboard" element={<PageWrapper><AdminDashboard /></PageWrapper>} />
                <Route path="/project/:id" element={<PageWrapper><ProjectView /></PageWrapper>} />
                <Route path="/users" element={<PageWrapper><Users /></PageWrapper>} />
                <Route path="/admin" element={<PageWrapper><AdminDashboard /></PageWrapper>} />
                <Route path="/tasks" element={<PageWrapper><Tasks /></PageWrapper>} />
                <Route path="/settings" element={<PageWrapper><Settings /></PageWrapper>} />
                <Route path="/" element={<Navigate to="/dashboard" />} />
              </Routes>
            </AnimatePresence>
          </main>
        </div>
      ) : (
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/" element={<Navigate to="/login" />} />
        </Routes>
      )}
    </div>
  )
}

function App() {
  return (
    <Router>
      <AppContent />
    </Router>
  )
}

export default App

