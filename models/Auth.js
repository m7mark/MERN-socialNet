import mongoose from 'mongoose'

const AuthSchema = new mongoose.Schema({
  email: { type: String, unique: true, required: true, index: true },
  password: { type: String, required: true },
  login: { type: String, required: true },
  roles: [{ type: String, ref: 'Role' }]
}, { timestamps: true })

export default mongoose.model('Auth', AuthSchema)