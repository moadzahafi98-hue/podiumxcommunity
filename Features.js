function Features() {
  try {
    const features = [
      {
        icon: 'heart-handshake',
        title: 'Smart Matching',
        description: 'Swipe to connect with training partners who share your goals, schedule, and fitness level.'
      },
      {
        icon: 'map-pin',
        title: 'Location Discovery',
        description: 'Find nearby gyms, outdoor spots, and PodiumX centers on an interactive map.'
      },
      {
        icon: 'calendar-check',
        title: 'Session Booking',
        description: 'Plan and schedule joint training sessions with matched partners instantly.'
      },
      {
        icon: 'messages-square',
        title: 'Real-time Chat',
        description: 'Connect through secure messaging and coordinate your training sessions.'
      },
      {
        icon: 'trophy',
        title: 'Gamification',
        description: 'Earn points, unlock achievements, and compete on community leaderboards.'
      },
      {
        icon: 'users',
        title: 'Community Events',
        description: 'Join local meetups, workshops, and training events with the PodiumX community.'
      }
    ];

    return (
      <section id="features" className="py-20 px-4" data-name="features" data-file="components/Features.js">
        <div className="container mx-auto">
          <h2 className="text-5xl md:text-6xl text-center mb-4 glow-text">FEATURES</h2>
          <p className="text-center text-[var(--text-secondary)] text-lg mb-16 max-w-2xl mx-auto">
            Everything you need to find training partners and build your fitness community
          </p>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {features.map((feature, index) => (
              <div key={index} className="card-dark">
                <div className="w-16 h-16 rounded-xl flex items-center justify-center bg-[var(--secondary-color)] mb-4">
                  <div className={`icon-${feature.icon} text-3xl text-[var(--primary-color)]`}></div>
                </div>
                <h3 className="text-2xl font-bold mb-3">{feature.title}</h3>
                <p className="text-[var(--text-secondary)]">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    );
  } catch (error) {
    console.error('Features component error:', error);
    return null;
  }
}