import { useState } from 'react'
import { triggerPasswordReset } from '../features/auth/authSlice'

const ForgotPasswordPage = () => {
  const [email, setEmail] = useState('')
  const [status, setStatus] = useState('idle')
  const [message, setMessage] = useState(null)

  const handleSubmit = async (e) => {
    e.preventDefault()
    setStatus('loading')
    try {
      await triggerPasswordReset(email)
      setMessage('Password reset email sent. Please check your inbox.')
      setStatus('succeeded')
    } catch (error) {
      setMessage(error.message || 'Failed to send reset email')
      setStatus('failed')
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-background">
      <div className="bg-surface/90 p-8 rounded-3xl shadow-neon max-w-md w-full">
        <h1 className="text-3xl font-bold mb-6 text-center">Reset your password</h1>
        <form className="space-y-4" onSubmit={handleSubmit}>
          <div>
            <label className="block text-sm mb-1">Email</label>
            <input
              type="email"
              className="w-full px-4 py-2 rounded-lg text-black"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>
          {message && <p className="text-sm text-electric">{message}</p>}
          <button type="submit" className="w-full" disabled={status === 'loading'}>
            {status === 'loading' ? 'Sending...' : 'Send reset link'}
          </button>
        </form>
      </div>
    </div>
  )
}

export default ForgotPasswordPage
