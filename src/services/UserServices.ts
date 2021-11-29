import { IUser, User } from '../models/User'
import Role from '../models/Role'
import Profile from '../models/Profile'
import jwt from 'jsonwebtoken'
import CryptoJS from 'crypto-js'

const generateAccessToken = (id: string, roles: Array<string>) => {
  const payload = { id, roles }
  return jwt.sign(payload, process.env.JWT_SEC || '', { expiresIn: '3d' })
}

class UserServices {

  async register(email: string, login: string, password: string) {
    //is email unique
    const candidate = await User.findOne({ email })
    if (candidate) { throw new Error('- email must be unique') }
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
  }

  async login(email: string, password: string) {
    //check email
    const user = await User.findOne({ email })
    if (!user) { throw new Error }
    //check password
    const decryptPassword = CryptoJS.AES.decrypt(user.password, process.env.PASS_SEC || '')
      .toString(CryptoJS.enc.Utf8);
    if (decryptPassword !== password) { throw new Error }
    //response
    const accessToken = generateAccessToken(user._id, user.roles)
    return {
      userId: user._id,
      token: accessToken
    }
  }

  async getUsers() {
    return await User.find()
  }

  async me(userId: string) {
    const user = await User.findById(userId)
    return user && {
      id: user._id,
      email: user.email,
      login: user.name
    }
  }

  async getListOfUsers(currentUser: string, query: any) {
    interface queryI {
      count: string
      page: string
      term: string
      friend: string
    }
    //query params
    const { count, page, term, friend }: queryI = query
    //paginate options
    const options = {
      sort: '-createdAt',
      page: page && +page || 1,
      limit: count && +count || 10,
      select: 'id name status photos followed',
    };
    let newUsers = [] as IUser[]
    let responseData;
    const regE = new RegExp(term, "i")
    const currentUserData = await User.findById(currentUser)
    //only friends
    if (friend === 'true' && currentUserData) {
      responseData = await User.paginate({
        $and: [
          { name: regE },
          { _id: { $in: currentUserData.followedIds } }
        ]
      }, options)
    } else {
      responseData = await User.paginate({ name: regE }, options)
    }
    //if user authorized
    if (currentUser) {
      responseData.docs.map((u: any) => {
        if (currentUserData?.followedIds?.includes(u._id)) { u.followed = true }
        newUsers.push(u)
      })
    } else {
      newUsers = responseData.docs;
    }
    return {
      users: newUsers,
      total: responseData.totalDocs
    }
  }
}

export default new UserServices