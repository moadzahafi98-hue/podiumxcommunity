import { useEffect, useState } from 'react'
import { apiClient } from '../utils/api'

const AdminPage = () => {
  const [users, setUsers] = useState([])
  const [reports, setReports] = useState([])
  const [analytics, setAnalytics] = useState(null)

  useEffect(() => {
    const loadData = async () => {
      const [{ data: usersRes }, { data: reportsRes }, { data: analyticsRes }] = await Promise.all([
        apiClient.get('/admin/users'),
        apiClient.get('/admin/reports'),
        apiClient.get('/admin/analytics')
      ])
      setUsers(usersRes.users)
      setReports(reportsRes.reports)
      setAnalytics(analyticsRes.analytics)
    }
    loadData()
  }, [])

  const handleBanUser = async (userId) => {
    await apiClient.post(`/admin/users/${userId}/ban`)
    setUsers((prev) => prev.map((user) => (user.id === userId ? { ...user, status: 'banned' } : user)))
  }

  const handleAnnouncement = async (message) => {
    await apiClient.post('/admin/announce', { message })
    alert('Announcement sent to all users')
  }

  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-bold">Admin control center</h1>
      <section className="bg-surface/80 p-6 rounded-3xl space-y-4">
        <h2 className="text-xl font-semibold">Platform analytics</h2>
        {analytics ? (
          <div className="grid md:grid-cols-3 gap-4">
            <div className="bg-background/60 rounded-2xl p-4">
              <p className="text-sm text-electric/70">Daily active users</p>
              <p className="text-2xl font-bold">{analytics.dailyActiveUsers}</p>
            </div>
            <div className="bg-background/60 rounded-2xl p-4">
              <p className="text-sm text-electric/70">Match rate</p>
              <p className="text-2xl font-bold">{analytics.matchRate}%</p>
            </div>
            <div className="bg-background/60 rounded-2xl p-4">
              <p className="text-sm text-electric/70">Monthly revenue</p>
              <p className="text-2xl font-bold">${analytics.revenue}</p>
            </div>
          </div>
        ) : (
          <p>Loading analytics...</p>
        )}
      </section>
      <section className="bg-surface/80 p-6 rounded-3xl space-y-4">
        <h2 className="text-xl font-semibold">User management</h2>
        <div className="space-y-2">
          {users.map((user) => (
            <div key={user.id} className="flex items-center justify-between bg-background/60 rounded-2xl p-4">
              <div>
                <p className="font-semibold">{user.name}</p>
                <p className="text-sm text-electric/70">{user.email}</p>
                <p className="text-xs text-electric/50">Status: {user.status}</p>
              </div>
              <button onClick={() => handleBanUser(user.id)}>Ban user</button>
            </div>
          ))}
        </div>
      </section>
      <section className="bg-surface/80 p-6 rounded-3xl space-y-4">
        <h2 className="text-xl font-semibold">Community reports</h2>
        <div className="space-y-2">
          {reports.map((report) => (
            <div key={report.id} className="bg-background/60 rounded-2xl p-4">
              <p className="font-semibold">{report.reason}</p>
              <p className="text-sm text-electric/70">Reported user: {report.reportedUser.name}</p>
              <p className="text-xs text-electric/60">Filed by: {report.reportedBy.name}</p>
            </div>
          ))}
        </div>
      </section>
      <section className="bg-surface/80 p-6 rounded-3xl space-y-4">
        <h2 className="text-xl font-semibold">Broadcast announcement</h2>
        <AnnouncementForm onSubmit={handleAnnouncement} />
      </section>
    </div>
  )
}

const AnnouncementForm = ({ onSubmit }) => {
  const [message, setMessage] = useState('')

  const handleSubmit = (e) => {
    e.preventDefault()
    if (!message.trim()) return
    onSubmit(message)
    setMessage('')
  }

  return (
    <form className="flex gap-3" onSubmit={handleSubmit}>
      <input
        className="flex-1 px-4 py-2 rounded-2xl text-black"
        placeholder="Enter announcement message"
        value={message}
        onChange={(e) => setMessage(e.target.value)}
      />
      <button type="submit">Send</button>
    </form>
  )
}

export default AdminPage
