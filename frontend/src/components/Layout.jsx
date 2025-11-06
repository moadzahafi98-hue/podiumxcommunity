import { Outlet, NavLink, useNavigate } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { logoutUser } from '../features/auth/authSlice'
import { disconnectSocket } from '../utils/socket'

const navItems = [
  { to: '/', label: 'Home' },
  { to: '/discover', label: 'Discover' },
  { to: '/matches', label: 'Matches' },
  { to: '/messages', label: 'Messages' },
  { to: '/events', label: 'Events' },
  { to: '/feed', label: 'Community' },
  { to: '/profile', label: 'Profile' },
  { to: '/admin', label: 'Admin' }
]

const Layout = () => {
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const { user } = useSelector((state) => state.auth)

  const handleLogout = async () => {
    disconnectSocket()
    await dispatch(logoutUser())
    navigate('/login')
  }

  return (
    <div className="min-h-screen flex bg-background text-white">
      <aside className="w-64 bg-surface/80 backdrop-blur border-r border-electric/40 hidden md:flex flex-col p-6 space-y-4">
        <div className="text-2xl font-bold tracking-wider">PodiumX</div>
        <nav className="flex-1 space-y-2">
          {navItems.map((item) => (
            <NavLink
              key={item.to}
              to={item.to}
              end={item.to === '/'}
              className={({ isActive }) =>
                `block px-4 py-2 rounded-lg transition ${isActive ? 'bg-electric text-black font-semibold' : 'hover:bg-surface'}`
              }
            >
              {item.label}
            </NavLink>
          ))}
        </nav>
        <div className="mt-auto space-y-2">
          <div className="text-sm text-electric/80">{user?.email}</div>
          <button onClick={handleLogout}>Logout</button>
        </div>
      </aside>
      <main className="flex-1 p-4 md:p-8 pb-20 md:pb-8">
        <Outlet />
      </main>
      <nav className="fixed bottom-0 left-0 right-0 md:hidden bg-surface/90 border-t border-electric/30 grid grid-cols-4 gap-1 p-2 text-xs">
        {navItems.slice(0, 4).map((item) => (
          <NavLink
            key={item.to}
            to={item.to}
            end={item.to === '/'}
            className={({ isActive }) =>
              `text-center py-2 rounded-lg ${isActive ? 'bg-electric text-black font-semibold' : 'bg-background/60'}`
            }
          >
            {item.label}
          </NavLink>
        ))}
      </nav>
    </div>
  )
}

export default Layout
