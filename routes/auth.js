import Router from 'express';
import AuthController from '../controllers/AuthController.js';
const router = new Router()

//REGISTER
router.post('/register', AuthController.register)
router.post('/login', AuthController.login)

export default router