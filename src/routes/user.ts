import express from "express"
import asyncHandler from "express-async-handler"
import { body } from "express-validator"
import { UsersController } from "../controllers/UsersController"
import { allAndVerifyToken, verifyToken, verifyTokenAndAdmin } from "../middleware/verifyToken"

const router = express.Router()
const userController = new UsersController()

//api
//auth
router.post('/auth/register',
  [
    body('login', 'Username cannot be empty, max 50 symbols').notEmpty().isLength({ max: 50 }),
    body('email', 'Incorrect e-mail').isEmail(),
    body('password', 'Password must be at least 4 symbols').isLength({ min: 4 }),
  ],
  asyncHandler(userController.register))
router.post('/auth/login',
  [
    body('email', 'Incorrect e-mail').isEmail(),
    body('password', 'Password must be at least 4 symbols').isLength({ min: 4 }),
  ],
  asyncHandler(userController.login))
router.delete('/auth/login', asyncHandler(userController.logout))
router.get('/auth/me', verifyToken, asyncHandler(userController.me))
router.get('/auth', verifyTokenAndAdmin, asyncHandler(userController.getUsers))
//get all users
router.get('/users', allAndVerifyToken, asyncHandler(userController.getListOfUsers))

export default router