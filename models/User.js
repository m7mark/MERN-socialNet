import mongoose from 'mongoose'

const UserSchema = new mongoose.Schema({
  email: { type: String, unique: true, required: true, index: true },
  password: { type: String, required: true },
  login: { type: String, required: true },
  status: { type: String, default: null},
  followedIds: [String],
  roles: [{ type: String, ref: 'Role' }]
}, { timestamps: true })

export default mongoose.model('User', UserSchema)