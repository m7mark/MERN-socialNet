import Router from 'express';
import asyncHandler from 'express-async-handler';
// import { check } from 'express-validator';
import ProfileController from '../controllers/ProfileController.js';
import { verifyToken, verifyTokenAndAdmin } from '../middleware/verifyToken.js';

const router = new Router()

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

export default router