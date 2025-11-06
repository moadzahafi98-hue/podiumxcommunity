import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import TinderCard from 'react-tinder-card'
import { fetchPotentialMatches, swipeUser } from '../features/matches/matchSlice'

const DiscoverPage = () => {
  const dispatch = useDispatch()
  const { candidates, suggestion } = useSelector((state) => state.matches)

  useEffect(() => {
    dispatch(fetchPotentialMatches())
  }, [dispatch])

  const handleSwipe = async (direction, candidate) => {
    if (direction === 'right' || direction === 'left') {
      const result = await dispatch(
        swipeUser({
          targetUserId: candidate.id,
          like: direction === 'right'
        })
      )
      if (swipeUser.fulfilled.match(result)) {
        dispatch(fetchPotentialMatches())
      }
    }
  }

  return (
    <div className="flex flex-col items-center justify-center space-y-6">
      <h1 className="text-3xl font-bold">Find your next training partner</h1>
      {suggestion && <p className="text-electric/80 max-w-xl text-center">AI tip: {suggestion}</p>}
      <div className="relative w-full max-w-md h-[520px]">
        {candidates.map((candidate) => (
          <TinderCard
            key={candidate.id}
            className="absolute w-full h-full"
            onSwipe={(dir) => handleSwipe(dir, candidate)}
            preventSwipe={['up', 'down']}
          >
            <div className="bg-surface/90 h-full rounded-3xl p-6 border border-electric/30 flex flex-col justify-end">
              <div>
                <h2 className="text-2xl font-semibold">{candidate.name}</h2>
                <p className="text-sm text-electric/80">{candidate.city}</p>
                <p className="mt-2 text-sm">Fitness level: {candidate.fitnessLevel}</p>
                <p className="mt-2 text-sm">Availability: {candidate.schedule?.join(', ')}</p>
                <p className="mt-2 text-sm">Interests: {candidate.interests?.join(', ')}</p>
                <p className="mt-2 text-sm">Match score: {candidate.matchScore}%</p>
              </div>
            </div>
          </TinderCard>
        ))}
      </div>
    </div>
  )
}

export default DiscoverPage
