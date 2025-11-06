class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false, error: null };
  }

  static getDerivedStateFromError(error) {
    return { hasError: true, error };
  }

  componentDidCatch(error, errorInfo) {
    console.error('ErrorBoundary caught an error:', error, errorInfo.componentStack);
  }

  render() {
    if (this.state.hasError) {
      return (
        <div className="min-h-screen flex items-center justify-center bg-[var(--secondary-color)]">
          <div className="text-center">
            <h1 className="text-2xl font-bold mb-4">Something went wrong</h1>
            <button onClick={() => window.location.reload()} className="btn-primary">Reload</button>
          </div>
        </div>
      );
    }
    return this.props.children;
  }
}

function PlatformApp() {
  try {
    const [isAuthenticated, setIsAuthenticated] = React.useState(false);
    const [showSignUp, setShowSignUp] = React.useState(false);

    const handleLogin = (e) => {
      e.preventDefault();
      setIsAuthenticated(true);
    };

    const handleSignUp = (e) => {
      e.preventDefault();
      setIsAuthenticated(true);
    };

    if (isAuthenticated) {
      window.location.href = 'dashboard.html';
      return null;
    }

    return (
      <div className="min-h-screen flex items-center justify-center p-4" data-name="platform-app">
        <div className="max-w-md w-full">
          <div className="text-center mb-8">
            <div className="flex items-center justify-center space-x-2 mb-4">
              <div className="w-12 h-12 bg-[var(--primary-color)] rounded-lg flex items-center justify-center">
                <div className="icon-zap text-3xl text-black"></div>
              </div>
              <span className="text-3xl font-['Bebas_Neue'] glow-text">PODIUMX</span>
            </div>
            <h1 className="text-3xl font-bold mb-2">{showSignUp ? 'Create Account' : 'Welcome Back'}</h1>
            <p className="text-[var(--text-secondary)]">
              {showSignUp ? 'Join the PodiumX community' : 'Sign in to continue'}
            </p>
          </div>

          <div className="card-dark">
            <form onSubmit={showSignUp ? handleSignUp : handleLogin}>
              {showSignUp && (
                <div className="mb-4">
                  <label className="block text-sm font-medium mb-2">Full Name</label>
                  <input type="text" required className="w-full bg-[var(--secondary-color)] border border-gray-700 rounded-lg px-4 py-3 focus:border-[var(--primary-color)] outline-none" />
                </div>
              )}
              
              <div className="mb-4">
                <label className="block text-sm font-medium mb-2">Email</label>
                <input type="email" required className="w-full bg-[var(--secondary-color)] border border-gray-700 rounded-lg px-4 py-3 focus:border-[var(--primary-color)] outline-none" />
              </div>

              <div className="mb-6">
                <label className="block text-sm font-medium mb-2">Password</label>
                <input type="password" required className="w-full bg-[var(--secondary-color)] border border-gray-700 rounded-lg px-4 py-3 focus:border-[var(--primary-color)] outline-none" />
              </div>

              <button type="submit" className="btn-primary w-full mb-4">
                {showSignUp ? 'Create Account' : 'Sign In'}
              </button>

              <div className="text-center">
                <button type="button" onClick={() => setShowSignUp(!showSignUp)} className="text-[var(--text-secondary)] hover:text-[var(--primary-color)]">
                  {showSignUp ? 'Already have an account? Sign in' : "Don't have an account? Sign up"}
                </button>
              </div>
            </form>

            <div className="mt-6 pt-6 border-t border-gray-700">
              <div className="text-center text-[var(--text-secondary)] text-sm mb-4">Or continue with</div>
              <div className="grid grid-cols-2 gap-4">
                <button className="bg-[var(--secondary-color)] border border-gray-700 rounded-lg px-4 py-3 hover:border-[var(--primary-color)] transition-colors flex items-center justify-center">
                  <div className="icon-mail text-xl mr-2"></div>
                  Google
                </button>
                <button className="bg-[var(--secondary-color)] border border-gray-700 rounded-lg px-4 py-3 hover:border-[var(--primary-color)] transition-colors flex items-center justify-center">
                  <div className="icon-smartphone text-xl mr-2"></div>
                  Apple
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  } catch (error) {
    console.error('PlatformApp component error:', error);
    return null;
  }
}

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <ErrorBoundary>
    <PlatformApp />
  </ErrorBoundary>
);
