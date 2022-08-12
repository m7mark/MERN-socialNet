import express from 'express'
import asyncHandler from 'express-async-handler'
import { body } from 'express-validator'
import UsersController from '../controllers/UsersController'
import {
  allAndVerifyToken,
  verifyToken,
  verifyTokenAndAdmin,
} from '../middleware/verifyToken'

const router = express.Router()

//api
//auth
router.post(
  '/auth/register',
  [
    body('login', 'Username cannot be empty, max 50 symbols')
      .notEmpty()
      .isLength({ max: 50 }),
    body('email', 'Incorrect e-mail').isEmail(),
    body('password', 'Password must be at least 4 symbols').isLength({
      min: 4,
    }),
  ],
  asyncHandler(UsersController.register)
)
router.post(
  '/auth/login',
  [
    body('email', 'Incorrect e-mail').isEmail(),
    body('password', 'Password must be at least 4 symbols').isLength({
      min: 4,
    }),
  ],
  asyncHandler(UsersController.login)
)
router.delete('/auth/login', asyncHandler(UsersController.logout))
router.get('/auth/me', verifyToken, asyncHandler(UsersController.me))
router.get('/auth', verifyTokenAndAdmin, asyncHandler(UsersController.getUsers))
//get all users
router.get(
  '/users',
  allAndVerifyToken,
  asyncHandler(UsersController.getListOfUsers)
)
router.delete(
  '/user/:userId',
  verifyTokenAndAdmin,
  asyncHandler(UsersController.deleteUser)
)

export default router
