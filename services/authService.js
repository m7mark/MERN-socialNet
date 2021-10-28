import Auth from "../models/Auth.js";

class AuthService {
  async register(me) {
    const createdMe = await Auth.create(me)
    return createdMe;
  }
  async login(me) {
    const loginMe = await Auth.create(me)
    return loginMe;
  }
}

export default new AuthService()