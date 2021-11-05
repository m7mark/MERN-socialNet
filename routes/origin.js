const router = require("express").Router()
const asyncHandler = require("express-async-handler");
const { check } = require("express-validator");
const OriginController = require("../controllers/OriginController")
const { verifyTokenAndAdmin, verifyToken } = require("../middleware/verifyToken")

const originController = new OriginController()
//api
router.put('/origins', verifyToken,
  [
    check('origin', 'Origin must be URL').notEmpty().isURL(),
  ],
  asyncHandler(originController.addOrigin))
router.get('/origins', verifyTokenAndAdmin, asyncHandler(originController.getOriginsList))
router.delete('/origins', verifyTokenAndAdmin, asyncHandler(originController.delLastOrigin))

module.exports = router