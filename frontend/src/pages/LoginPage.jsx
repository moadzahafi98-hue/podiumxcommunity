import { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link, useNavigate } from 'react-router-dom'
import { loginUser, googleSignIn, appleSignIn, setUser } from '../features/auth/authSlice'
import { connectSocket } from '../utils/socket'
import { authApi } from '../utils/api'

const LoginPage = () => {
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const { status, error } = useSelector((state) => state.auth)
  const [form, setForm] = useState({ email: '', password: '' })

  const handleSubmit = async (e) => {
    e.preventDefault()
    const resultAction = await dispatch(loginUser(form))
    if (loginUser.fulfilled.match(resultAction)) {
      connectSocket(resultAction.payload.token)
      navigate('/')
    }
  }

  const handleProviderLogin = async (providerFn) => {
    try {
      const credential = await providerFn()
      const providerToken = await credential.user.getIdToken()
      const { data } = await authApi.post('/social', { providerToken })
      dispatch(setUser(data))
      connectSocket(data.token)
      navigate('/')
    } catch (err) {
      console.error(err)
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-background">
      <div className="bg-surface/90 p-8 rounded-3xl shadow-neon max-w-md w-full">
        <h1 className="text-3xl font-bold mb-6 text-center">Welcome back to PodiumX</h1>
        <form className="space-y-4" onSubmit={handleSubmit}>
          <div>
            <label className="block text-sm mb-1">Email</label>
            <input
              type="email"
              className="w-full px-4 py-2 rounded-lg text-black"
              value={form.email}
              onChange={(e) => setForm({ ...form, email: e.target.value })}
              required
            />
          </div>
          <div>
            <label className="block text-sm mb-1">Password</label>
            <input
              type="password"
              className="w-full px-4 py-2 rounded-lg text-black"
              value={form.password}
              onChange={(e) => setForm({ ...form, password: e.target.value })}
              required
            />
          </div>
          {error && <p className="text-red-400 text-sm">{error}</p>}
          <button type="submit" className="w-full" disabled={status === 'loading'}>
            {status === 'loading' ? 'Signing in...' : 'Sign In'}
          </button>
        </form>
        <div className="mt-4 flex flex-col space-y-2">
          <button className="w-full" onClick={() => handleProviderLogin(googleSignIn)}>
            Continue with Google
          </button>
          <button className="w-full" onClick={() => handleProviderLogin(appleSignIn)}>
            Continue with Apple
          </button>
        </div>
        <div className="mt-4 text-center text-sm">
          <Link to="/forgot-password">Forgot password?</Link>
        </div>
        <div className="mt-6 text-center text-sm">
          New to PodiumX? <Link to="/signup">Create an account</Link>
        </div>
      </div>
    </div>
  )
}

export default LoginPage
