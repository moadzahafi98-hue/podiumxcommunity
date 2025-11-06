function HowItWorks() {
  try {
    const steps = [
      {
        number: '01',
        title: 'Create Your Profile',
        description: 'Set up your fitness profile with goals, interests, and availability.'
      },
      {
        number: '02',
        title: 'Swipe & Match',
        description: 'Browse nearby users and swipe right to connect with compatible training partners.'
      },
      {
        number: '03',
        title: 'Chat & Plan',
        description: 'Message your matches and schedule joint training sessions.'
      },
      {
        number: '04',
        title: 'Train Together',
        description: 'Meet up, work out together, and track your progress as a team.'
      }
    ];

    return (
      <section id="how-it-works" className="py-20 px-4 bg-[var(--accent-color)]" data-name="how-it-works" data-file="components/HowItWorks.js">
        <div className="container mx-auto">
          <h2 className="text-5xl md:text-6xl text-center mb-4 glow-text">HOW IT WORKS</h2>
          <p className="text-center text-[var(--text-secondary)] text-lg mb-16 max-w-2xl mx-auto">
            Get started in four simple steps
          </p>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {steps.map((step, index) => (
              <div key={index} className="text-center">
                <div className="text-6xl font-['Bebas_Neue'] glow-text mb-4">{step.number}</div>
                <h3 className="text-2xl font-bold mb-3">{step.title}</h3>
                <p className="text-[var(--text-secondary)]">{step.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    );
  } catch (error) {
    console.error('HowItWorks component error:', error);
    return null;
  }
}