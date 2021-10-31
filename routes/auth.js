import Router from 'express';
import asyncHandler from 'express-async-handler';
import { check } from 'express-validator';
import UserController from '../controllers/UserController.js';
import { verifyToken, verifyTokenAndAdmin } from '../middleware/verifyToken.js';

const router = new Router()

//api/auth
router.post('/register',
  [
    check('login', 'Username cannot be empty').notEmpty(),
    check('password', 'Password must be at least 4 symbols').isLength({ min: 4 }),
  ],
  asyncHandler(UserController.register))
router.post('/login', asyncHandler(UserController.login))
router.delete('/login', asyncHandler(UserController.logout))
router.get('/me', verifyToken, asyncHandler(UserController.me))
router.get('/', verifyTokenAndAdmin, asyncHandler(UserController.getUsers))

export default router