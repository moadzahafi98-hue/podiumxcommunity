function Membership() {
  try {
    const tiers = [
      {
        name: 'Free',
        price: '$0',
        features: ['Basic profile', '10 daily swipes', '3 matches per day', 'Standard support', 'Access to public events']
      },
      {
        name: 'PodiumX Plus',
        price: '$19',
        period: '/month',
        features: ['Everything in Free', 'Unlimited swipes', 'Unlimited matches', 'Premium coaches access', 'Advanced analytics', 'Priority support'],
        highlight: true
      },
      {
        name: 'PodiumX Pro',
        price: '$49',
        period: '/month',
        features: ['Everything in Plus', 'Verified coach account', 'Publish sessions & classes', 'Revenue sharing', 'Business dashboard', 'Dedicated support']
      }
    ];

    return (
      <section id="membership" className="py-20 px-4" data-name="membership" data-file="components/Membership.js">
        <div className="container mx-auto">
          <h2 className="text-5xl md:text-6xl text-center mb-4 glow-text">MEMBERSHIP</h2>
          <p className="text-center text-[var(--text-secondary)] text-lg mb-16 max-w-2xl mx-auto">
            Choose the plan that fits your fitness journey
          </p>

          <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
            {tiers.map((tier, index) => (
              <div key={index} className={`card-dark ${tier.highlight ? 'border-2 border-[var(--primary-color)] scale-105' : ''}`}>
                {tier.highlight && (
                  <div className="bg-[var(--primary-color)] text-black text-sm font-bold px-4 py-1 rounded-full inline-block mb-4">
                    MOST POPULAR
                  </div>
                )}
                <h3 className="text-3xl font-bold mb-2">{tier.name}</h3>
                <div className="mb-6">
                  <span className="text-5xl font-bold glow-text">{tier.price}</span>
                  {tier.period && <span className="text-[var(--text-secondary)]">{tier.period}</span>}
                </div>
                <ul className="space-y-3 mb-8">
                  {tier.features.map((feature, idx) => (
                    <li key={idx} className="flex items-start">
                      <div className="icon-check text-lg text-[var(--primary-color)] mr-2 mt-1"></div>
                      <span className="text-[var(--text-secondary)]">{feature}</span>
                    </li>
                  ))}
                </ul>
                <button className={tier.highlight ? 'btn-primary w-full' : 'btn-secondary w-full'}>
                  Get Started
                </button>
              </div>
            ))}
          </div>
        </div>
      </section>
    );
  } catch (error) {
    console.error('Membership component error:', error);
    return null;
  }
}