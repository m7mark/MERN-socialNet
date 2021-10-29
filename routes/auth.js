import Router from 'express';
import asyncHandler from 'express-async-handler';
import AuthController from '../controllers/AuthController.js';
const router = new Router()

router.post('/register', asyncHandler(AuthController.register))
router.post('/login', asyncHandler(AuthController.login))

export default router