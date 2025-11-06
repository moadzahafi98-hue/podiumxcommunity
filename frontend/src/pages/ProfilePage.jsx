import { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import { apiClient } from '../utils/api'

const ProfilePage = () => {
  const { user } = useSelector((state) => state.auth)
  const [profile, setProfile] = useState(null)
  const [editing, setEditing] = useState(false)
  const [form, setForm] = useState({})

  useEffect(() => {
    const loadProfile = async () => {
      const { data } = await apiClient.get(`/users/${user.uid}`)
      setProfile(data.user)
      setForm(data.user)
    }
    if (user?.uid) {
      loadProfile()
    }
  }, [user])

  const handleSubmit = async (e) => {
    e.preventDefault()
    const { data } = await apiClient.put(`/users/${user.uid}`, form)
    setProfile(data.user)
    setEditing(false)
  }

  if (!profile) {
    return <p>Loading profile...</p>
  }

  const stats = profile.stats || { workoutsCompleted: 0, sessionsJoined: 0 }

  return (
    <div className="space-y-6">
      <div className="bg-surface/80 p-6 rounded-3xl flex flex-col md:flex-row gap-6">
        <div className="w-32 h-32 rounded-full bg-electric/40 flex items-center justify-center text-3xl font-bold">
          {profile.name?.[0] || user.email[0]}
        </div>
        <div className="flex-1 space-y-2">
          <h1 className="text-3xl font-bold">{profile.name}</h1>
          <p className="text-electric/80">{profile.city}</p>
          <p className="text-sm">Fitness goals: {profile.goals}</p>
          <p className="text-sm">Level: {profile.fitnessLevel}</p>
          <p className="text-sm">Workouts completed: {stats.workoutsCompleted}</p>
          <p className="text-sm">Sessions joined: {stats.sessionsJoined}</p>
          <p className="text-sm">Visibility: {profile.visibility}</p>
          <p className="text-sm">Profile completion: {profile.completion}%</p>
          <button onClick={() => setEditing((prev) => !prev)}>{editing ? 'Cancel' : 'Edit profile'}</button>
        </div>
      </div>
      {editing && (
        <form className="bg-surface/80 p-6 rounded-3xl space-y-4" onSubmit={handleSubmit}>
          <div className="grid md:grid-cols-2 gap-4">
            <input
              className="px-4 py-2 rounded-2xl text-black"
              value={form.name || ''}
              onChange={(e) => setForm({ ...form, name: e.target.value })}
              placeholder="Name"
            />
            <input
              className="px-4 py-2 rounded-2xl text-black"
              value={form.city || ''}
              onChange={(e) => setForm({ ...form, city: e.target.value })}
              placeholder="City"
            />
            <input
              className="px-4 py-2 rounded-2xl text-black"
              value={form.goals || ''}
              onChange={(e) => setForm({ ...form, goals: e.target.value })}
              placeholder="Fitness goals"
            />
            <input
              className="px-4 py-2 rounded-2xl text-black"
              value={form.height || ''}
              onChange={(e) => setForm({ ...form, height: e.target.value })}
              placeholder="Height"
            />
          </div>
          <textarea
            className="w-full px-4 py-2 rounded-2xl text-black"
            value={form.bio || ''}
            onChange={(e) => setForm({ ...form, bio: e.target.value })}
            placeholder="Bio"
          />
          <button type="submit">Save changes</button>
        </form>
      )}
    </div>
  )
}

export default ProfilePage
