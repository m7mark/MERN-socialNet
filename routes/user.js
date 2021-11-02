const router = require("express").Router()
const asyncHandler = require("express-async-handler");
const { check } = require("express-validator");
const UsersController = require("../controllers/UsersController")
const { allAndVerifyToken, verifyToken, verifyTokenAndAdmin } = require("../middleware/verifyToken")

const userController = new UsersController()


//api
//auth
router.post('/auth/register',
  [
    check('login', 'Username cannot be empty').notEmpty(),
    check('password', 'Password must be at least 4 symbols').isLength({ min: 4 }),
  ],
  asyncHandler(userController.register))
router.post('/auth/login', asyncHandler(userController.login))
router.delete('/auth/login', asyncHandler(userController.logout))
router.get('/auth/me', verifyToken, asyncHandler(userController.me))
router.get('/auth', verifyTokenAndAdmin, asyncHandler(userController.getUsers))
//get all users
router.get('/users', allAndVerifyToken, asyncHandler(userController.getListOfUsers))

module.exports = router