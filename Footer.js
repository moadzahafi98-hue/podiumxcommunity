function Footer() {
  try {
    return (
      <footer className="bg-[var(--accent-color)] border-t border-gray-800 py-12 px-4" data-name="footer" data-file="components/Footer.js">
        <div className="container mx-auto">
          <div className="grid md:grid-cols-4 gap-8 mb-8">
            <div>
              <div className="flex items-center space-x-2 mb-4">
                <div className="w-10 h-10 bg-[var(--primary-color)] rounded-lg flex items-center justify-center">
                  <div className="icon-zap text-2xl text-black"></div>
                </div>
                <span className="text-2xl font-['Bebas_Neue'] glow-text">PODIUMX</span>
              </div>
              <p className="text-[var(--text-secondary)] text-sm">
                Train Together. Elevate Together.
              </p>
            </div>

            <div>
              <h4 className="font-bold mb-4">Platform</h4>
              <ul className="space-y-2 text-[var(--text-secondary)] text-sm">
                <li><a href="platform.html" className="hover:text-[var(--primary-color)]">Launch App</a></li>
                <li><a href="#features" className="hover:text-[var(--primary-color)]">Features</a></li>
                <li><a href="#membership" className="hover:text-[var(--primary-color)]">Pricing</a></li>
              </ul>
            </div>

            <div>
              <h4 className="font-bold mb-4">Community</h4>
              <ul className="space-y-2 text-[var(--text-secondary)] text-sm">
                <li><a href="#" className="hover:text-[var(--primary-color)]">Events</a></li>
                <li><a href="#" className="hover:text-[var(--primary-color)]">Blog</a></li>
                <li><a href="#" className="hover:text-[var(--primary-color)]">Success Stories</a></li>
              </ul>
            </div>

            <div>
              <h4 className="font-bold mb-4">Connect</h4>
              <div className="flex space-x-4">
                <a href="#" className="w-10 h-10 rounded-lg bg-[var(--secondary-color)] flex items-center justify-center hover:bg-[var(--primary-color)] transition-colors">
                  <div className="icon-twitter text-xl text-white hover:text-black"></div>
                </a>
                <a href="#" className="w-10 h-10 rounded-lg bg-[var(--secondary-color)] flex items-center justify-center hover:bg-[var(--primary-color)] transition-colors">
                  <div className="icon-instagram text-xl text-white hover:text-black"></div>
                </a>
                <a href="#" className="w-10 h-10 rounded-lg bg-[var(--secondary-color)] flex items-center justify-center hover:bg-[var(--primary-color)] transition-colors">
                  <div className="icon-facebook text-xl text-white hover:text-black"></div>
                </a>
              </div>
            </div>
          </div>

          <div className="border-t border-gray-800 pt-8 text-center text-[var(--text-secondary)] text-sm">
            <p>&copy; 2025 PodiumX Community. All rights reserved.</p>
          </div>
        </div>
      </footer>
    );
  } catch (error) {
    console.error('Footer component error:', error);
    return null;
  }
}