function Hero() {
  try {
    return (
      <section className="pt-32 pb-20 px-4" data-name="hero" data-file="components/Hero.js">
        <div className="container mx-auto text-center">
          <h1 className="text-6xl md:text-8xl mb-6 glow-text text-shadow-glow">
            TRAIN TOGETHER.<br />ELEVATE TOGETHER.
          </h1>
          
          <p className="text-xl md:text-2xl text-[var(--text-secondary)] mb-8 max-w-3xl mx-auto">
            Connect with training partners, find nearby gyms, book joint sessions, and grow the PodiumX healthy-living community.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-12">
            <a href="platform.html" className="btn-primary text-lg px-8 py-4">
              Get Started Free
            </a>
            <button className="btn-secondary text-lg px-8 py-4">
              Watch Demo
            </button>
          </div>

          <div className="grid grid-cols-3 gap-8 max-w-2xl mx-auto mt-16">
            <div>
              <div className="text-4xl font-bold glow-text mb-2">10K+</div>
              <div className="text-[var(--text-secondary)]">Active Users</div>
            </div>
            <div>
              <div className="text-4xl font-bold glow-text mb-2">50K+</div>
              <div className="text-[var(--text-secondary)]">Matches Made</div>
            </div>
            <div>
              <div className="text-4xl font-bold glow-text mb-2">500+</div>
              <div className="text-[var(--text-secondary)]">Locations</div>
            </div>
          </div>
        </div>
      </section>
    );
  } catch (error) {
    console.error('Hero component error:', error);
    return null;
  }
}