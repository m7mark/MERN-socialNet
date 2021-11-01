import createError from 'http-errors';
import User from "../models/User.js";
import CryptoJS from 'crypto-js';
import Role from '../models/Role.js';
import jwt from 'jsonwebtoken';
import { validationResult } from 'express-validator';
import Profile from '../models/Profile.js';

const generateAccessToken = (id, roles) => {
  const payload = { id, roles }
  return jwt.sign(payload, process.env.JWT_SEC, { expiresIn: '3d' })
}


class UserController {

  //REGISTER
  async register(req, res, next) {
    try {
      const { email, login, password } = req.body
      //validating errors
      const err = validationResult(req)
      if (!err.isEmpty()) { return next(createError(500, `${err.errors[0].msg}`)) }
      //is email unique
      const candidate = await User.findOne({ email })
      if (candidate) { return next(createError(500, 'Email must be unique')) }
      //create new user
      const userRole = await Role.findOne({ value: "USER" })
      const newUser = new User({
        name: login,
        email: email,
        //add hash password
        password: CryptoJS.AES.encrypt(password, process.env.PASS_SEC).toString(),
        roles: [userRole.value]
      })
      const savedNewUser = await newUser.save()
      //create new profile
      await Profile.create({ userId: savedNewUser._id, fullName: login })
      //response
      res.json({ resultCode: 0, messages: [], data: { username: login, email: email } })
    }
    catch (e) {
      // console.log(e)
      throw createError(500, 'Registration error')
    }
  }
  //LOGIN
  async login(req, res) {
    try {
      const { email, password } = req.body
      //check email
      const user = await User.findOne({ email })
      if (!user) { throw createError(500, 'Wrong credentials') }
      //check password
      const decryptPassword = CryptoJS.AES.decrypt(user.password, process.env.PASS_SEC)
        .toString(CryptoJS.enc.Utf8);
      if (decryptPassword !== password) { throw createError(500, 'Wrong credentials') }
      //response
      const accessToken = generateAccessToken(user._id, user.roles)
      const data = {
        userId: user._id,
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
  //GET ALL USERS (ADMIN ACCESS)
  async getUsers(req, res) {
    try {
      const users = await User.find()
      res.json({ resultCode: 0, messages: [], data: users })
    } catch {
      throw createError(500, 'You are not autorizated')
    }
  }
  //GET ONE USER
  async me(req, res) {
    try {
      const user = await User.findById(req.user.id)
      const data = {
        id: user._id,
        email: user.email,
        login: user.name
      }
      res.json({ resultCode: 0, messages: [], data: data })
    } catch {
      throw createError(500, 'You are not autorizated')
    }
  }
  //GET LIST OF USERS
  async getListOfUsers(req, res) {
    //query params
    const limit = req.query.count
    const page = req.query.page
    const term = req.query.term
    const friend = req.query.friend
    const currentUser = req.user?.id

    //paginate options
    const options = {
      page: page || 1,
      limit: limit || 10,
      select: 'name status photos followed',
    };
    try {
      // {name: /da/i}
      // const totalCount = await User.find().estimatedDocumentCount();
      // const users = await User.find({}, 'name status photos followed')
      const currentUserData = await User.findById(currentUser)
      const response = await User.paginate({}, options)
      const users = response.docs
      //if user authorized
      if (currentUser) {
        // const { followedIds } = await User.findById(currentUser)
        // const friendly = await User.find().in('_id', followedIds);
        let newUsers = []
        users.map((u) => {
          if (currentUserData?.followedIds.includes(u._id)) { u.followed = true }
          newUsers.push(u)
        })
        res.json({ items: newUsers, totalCount: response.totalDocs, error: null, })
      }
      //if user not authorized
      else {
        res.json({ items: users, totalCount: response.totalDocs, error: null, })
      }
    } catch (e) {
      console.log(e);
      throw createError(500, 'Get users error')
    }
  }
}


export default new UserController()