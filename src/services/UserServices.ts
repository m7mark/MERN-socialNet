import { IUser, User } from '../models/User'
import Role from '../models/Role'
import Profile from '../models/Profile'
import { IUserReqQuery } from '../types'
import { getPaginateOptions } from '../config/paginate.config'
import { PaginateResult } from 'mongoose'
import { generateAccessToken } from '../utils/jwtTokenUtils'
import { decryptPassword, encryptPassword } from '../utils/cryptoPassword'

class UserServices {
  async register(email: string, login: string, password: string) {
    //is email unique
    const candidate = await User.findOne({ email })
    if (candidate) {
      throw new Error(' - email must be unique')
    }
    //create new user
    const userRole = await Role.findOne({ value: 'USER' })
    const newUser = new User({
      name: login,
      email: email,
      password: encryptPassword(password),
      roles: [userRole?.value],
    })
    const savedNewUser = await newUser.save()
    //create new profile
    await Profile.create({ userId: savedNewUser._id, fullName: login })
    return { username: login, email: email }
  }

  async login(email: string, password: string) {
    //check email
    const user = await User.findOne({ email })
    if (!user) {
      throw new Error()
    }
    //check password
    const decryptedPassword = decryptPassword(user.password)
    if (decryptedPassword !== password) {
      throw new Error()
    }
    //response
    const accessToken = generateAccessToken(user._id, user.roles)
    return {
      userId: user._id as string,
      token: accessToken,
    }
  }

  async getUsers() {
    return await User.find()
  }

  async me(userId?: string) {
    const user = await User.findById(userId)
    return (
      user && {
        id: user.id as string,
        email: user.email,
        login: user.name,
      }
    )
  }

  async getListOfUsers(query: IUserReqQuery, currentUser?: string) {
    //query params
    const { count, page, term, friend } = query

    let newUsers = [] as IUser[]
    let responseData: PaginateResult<IUser>
    const regE = new RegExp(term, 'i')
    const currentUserData = await User.findById(currentUser)
    //only friends
    if (friend === 'true' && currentUserData) {
      responseData = await User.paginate(
        {
          $and: [{ name: regE }, { _id: { $in: currentUserData.followedIds } }],
        },
        getPaginateOptions(page, count)
      )
    } else {
      responseData = await User.paginate(
        { name: regE },
        getPaginateOptions(page, count)
      )
    }
    //if user authorized
    if (currentUser) {
      responseData.docs.map((u) => {
        if (currentUserData?.followedIds?.includes(u._id)) {
          u.followed = true
        }
        newUsers.push(u)
      })
    } else {
      newUsers = responseData.docs
    }
    return {
      users: newUsers,
      total: responseData.totalDocs,
    }
  }

  async deleteUser(userId: string) {
    const user = await User.findById(userId)
    if (!user) throw new Error(' - incorrect user Id')
    await User.deleteOne({ _id: userId })
    await Profile.deleteOne({ userId: userId })
  }
}

export default new UserServices()
