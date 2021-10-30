import createError from 'http-errors';
import Auth from "../models/Auth.js";
import CryptoJS from 'crypto-js';
import Role from '../models/Role.js';
import jwt from 'jsonwebtoken';
import { validationResult } from 'express-validator';

const generateAccessToken = (id, roles) => {
  const payload = { id, roles }
  return jwt.sign(payload, process.env.JWT_SEC, { expiresIn: '3d' })
}

class AuthController {

  //REGISTER
  async register(req, res, next) {
    try {
      const { email, login, password } = req.body
      //VALIDATING ERRORS
      const err = validationResult(req)
      if (!err.isEmpty()) { return next(createError(500, `${err.errors[0].msg}`)) }
      //IS EMAIL UNIQUE
      const candidate = await Auth.findOne({ email })
      if (candidate) { return next(createError(500, 'Email must be unique')) }
      //CREATE NEW USER
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
      const { email, password } = req.body
      const user = await Auth.findOne({ email })
      if (!user) { throw createError(500, 'Wrong credentials') }
      const decryptPassword = CryptoJS.AES.decrypt(user.password, process.env.PASS_SEC)
        .toString(CryptoJS.enc.Utf8);
      if (decryptPassword !== password) { throw createError(500, 'Wrong credentials') }
      //RESPONSE
      const accessToken = generateAccessToken(user._id, user.roles)
      const data = {
        id: user._id,
        email: user.email,
        login: user.login,
        token: accessToken
      }
      res.json({ resultCode: 0, messages: [], data: data })
    } catch {
      throw createError(500, 'Wrong credentials')
    }
  }
  //LOGOUT
  async logout(req, res) {
    try {
      res.json({ resultCode: 0, messages: [], data: {} })
    } catch {
      throw createError(500, 'Something wrong')
    }
  }
  //GET ALL USERS
  async getUsers(req, res) {
    try {
      const users = await Auth.find()
      res.json({ resultCode: 0, messages: [], data: users })
    } catch {
      throw createError(500, 'You are not autorizated')
    }
  }
  //GET ONE USER
  async me(req, res) {
    try {
      const user = await Auth.findById(req.user.id)
      const data = {
        id: user._id,
        email: user.email,
        login: user.login
      }
      res.json({ resultCode: 0, messages: [], data: data })
    } catch {
      throw createError(500, 'You are not autorizated')
    }
  }

}


export default new AuthController()