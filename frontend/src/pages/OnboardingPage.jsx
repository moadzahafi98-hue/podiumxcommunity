import { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { apiClient } from '../utils/api'
import { setUser } from '../features/auth/authSlice'

const interestOptions = ['CrossFit', 'Cardio', 'Yoga', 'Mobility', 'Strength', 'HIIT', 'Running', 'Pilates']
const availabilityOptions = ['Morning', 'Midday', 'Evening']

const OnboardingPage = () => {
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const { user, token } = useSelector((state) => state.auth)
  const [form, setForm] = useState({
    name: user?.displayName || user?.name || '',
    city: '',
    fitnessLevel: 'beginner',
    interests: [],
    schedule: [],
    distance: 10
  })

  const toggleValue = (key, value) => {
    setForm((prev) => {
      const list = prev[key]
      const exists = list.includes(value)
      return {
        ...prev,
        [key]: exists ? list.filter((item) => item !== value) : [...list, value]
      }
    })
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    await apiClient.post('/users/onboarding', form)
    dispatch(setUser({ user: { ...user, ...form }, token, onboardingComplete: true }))
    navigate('/')
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-background">
      <form className="bg-surface/90 p-8 rounded-3xl shadow-neon max-w-3xl w-full space-y-6" onSubmit={handleSubmit}>
        <h1 className="text-3xl font-bold text-center">Let&apos;s personalize your PodiumX experience</h1>
        <div className="grid md:grid-cols-2 gap-6">
          <div>
            <label className="block text-sm mb-1">Name</label>
            <input
              className="w-full px-4 py-2 rounded-lg text-black"
              value={form.name}
              onChange={(e) => setForm({ ...form, name: e.target.value })}
              required
            />
          </div>
          <div>
            <label className="block text-sm mb-1">City</label>
            <input
              className="w-full px-4 py-2 rounded-lg text-black"
              value={form.city}
              onChange={(e) => setForm({ ...form, city: e.target.value })}
              required
            />
          </div>
          <div>
            <label className="block text-sm mb-1">Fitness level</label>
            <select
              className="w-full px-4 py-2 rounded-lg text-black"
              value={form.fitnessLevel}
              onChange={(e) => setForm({ ...form, fitnessLevel: e.target.value })}
            >
              <option value="beginner">Beginner</option>
              <option value="intermediate">Intermediate</option>
              <option value="advanced">Advanced</option>
            </select>
          </div>
          <div>
            <label className="block text-sm mb-1">Distance preference (km)</label>
            <input
              type="number"
              className="w-full px-4 py-2 rounded-lg text-black"
              value={form.distance}
              onChange={(e) => setForm({ ...form, distance: Number(e.target.value) })}
            />
          </div>
        </div>
        <div>
          <p className="text-sm mb-2">Training interests</p>
          <div className="flex flex-wrap gap-2">
            {interestOptions.map((interest) => {
              const active = form.interests.includes(interest)
              return (
                <button
                  type="button"
                  key={interest}
                  onClick={() => toggleValue('interests', interest)}
                  className={`px-4 py-2 rounded-full border ${active ? 'bg-electric text-black' : 'border-electric/40'}`}
                >
                  {interest}
                </button>
              )
            })}
          </div>
        </div>
        <div>
          <p className="text-sm mb-2">Preferred schedule</p>
          <div className="flex gap-2">
            {availabilityOptions.map((time) => {
              const active = form.schedule.includes(time)
              return (
                <button
                  type="button"
                  key={time}
                  onClick={() => toggleValue('schedule', time)}
                  className={`px-4 py-2 rounded-full border ${active ? 'bg-electric text-black' : 'border-electric/40'}`}
                >
                  {time}
                </button>
              )
            })}
          </div>
        </div>
        <button type="submit" className="w-full">
          Save and continue
        </button>
      </form>
    </div>
  )
}

export default OnboardingPage
