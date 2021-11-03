const router = require("express").Router()
const asyncHandler = require("express-async-handler");
const ProfileController = require("../controllers/ProfileController")
const { verifyToken } = require("../middleware/verifyToken")
const multer = require("multer");
const path = require('path')
// const storage = multer.memoryStorage()

const storage = multer.diskStorage({
  destination: path.resolve("uploads"),
  filename: function (req, file, callback) {
    callback(null, 'temp-' + file.originalname)
  }
})
const upload = multer({ storage: storage })
const profileController = new ProfileController()

//api
//profile
router.get('/profile/:userId', asyncHandler(profileController.getProfile))
router.put('/profile/', verifyToken, asyncHandler(profileController.updateProfile))
router.get('/profile/status/:userId', asyncHandler(profileController.getStatus))
router.put('/profile/status/', verifyToken, asyncHandler(profileController.updateStatus))
//follow
router.post('/follow/:userId', verifyToken, asyncHandler(profileController.followUser))
router.delete('/follow/:userId', verifyToken, asyncHandler(profileController.unfollowUser))
router.get('/follow/:userId', verifyToken, asyncHandler(profileController.isFollowed))
//post photo
router.put('/profile/photo', upload.single('image'), verifyToken, asyncHandler(profileController.putUserPhoto))

module.exports = router