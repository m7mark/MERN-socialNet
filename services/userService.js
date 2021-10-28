import User from "../models/User.js"

class UserService {
  async createUser(user) {
    const createdUser = await User.create(user)
    return createdUser;
  }

  async getAllUsers() {
    const users = await User.find()
    return users;
  }

  async getOneUser(id) {
    if (!id) {
      throw new Error({ message: 'Id not exist' })
    }
    const user = await User.findById(id)
    return user;
  }

  async updateUser(user) {
    if (!user._id) {
      throw new Error('Id is not exist')
    }
    const updatedUser = await User.findByIdAndUpdate(user._id, user, { new: true })
    return updatedUser;
  }
}

export default new UserService()