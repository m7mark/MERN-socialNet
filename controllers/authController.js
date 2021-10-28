import AuthService from '../services/authService.js';

class AuthController {
  async register(req, res) {
    try {
      const me = await AuthService.register(req.body)
      res.json(me)
    } catch (e) {
      res.status(500).json(e.message)
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