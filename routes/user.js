const router = require("express").Router()
const asyncHandler = require("express-async-handler");
const { check } = require("express-validator");
const UserController = require("../controllers/UserController")
const { allAndVerifyToken, verifyToken, verifyTokenAndAdmin } = require("../middleware/verifyToken")

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

module.exports = router