import { Router } from 'express'
import * as usersControllers from '../controllers/users.controller.js'
import {auth} from '../middlewares/auth.middleware.js'

const router = Router()

// Create user
router.post('/', usersControllers.createUser)

// Update user
router.put('/updateUser/:email', usersControllers.updateUser)

// Update password
router.put('/updatePassword/:email', usersControllers.updatePassword)

// Get user
router.get('/', auth, usersControllers.getUser)

export default router