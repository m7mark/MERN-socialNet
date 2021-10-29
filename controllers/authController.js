import AuthService from '../services/authService.js';
import createError from 'http-errors';
import Auth from "../models/Auth.js";



class AuthController {
  //REGISTER
  async register(req, res) {
    try {
      const { email, password } = await Auth.create(req.body)
      res.json({ email: email, password: password, resultCode: 0 })
    }
    catch {
      throw createError(500, 'Registration error')
    }
  }
  async login(req, res) {
    try {
      const me = await AuthService.login(req.body)
      res.json(me)
    } catch (e) {
      res.status(500).json(e)
    }
  }

}


export default new AuthController()