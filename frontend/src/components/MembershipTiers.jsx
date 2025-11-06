import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { createCheckoutSession } from '../features/payments/paymentSlice'

const tiers = [
  {
    id: 'free',
    name: 'PodiumX Free',
    description: ['10 daily swipes', '3 chats open', 'Access community feed'],
    price: 'Free'
  },
  {
    id: 'plus',
    name: 'PodiumX Plus',
    description: ['Unlimited swipes', 'Chat history', 'Priority match algorithm'],
    price: '$19/mo'
  },
  {
    id: 'pro',
    name: 'PodiumX Pro',
    description: ['Publish classes/events', 'Analytics dashboard', 'Premium support'],
    price: '$49/mo'
  }
]

const MembershipTiers = () => {
  const dispatch = useDispatch()
  const { status, checkoutUrl, error } = useSelector((state) => state.payments)

  useEffect(() => {
    if (checkoutUrl) {
      window.location.href = checkoutUrl
    }
  }, [checkoutUrl])

  const handleSubscribe = (tierId) => {
    if (tierId === 'free') return
    dispatch(createCheckoutSession({ plan: tierId }))
  }

  return (
    <div className="space-y-4">
      {error && <p className="text-red-400 text-sm">{error}</p>}
      <div className="grid md:grid-cols-3 gap-4">
        {tiers.map((tier) => (
          <div key={tier.id} className="bg-surface/80 rounded-3xl p-6 space-y-4 border border-electric/30">
            <div>
              <h3 className="text-xl font-semibold">{tier.name}</h3>
              <p className="text-electric/70">{tier.price}</p>
            </div>
            <ul className="space-y-2 text-sm">
              {tier.description.map((item) => (
                <li key={item}>• {item}</li>
              ))}
            </ul>
            <button onClick={() => handleSubscribe(tier.id)} disabled={status === 'loading'}>
              {tier.id === 'free' ? 'Current Plan' : 'Upgrade'}
            </button>
          </div>
        ))}
      </div>
    </div>
  )
}

export default MembershipTiers
