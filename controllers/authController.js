import createError from 'http-errors';
import Auth from "../models/Auth.js";
import CryptoJS from 'crypto-js';
import Role from '../models/Role.js';
import { validationResult } from 'express-validator';


class AuthController {

  //REGISTER
  async register(req, res, next) {
    const { email, login, password } = req.body
    
    try {
      //VALIDATING ERRORS
      const err = validationResult(req)
      if (!err.isEmpty()) { return next(createError(500, `${err.errors[0].msg}`)) }
      //IS EMAIL UNIQUE
      const candidate = await Auth.findOne({ email: email })
      if (candidate) { return next(createError(500, 'Email must be unique')) }

      const userRole = await Role.findOne({ value: "USER" })
      const newUser = new Auth({
        login: login,
        email: email,
        //ADD HASH PASSWORD
        password: CryptoJS.AES.encrypt(password, process.env.PASS_SEC).toString(),
        roles: [userRole.value]
      })
      await newUser.save()
      res.json({ username: login, email: email, resultCode: 0 })
    }
    catch (e) {
      throw createError(500, 'Registration error')
    }
  }

  //LOGIN
  async login(req, res) {
    try {
      const user = await Auth.findOne({
        email: req.body.email,
      })
      if (!user) { throw createError(500, 'Wrong credentials') }
      const data = {
        id: user._id,
        email: user.email,
        login: user.login
      }

      // const decryptPassword = CryptoJS.AES.decrypt(
      //   hashedPassword,
      //   process.env.PASS_SEC
      // ).toString(CryptoJS.enc.Utf8);

      res.json({ resultCode: 0, data: data })
    } catch {
      throw createError(500, 'Wrong credentials')
    }
  }
  async me(req, res) {
    try {
      res.json('okok')
    } catch {
      throw createError(500, 'You are not autorizated')
    }
  }

}


export default new AuthController()