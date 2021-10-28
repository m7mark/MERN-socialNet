import mongoose from 'mongoose'

const UserSchema = new mongoose.Schema({
  name: { type: String, required: true },
  status: String,
  // photos: {
  //   small: { type: String, default: null },
  //   large: { type: String, default: null }
  // },
  followed: { type: Boolean, required: true, default: false },
})

export default mongoose.model('User', UserSchema)