const User = require('../models/User');
const Role = require('../models/Role');
const Profile = require('../models/Profile');
const jwt = require('jsonwebtoken');
const CryptoJS = require('crypto-js');
const createError = require('http-errors');
const { validationResult } = require('express-validator');

const generateAccessToken = (id, roles) => {
  const payload = { id, roles }
  return jwt.sign(payload, process.env.JWT_SEC, { expiresIn: '3d' })
}

class UsersController {
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
      if (!user) { throw createError(500, 'Wrong E-mail') }
      //check password
      const decryptPassword = CryptoJS.AES.decrypt(user.password, process.env.PASS_SEC)
        .toString(CryptoJS.enc.Utf8);
      if (decryptPassword !== password) { throw createError(500, 'Wrong credentials') }
      //response
      const accessToken = generateAccessToken(user._id, user.roles)
      const data = {
        userId: user._id,
        // token: accessToken
      }
      res
        // .append('Access-Control-Allow-Credentials', 'true')
        .cookie('token', `${accessToken}`, { path: '/api', httpOnly: true, sameSite:'none', secure:true })
        // .header('Access-Control-Allow-Credentials', 'true')
        // .append('Set-Cookie', `token=${accessToken}; HttpOnly`)
        .json({ resultCode: 0, messages: [], data: data })
      // .send()
    } catch (e) {
      throw createError(500, 'Wrong credentials')
    }
  }
  //LOGOUT
  async logout(req, res) {
    try {
      res
        .clearCookie('token', { path: '/api' })
        .json({ resultCode: 0, messages: [], data: {} })
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
      res
        .json({ resultCode: 0, messages: [], data: data })
    } catch {
      throw createError(500, 'You are not autorizated')
    }
  }
  //GET LIST OF USERS
  async getListOfUsers(req, res) {
    //query params
    const { count, page, term, friend } = req.query
    const currentUser = req.user?.id
    //paginate options
    const options = {
      page: page || 1,
      limit: count || 10,
      select: 'id name status photos followed',
    };
    try {
      let newUsers = []
      let responseData;
      const re = new RegExp(term, "i")
      const currentUserData = await User.findById(currentUser)
      //only friends
      if (friend === 'true' && currentUserData) {
        responseData = await User.paginate({
          $and: [
            { name: re },
            { _id: { $in: currentUserData.followedIds } }
          ]
        }, options)
      } else {
        responseData = await User.paginate({ name: re }, options)
      }
      const users = responseData.docs
      //if user authorized
      if (currentUser) {
        users.map((u) => {
          if (currentUserData?.followedIds.includes(u._id)) { u.followed = true }
          newUsers.push(u)
        })
      } else {
        newUsers = users;
      }
      res.json({ items: newUsers, totalCount: responseData.totalDocs, error: null, })
    } catch (e) {
      throw createError(500, 'Get users error')
    }
  }
}

module.exports = UsersController