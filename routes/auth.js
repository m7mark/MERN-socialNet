import Router from 'express';
import asyncHandler from 'express-async-handler';
import { check } from 'express-validator';
import AuthController from '../controllers/AuthController.js';
import { verifyToken, verifyTokenAndAdmin } from '../middleware/verifyToken.js';

const router = new Router()

//api/auth
router.post('/register',
  [
    check('login', 'Username cannot be empty').notEmpty(),
    check('password', 'Password must be at least 4 symbols').isLength({ min: 4 }),
  ],
  asyncHandler(AuthController.register))
router.post('/login', asyncHandler(AuthController.login))
router.delete('/login', asyncHandler(AuthController.logout))
router.get('/me', verifyToken, asyncHandler(AuthController.me))
router.get('/', verifyTokenAndAdmin, asyncHandler(AuthController.getUsers))

export default router