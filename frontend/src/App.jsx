import { useEffect } from 'react'
import { Routes, Route, Navigate } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { initializeAuthListener } from './features/auth/authSlice'
import Layout from './components/Layout'
import LoginPage from './pages/LoginPage'
import SignupPage from './pages/SignupPage'
import ForgotPasswordPage from './pages/ForgotPasswordPage'
import OnboardingPage from './pages/OnboardingPage'
import DashboardPage from './pages/DashboardPage'
import DiscoverPage from './pages/DiscoverPage'
import MatchesPage from './pages/MatchesPage'
import MessagesPage from './pages/MessagesPage'
import EventsPage from './pages/EventsPage'
import ProfilePage from './pages/ProfilePage'
import FeedPage from './pages/FeedPage'
import AdminPage from './pages/AdminPage'

const PrivateRoute = ({ children }) => {
  const { user } = useSelector((state) => state.auth)
  if (!user) {
    return <Navigate to="/login" replace />
  }
  return children
}

const App = () => {
  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(initializeAuthListener())
  }, [dispatch])

  return (
    <Routes>
      <Route path="/login" element={<LoginPage />} />
      <Route path="/signup" element={<SignupPage />} />
      <Route path="/forgot-password" element={<ForgotPasswordPage />} />
      <Route
        path="/onboarding"
        element={(
          <PrivateRoute>
            <OnboardingPage />
          </PrivateRoute>
        )}
      />
      <Route
        path="/"
        element={(
          <PrivateRoute>
            <Layout />
          </PrivateRoute>
        )}
      >
        <Route index element={<DashboardPage />} />
        <Route path="discover" element={<DiscoverPage />} />
        <Route path="matches" element={<MatchesPage />} />
        <Route path="messages" element={<MessagesPage />} />
        <Route path="events" element={<EventsPage />} />
        <Route path="profile" element={<ProfilePage />} />
        <Route path="feed" element={<FeedPage />} />
        <Route path="admin" element={<AdminPage />} />
      </Route>
    </Routes>
  )
}

export default App
