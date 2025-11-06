import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { fetchPotentialMatches } from '../features/matches/matchSlice'
import { fetchFeed } from '../features/feed/feedSlice'
import { fetchEvents } from '../features/events/eventSlice'
import MembershipTiers from '../components/MembershipTiers'
import Leaderboard from '../components/Leaderboard'

const DashboardPage = () => {
  const dispatch = useDispatch()
  const { candidates } = useSelector((state) => state.matches)
  const { posts } = useSelector((state) => state.feed)
  const { list: events } = useSelector((state) => state.events)

  useEffect(() => {
    dispatch(fetchPotentialMatches())
    dispatch(fetchFeed())
    dispatch(fetchEvents())
  }, [dispatch])

  return (
    <div className="space-y-6">
      <section className="bg-surface/80 p-6 rounded-3xl">
        <h2 className="text-2xl font-semibold mb-4">Suggested training partners</h2>
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
          {candidates.slice(0, 3).map((candidate) => (
            <div key={candidate.id} className="p-4 rounded-2xl bg-background/60 border border-electric/20">
              <p className="text-lg font-semibold">{candidate.name}</p>
              <p className="text-sm text-electric/80">{candidate.city}</p>
              <p className="text-sm mt-2">Interests: {candidate.interests.join(', ')}</p>
            </div>
          ))}
        </div>
      </section>
      <section className="bg-surface/80 p-6 rounded-3xl">
        <h2 className="text-2xl font-semibold mb-4">Upcoming events</h2>
        <div className="space-y-4">
          {events.slice(0, 3).map((event) => (
            <div key={event.id} className="p-4 rounded-2xl bg-background/60 border border-electric/20">
              <p className="text-lg font-semibold">{event.title}</p>
              <p className="text-sm text-electric/80">{event.date}</p>
              <p className="text-sm mt-2">{event.description}</p>
            </div>
          ))}
        </div>
      </section>
      <section className="grid lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 bg-surface/80 p-6 rounded-3xl">
          <h2 className="text-2xl font-semibold mb-4">Community feed</h2>
          <div className="space-y-4">
            {posts.slice(0, 4).map((post) => (
              <div key={post.id} className="p-4 rounded-2xl bg-background/60 border border-electric/20">
                <p className="font-semibold">{post.author.name}</p>
                <p className="text-sm text-electric/80">{post.tag}</p>
                <p className="mt-2 text-sm">{post.content}</p>
              </div>
            ))}
          </div>
        </div>
        <div className="space-y-6">
          <Leaderboard />
          <div className="bg-surface/80 p-6 rounded-3xl">
            <h2 className="text-xl font-semibold mb-4">Membership plans</h2>
            <MembershipTiers />
          </div>
        </div>
      </section>
    </div>
  )
}

export default DashboardPage
