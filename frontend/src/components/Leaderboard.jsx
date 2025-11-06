import { useEffect, useState } from 'react'
import { apiClient } from '../utils/api'

const Leaderboard = () => {
  const [leaders, setLeaders] = useState([])

  useEffect(() => {
    const loadLeaderboard = async () => {
      const { data } = await apiClient.get('/leaderboard')
      setLeaders(data.leaders)
    }
    loadLeaderboard()
  }, [])

  return (
    <div className="bg-surface/80 p-6 rounded-3xl space-y-4">
      <h2 className="text-xl font-semibold">Weekly leaderboard</h2>
      <ol className="space-y-2">
        {leaders.map((leader, index) => (
          <li key={leader.userId} className="flex items-center justify-between bg-background/60 px-4 py-3 rounded-2xl">
            <span className="font-semibold">#{index + 1} {leader.name}</span>
            <span className="text-electric/80">{leader.points} XP</span>
          </li>
        ))}
      </ol>
    </div>
  )
}

export default Leaderboard
