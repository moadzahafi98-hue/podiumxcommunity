function DashboardNav({ activeView, setActiveView }) {
  try {
    const [mobileMenuOpen, setMobileMenuOpen] = React.useState(false);

    const menuItems = [
      { id: 'home', icon: 'home', label: 'Home' },
      { id: 'discover', icon: 'compass', label: 'Discover' },
      { id: 'matches', icon: 'heart-handshake', label: 'Matches' },
      { id: 'messages', icon: 'messages-square', label: 'Messages' },
      { id: 'sessions', icon: 'calendar-check', label: 'Sessions' },
      { id: 'profile', icon: 'user', label: 'Profile' }
    ];

    return (
      <>
        <nav className="fixed top-0 left-0 right-0 lg:left-0 lg:w-64 lg:h-screen bg-[var(--accent-color)] border-b lg:border-r border-gray-800 z-50">
          <div className="p-4 flex items-center justify-between lg:block">
            <div className="flex items-center space-x-2 mb-0 lg:mb-8">
              <div className="w-10 h-10 bg-[var(--primary-color)] rounded-lg flex items-center justify-center">
                <div className="icon-zap text-2xl text-black"></div>
              </div>
              <span className="text-2xl font-['Bebas_Neue'] glow-text">PODIUMX</span>
            </div>

            <button onClick={() => setMobileMenuOpen(!mobileMenuOpen)} className="lg:hidden">
              <div className={`icon-${mobileMenuOpen ? 'x' : 'menu'} text-2xl`}></div>
            </button>
          </div>

          <div className={`${mobileMenuOpen ? 'block' : 'hidden'} lg:block px-4 pb-4 lg:pb-0`}>
            {menuItems.map(item => (
              <button key={item.id} onClick={() => { setActiveView(item.id); setMobileMenuOpen(false); }}
                className={`w-full flex items-center space-x-3 px-4 py-3 rounded-lg mb-2 transition-colors ${
                  activeView === item.id ? 'bg-[var(--primary-color)] text-black' : 'hover:bg-gray-800'
                }`}>
                <div className={`icon-${item.icon} text-xl`}></div>
                <span className="font-medium">{item.label}</span>
              </button>
            ))}
          </div>
        </nav>
      </>
    );
  } catch (error) {
    console.error('DashboardNav component error:', error);
    return null;
  }
}