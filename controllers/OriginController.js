const Origin = require('../models/Origin');
const createError = require('http-errors');
const { validationResult } = require('express-validator');


class OriginController {
  //GET ORIGINS LIST
  async getOriginsList(req, res) {
    try {
      const { origins } = await Origin.findById('618451383cb0c829dad4fa54')
      res.json(origins);
    } catch (e) {
      throw createError(500, 'Get origins error')
    }
  }
  //ADD HOST TO ORIGINS
  async addOrigin(req, res, next) {
    try {
      //validation errors
      const err = validationResult(req)
      if (!err.isEmpty()) { return next(createError(500, `${err.errors[0].msg}`)) }

      const { origins } = await Origin.findById('618451383cb0c829dad4fa54')
      const origin = req.body.origin
      if (origins.includes(origin)) { return next(createError(500, 'Hosting already exist')) }
      await Origin.findByIdAndUpdate('618451383cb0c829dad4fa54', { $push: { origins: origin } })
      res.json({ resultCode: 0, messages: [], data: {} })
    } catch (e) {
      throw createError(500, 'Update origin error')
    }
  }
  //DELETE LAST ELEMENT
  async delLastOrigin(req, res, next) {
    try {
      const { origins } = await Origin.findById('618451383cb0c829dad4fa54')
      const lastElem = origins.pop()
      console.log(lastElem);
      await Origin.findByIdAndUpdate('618451383cb0c829dad4fa54', { $pull: { 'origins': { $in: lastElem } } })
      res.json({ resultCode: 0, messages: [], data: {} })
    } catch (e) {
      throw createError(500, 'Delete origin error')
    }
  }
}

module.exports = OriginController
