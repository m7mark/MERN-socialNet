import Auth from "../models/Auth.js";
import createError from 'http-errors';


class AuthService {
  async register(me) {
    try {
      const createdMe = await Auth.create(me)
      return createdMe;
    }
    catch {
      throw createError(500, 'User not found')
    }
  }
  async login(me) {
    const loginMe = await Auth.create(me)
    return loginMe;
  }
}

export default new AuthService()