export const calculateMatchScore = (user, candidate) => {
  if (!user || !candidate) return 0
  let score = 0

  if (user.city && candidate.city && user.city === candidate.city) {
    score += 20
  }

  const userInterests = user.interests || []
  const candidateInterests = candidate.interests || []
  const sharedInterests = userInterests.filter((interest) => candidateInterests.includes(interest))
  score += sharedInterests.length * 10

  const userSchedule = user.schedule || []
  const candidateSchedule = candidate.schedule || []
  const sharedSchedule = userSchedule.filter((slot) => candidateSchedule.includes(slot))
  score += sharedSchedule.length * 5

  if (user.fitnessLevel === candidate.fitnessLevel) {
    score += 15
  }

  return Math.min(score, 100)
}
