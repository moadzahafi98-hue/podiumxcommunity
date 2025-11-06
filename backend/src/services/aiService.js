import OpenAI from 'openai'

const client = process.env.OPENAI_API_KEY ? new OpenAI({ apiKey: process.env.OPENAI_API_KEY }) : null

export const suggestTrainingPartner = async (profile) => {
  if (!client || !profile) {
    return 'Enable OPENAI_API_KEY to get smart suggestions.'
  }
  const interests = Array.isArray(profile.interests) && profile.interests.length > 0 ? profile.interests.join(', ') : 'general fitness'
  const prompt = `Suggest a motivational sentence that encourages a ${profile.fitnessLevel || 'beginner'} athlete interested in ${interests} to meet a training partner.`
  const completion = await client.responses.create({
    model: 'gpt-4o-mini',
    input: prompt
  })
  return completion.output_text
}
