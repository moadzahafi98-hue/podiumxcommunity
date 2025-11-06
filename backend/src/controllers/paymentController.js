import { stripe, pricingTable } from '../utils/stripe.js'

export const createCheckoutSession = async (req, res, next) => {
  try {
    const { plan } = req.body
    const priceId = pricingTable[plan]
    if (!priceId) {
      return res.status(400).json({ message: 'Invalid plan' })
    }
    const session = await stripe.checkout.sessions.create({
      mode: 'subscription',
      line_items: [{ price: priceId, quantity: 1 }],
      success_url: `${process.env.CORS_ORIGIN}/profile?status=success`,
      cancel_url: `${process.env.CORS_ORIGIN}/profile?status=cancel`
    })
    res.json({ url: session.url })
  } catch (error) {
    next(error)
  }
}

export const handleStripeWebhook = async (req, res) => {
  const event = req.body
  switch (event.type) {
    case 'checkout.session.completed':
      console.log('Subscription activated', event.data.object.id)
      break
    default:
      console.log('Unhandled Stripe event', event.type)
  }
  res.json({ received: true })
}
