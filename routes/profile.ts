import express from "express"
import asyncHandler from "express-async-handler"
import { ProfileController } from "../controllers/ProfileController"
import { verifyToken } from "../middleware/verifyToken"
import multer from "multer"
import path from 'path'
import { body } from "express-validator"

const router = express.Router()
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
router.put('/profile/',
  [
    body('aboutMe', 'Max length is 150').optional().isLength({ max: 150 }),
    body('fullName', 'Max length is 100').optional().isLength({ max: 100 }),
    body('lookingForAJobDescription', 'Max length is 150').optional().isLength({ max: 150 }),
    body('lookingForAJob', 'Must be boolean').optional().isBoolean(),
    body('contacts.*', 'Incorrect url').optional({nullable:true}).isURL(),
  ],
  verifyToken, asyncHandler(profileController.updateProfile))
//status
router.get('/profile/status/:userId', asyncHandler(profileController.getStatus))
router.put('/profile/status/',
  [
    body('status', 'Max length is 150').isLength({ max: 150 })
  ],
  verifyToken, asyncHandler(profileController.updateStatus))
//follow
router.post('/follow/:userId', verifyToken, asyncHandler(profileController.followUser))
router.delete('/follow/:userId', verifyToken, asyncHandler(profileController.unfollowUser))
router.get('/follow/:userId', verifyToken, asyncHandler(profileController.isFollowed))
//post photo
router.put('/profile/photo', upload.single('image'), verifyToken, asyncHandler(profileController.putUserPhoto))

export default router