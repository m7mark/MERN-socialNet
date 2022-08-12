import express from 'express'
import asyncHandler from 'express-async-handler'
import ProfileController from '../controllers/ProfileController'
import { verifyToken } from '../middleware/verifyToken'
import multer from 'multer'
import { body } from 'express-validator'
import { getStorageMulter } from '../config/multer.config'

const router = express.Router()
const upload = multer({ storage: getStorageMulter() })

//api
//profile
router.get('/profile/:userId', asyncHandler(ProfileController.getProfile))
router.put(
  '/profile/',
  [
    body('aboutMe', 'Max length is 150').optional().isLength({ max: 150 }),
    body('fullName', 'Max length is 100').optional().isLength({ max: 100 }),
    body('lookingForAJobDescription', 'Max length is 150')
      .optional()
      .isLength({ max: 150 }),
    body('lookingForAJob', 'Must be boolean').optional().isBoolean(),
    body('contacts.*', 'Incorrect url').optional({ nullable: true }).isURL(),
  ],
  verifyToken,
  asyncHandler(ProfileController.updateProfile)
)
//status
router.get('/profile/status/:userId', asyncHandler(ProfileController.getStatus))
router.put(
  '/profile/status/',
  [body('status', 'Max length is 150').isLength({ max: 150 })],
  verifyToken,
  asyncHandler(ProfileController.updateStatus)
)
//follow
router.post(
  '/follow/:userId',
  verifyToken,
  asyncHandler(ProfileController.followUser)
)
router.delete(
  '/follow/:userId',
  verifyToken,
  asyncHandler(ProfileController.unfollowUser)
)
router.get(
  '/follow/:userId',
  verifyToken,
  asyncHandler(ProfileController.isFollowed)
)
//post photo
router.put(
  '/profile/photo',
  upload.single('image'),
  verifyToken,
  asyncHandler(ProfileController.uploadUserPhoto)
)

export default router
