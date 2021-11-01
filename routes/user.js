import Router from 'express';
import asyncHandler from 'express-async-handler';
import { check } from 'express-validator';
import UserController from '../controllers/UserController.js';
import { allAndVerifyToken, verifyToken, verifyTokenAndAdmin } from '../middleware/verifyToken.js';

const router = new Router()

//api
//auth
router.post('/auth/register',
  [
    check('login', 'Username cannot be empty').notEmpty(),
    check('password', 'Password must be at least 4 symbols').isLength({ min: 4 }),
  ],
  asyncHandler(UserController.register))
router.post('/auth/login', asyncHandler(UserController.login))
router.delete('/auth/login', asyncHandler(UserController.logout))
router.get('/auth/me', verifyToken, asyncHandler(UserController.me))
router.get('/auth', verifyTokenAndAdmin, asyncHandler(UserController.getUsers))
//get all users
router.get('/users', allAndVerifyToken, asyncHandler(UserController.getListOfUsers))

export default router