import 'dotenv/config'
import express from 'express'
import cors from 'cors'
import helmet from 'helmet'
import morgan from 'morgan'
import rateLimit from 'express-rate-limit'
import { createServer } from 'http'
import { Server as SocketIOServer } from 'socket.io'
import authRoutes from './routes/authRoutes.js'
import userRoutes from './routes/userRoutes.js'
import matchRoutes from './routes/matchRoutes.js'
import chatRoutes from './routes/chatRoutes.js'
import eventRoutes from './routes/eventRoutes.js'
import paymentRoutes from './routes/paymentRoutes.js'
import leaderboardRoutes from './routes/leaderboardRoutes.js'
import adminRoutes from './routes/adminRoutes.js'
import feedRoutes from './routes/feedRoutes.js'
import { authMiddleware } from './middleware/authMiddleware.js'
import { initializeFirebase } from './utils/firebaseAdmin.js'
import { registerSocketHandlers } from './utils/socket.js'
import { handleStripeWebhook } from './controllers/paymentController.js'

initializeFirebase()

const app = express()
const httpServer = createServer(app)
const io = new SocketIOServer(httpServer, {
  cors: {
    origin: process.env.CORS_ORIGIN?.split(',') || '*'
  }
})

registerSocketHandlers(io)

app.use('/api/payments/webhook', express.raw({ type: 'application/json' }))

app.use(helmet())
app.use(cors({ origin: process.env.CORS_ORIGIN?.split(',') || '*', credentials: true }))
app.use(express.json({ limit: '2mb' }))
app.use(express.urlencoded({ extended: true }))
app.use(morgan('dev'))

const limiter = rateLimit({
  windowMs: 60 * 60 * 1000,
  max: 100
})
app.use(limiter)

app.get('/health', (req, res) => {
  res.json({ status: 'ok', timestamp: new Date().toISOString() })
})

app.post('/api/payments/webhook', handleStripeWebhook)

app.use('/api/auth', authRoutes)
app.use('/api/users', authMiddleware, userRoutes)
app.use('/api/match', authMiddleware, matchRoutes)
app.use('/api/chat', authMiddleware, chatRoutes)
app.use('/api/events', authMiddleware, eventRoutes)
app.use('/api/payments', authMiddleware, paymentRoutes)
app.use('/api/leaderboard', authMiddleware, leaderboardRoutes)
app.use('/api/admin', authMiddleware, adminRoutes)
app.use('/api/feed', authMiddleware, feedRoutes)

app.use((err, req, res, next) => {
  console.error(err)
  res.status(err.status || 500).json({ message: err.message || 'Internal server error' })
})

const port = process.env.PORT || 8080

httpServer.listen(port, () => {
  console.log(`PodiumX backend running on port ${port}`)
})
