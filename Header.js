function Header() {
  try {
    const [mobileMenuOpen, setMobileMenuOpen] = React.useState(false);

    const scrollToSection = (sectionId) => {
      const element = document.getElementById(sectionId);
      if (element) {
        element.scrollIntoView({ behavior: 'smooth' });
      }
      setMobileMenuOpen(false);
    };

    return (
      <header className="fixed top-0 left-0 right-0 z-50 bg-[var(--secondary-color)] border-b border-gray-800" data-name="header" data-file="components/Header.js">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <div className="w-10 h-10 bg-[var(--primary-color)] rounded-lg flex items-center justify-center">
                <div className="icon-zap text-2xl text-black"></div>
              </div>
              <span className="text-2xl font-['Bebas_Neue'] glow-text">PODIUMX</span>
            </div>

            <nav className="hidden md:flex items-center space-x-8">
              <a onClick={() => scrollToSection('features')} className="nav-link">Features</a>
              <a onClick={() => scrollToSection('how-it-works')} className="nav-link">How It Works</a>
              <a onClick={() => scrollToSection('membership')} className="nav-link">Membership</a>
              <a href="platform.html" className="btn-primary">Launch Platform</a>
            </nav>

            <button onClick={() => setMobileMenuOpen(!mobileMenuOpen)} className="md:hidden text-[var(--text-primary)]">
              <div className={`icon-${mobileMenuOpen ? 'x' : 'menu'} text-2xl`}></div>
            </button>
          </div>

          {mobileMenuOpen && (
            <nav className="md:hidden mt-4 pb-4 space-y-4">
              <a onClick={() => scrollToSection('features')} className="block nav-link">Features</a>
              <a onClick={() => scrollToSection('how-it-works')} className="block nav-link">How It Works</a>
              <a onClick={() => scrollToSection('membership')} className="block nav-link">Membership</a>
              <a href="platform.html" className="block btn-primary text-center">Launch Platform</a>
            </nav>
          )}
        </div>
      </header>
    );
  } catch (error) {
    console.error('Header component error:', error);
    return null;
  }
}