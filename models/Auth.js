import mongoose from 'mongoose'

const AuthSchema = new mongoose.Schema({
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  rememberMe: { type: Boolean, default: true },
})

export default mongoose.model('Auth', AuthSchema)