import { IUser, User } from '../models/User'
import Role from '../models/Role'
import Profile from '../models/Profile'
import jwt from 'jsonwebtoken'
import CryptoJS from 'crypto-js'
import createError from 'http-errors'
import { validationResult } from 'express-validator'
import { Response, NextFunction } from 'express'
import { IRequest } from '../types/index'


const generateAccessToken = (id: string, roles: Array<string>) => {
  const payload = { id, roles }
  return jwt.sign(payload, process.env.JWT_SEC || '', { expiresIn: '3d' })
}

class UsersController {
  //REGISTER
  async register(req: IRequest, res: Response, next: NextFunction) {
    try {
      //validating errors
      const err = validationResult(req)
      if (!err.isEmpty()) { return next(createError(500, `${err.array()[0].msg}`)) }
      const { email, login, password } = req.body
      //is email unique
      const candidate = await User.findOne({ email })
      if (candidate) { return next(createError(500, 'Email must be unique')) }
      //create new user
      const userRole = await Role.findOne({ value: "USER" })
      const newUser = new User({
        name: login,
        email: email,
        //add hash password
        password: CryptoJS.AES.encrypt(password, process.env.PASS_SEC || '').toString(),
        roles: [userRole?.value]
      })
      const savedNewUser = await newUser.save()
      //create new profile
      await Profile.create({ userId: savedNewUser._id, fullName: login })
      //response
      res.json({ resultCode: 0, messages: [], data: { username: login, email: email } })
    }
    catch (e) {
      // console.log(e)
      return next(createError(500, 'Registration error'))
    }
  }
  //LOGIN
  async login(req: IRequest, res: Response, next: any) {
    try {
      //validating errors
      const err = validationResult(req)
      if (!err.isEmpty()) { return next(createError(500, `${err.array()[0].msg}`)) }
      const { email, password } = req.body
      //check email
      const user = await User.findOne({ email })
      if (!user) { return next(createError(500, 'Wrong credentials')) }
      //check password
      const decryptPassword = CryptoJS.AES.decrypt(user.password, process.env.PASS_SEC || '')
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
      return next(createError(500, 'Wrong credentials'))
    }
  }
  //LOGOUT
  async logout(req: IRequest, res: Response, next: any) {
    try {
      res.json({ resultCode: 0, messages: [], data: {} })
    } catch {
      return next(createError(500, 'Something wrong'))
    }
  }
  //GET ALL USERS (ADMIN ACCESS)
  async getUsers(req: IRequest, res: Response, next: any) {
    try {
      const users = await User.find()
      res.json({ resultCode: 0, messages: [], data: users })
    } catch {
      return next(createError(500, 'You are not autorizated'))
    }
  }
  //GET ONE USER
  async me(req: IRequest, res: Response, next: any) {
    try {
      const user = await User.findById(req.user?.id)
      const data = user && {
        id: user._id,
        email: user.email,
        login: user.name
      }
      res.json({ resultCode: 0, messages: [], data: data })
    } catch {
      return next(createError(500, 'You are not autorizated'))
    }
  }
  //GET LIST OF USERS
  async getListOfUsers(req: IRequest, res: Response, next: any) {
    //query params
    const { count, page, term, friend } = req.query
    const currentUser = req.user?.id
    //paginate options
    const options = {
      sort: '-createdAt',
      page: page && +page || 1,
      limit: count && +count || 10,
      select: 'id name status photos followed',
    };
    try {
      let newUsers = [] as IUser[]
      let responseData;
      let newTerm = term as string
      const re = new RegExp(newTerm, "i")
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
        users.map((u: any) => {
          if (currentUserData?.followedIds?.includes(u._id)) { u.followed = true }
          newUsers.push(u)
        })
      } else {
        newUsers = users;
      }
      res.json({ items: newUsers, totalCount: responseData.totalDocs, error: null, })
    } catch (e) {
      return next(createError(500, 'Get users error'))
    }
  }
}

export default new UsersController