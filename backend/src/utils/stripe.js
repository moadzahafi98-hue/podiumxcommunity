import Stripe from 'stripe'

export const stripe = new Stripe(process.env.STRIPE_SECRET_KEY)

export const pricingTable = {
  plus: process.env.STRIPE_PLUS_PRICE_ID || 'price_plus',
  pro: process.env.STRIPE_PRO_PRICE_ID || 'price_pro'
}
