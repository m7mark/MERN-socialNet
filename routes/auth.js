import Router from 'express';
import asyncHandler from 'express-async-handler';
import { check } from 'express-validator';
import AuthController from '../controllers/AuthController.js';
const router = new Router()


router.post('/register',
  [
    check('login', 'Username cannot be empty').notEmpty(),
    check('password', 'Password must be at least 4 symbols').isLength({ min: 4 }),
  ],
  asyncHandler(AuthController.register))
router.post('/login', asyncHandler(AuthController.login))
router.get('/me', asyncHandler(AuthController.me))

export default router