import UserService from '../services/userService.js';

class UserController {
  async createUser(req, res) {
    try {
      const user = await UserService.createUser(req.body)
      res.json(user)
    } catch (e) {
      res.status(500).json(e)
    }
  }
  async getAllUsers(req, res) {
    try {
      const users = await UserService.getAllUsers()
      return res.json(users)
    } catch (e) {
      res.status(500).json(e)
    }
  }
  async getOneUser(req, res) {
    try {
      const user = await UserService.getOneUser(req.params.id)
      return res.json(user)
    } catch (e) {
      res.status(500).json('Id is wrong')
    }
  }
  async updateUser(req, res) {
    try {
      const updatedUser = await UserService.updateUser(req.body)
      return res.json(updatedUser)
    } catch (e) {
      res.status(500).json(e.message)
    }
  }

}

export default new UserController()