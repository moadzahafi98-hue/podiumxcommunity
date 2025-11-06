import { useSelector } from 'react-redux'

const MatchesPage = () => {
  const { matches } = useSelector((state) => state.matches)

  return (
    <div className="space-y-4">
      <h1 className="text-3xl font-bold">Your matches</h1>
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
        {matches.map((match) => (
          <div key={match.id} className="p-4 rounded-2xl bg-surface/80 border border-electric/30">
            <p className="text-lg font-semibold">{match.name || 'Training partner'}</p>
            <p className="text-sm text-electric/80">{match.city}</p>
            <p className="text-sm mt-2">Interests: {(match.interests || []).join(', ') || 'Getting fit'}</p>
            {match.matchScore && <p className="text-sm mt-2">Match score: {Math.round(match.matchScore)}%</p>}
          </div>
        ))}
        {matches.length === 0 && <p>No matches yet. Keep swiping!</p>}
      </div>
    </div>
  )
}

export default MatchesPage
