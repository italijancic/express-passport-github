import { Router } from 'express'
import userRoutes from './users.routes.js'
import authRoutes from './auth.routes.js'
import passportLocalRouutes from './passportLocal.routes.js'
import githubRoutes from './github.routes.js'

const router = Router()

router.use('/api/users', userRoutes)

router.use('/api/auth', authRoutes)

router.use('/api/passportLocal', passportLocalRouutes)

router.use('/api/github', githubRoutes)

export default router