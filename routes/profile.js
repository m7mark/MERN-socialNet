const router = require("express").Router()
const asyncHandler = require("express-async-handler");
const profileController = require("../controllers/ProfileController")
const { verifyToken } = require("../middleware/verifyToken")
const multer = require("multer");
const storage = multer.memoryStorage()
const upload = multer({ storage: storage })

const ProfileController = new profileController()

//api
//profile
router.get('/profile/:userId', asyncHandler(ProfileController.getProfile))
router.put('/profile/', verifyToken, asyncHandler(ProfileController.updateProfile))
router.get('/profile/status/:userId', asyncHandler(ProfileController.getStatus))
router.put('/profile/status/', verifyToken, asyncHandler(ProfileController.updateStatus))
//follow
router.post('/follow/:userId', verifyToken, asyncHandler(ProfileController.followUser))
router.delete('/follow/:userId', verifyToken, asyncHandler(ProfileController.unfollowUser))
router.get('/follow/:userId', verifyToken, asyncHandler(ProfileController.isFollowed))
//post photo
router.put('/profile/photo',upload.single('image'), verifyToken, asyncHandler(ProfileController.putUserPhoto))

module.exports = router