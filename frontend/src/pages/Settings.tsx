import { useEffect, useState } from 'react'
import { getCurrentUser } from '../services/api'

const Settings = () => {
  const [me, setMe] = useState<any>(null)
  const [loading, setLoading] = useState(true)
  const [displayName, setDisplayName] = useState('')
  const [theme, setTheme] = useState(localStorage.getItem('theme') || 'light')

  useEffect(() => {
    const load = async () => {
      try {
        const res = await getCurrentUser()
        setMe(res.data)
        setDisplayName(res.data.full_name || '')
      } catch (err) {
        console.error('Could not load current user', err)
      } finally {
        setLoading(false)
      }
    }
    load()
  }, [])

  const saveSettings = () => {
    // Currently local-only settings (theme). Persist to server when API available.
    localStorage.setItem('theme', theme)
    alert('Settings saved (local)')
  }

  return (
    <div className="container mx-auto px-4 py-8 max-w-3xl">
      <h1 className="text-2xl font-bold text-gray-900 mb-2">Settings</h1>
      <p className="text-sm text-gray-500 mb-6">Manage your account and application preferences</p>

      <div className="bg-white rounded-lg shadow-sm p-6 mb-6">
        <h2 className="font-medium mb-3">Profile</h2>
        {loading ? (
          <div className="animate-pulse space-y-2">
            <div className="h-4 bg-gray-200 rounded w-1/3" />
            <div className="h-4 bg-gray-200 rounded w-1/4" />
          </div>
        ) : me ? (
          <div className="space-y-3">
            <div>
              <label className="text-sm text-gray-600 block mb-1">Display name</label>
              <input
                value={displayName}
                onChange={(e) => setDisplayName(e.target.value)}
                className="w-full px-3 py-2 border rounded-md"
              />
            </div>
            <div>
              <label className="text-sm text-gray-600 block mb-1">Email</label>
              <div className="text-sm text-gray-700">{me.email}</div>
            </div>
          </div>
        ) : (
          <div className="text-sm text-gray-500">Not signed in</div>
        )}
      </div>

      <div className="bg-white rounded-lg shadow-sm p-6">
        <h2 className="font-medium mb-3">Preferences</h2>
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <div className="text-sm font-medium">Theme</div>
              <div className="text-xs text-gray-500">Choose light or dark UI</div>
            </div>
            <select value={theme} onChange={(e) => setTheme(e.target.value)} className="px-3 py-2 border rounded-md">
              <option value="light">Light</option>
              <option value="dark">Dark</option>
            </select>
          </div>

          <div className="flex justify-end">
            <button onClick={saveSettings} className="px-4 py-2 bg-primary-600 text-white rounded-md">Save settings</button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Settings
