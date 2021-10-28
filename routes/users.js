import Router from 'express';
import UserController from '../controllers/UserController.js';
const router = new Router()

router.post('/', UserController.createUser)
router.get('/', UserController.getAllUsers)
router.get('/:id', UserController.getOneUser)
router.put('/', UserController.updateUser)

export default router