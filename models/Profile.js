const mongoose = require("mongoose")

const ProfileSchema = new mongoose.Schema({
  aboutMe: { type: String, default: null },
  fullName: { type: String },
  lookingForAJob: { type: Boolean, default: false },
  lookingForAJobDescription: { type: String },
  userId: { type: String, required: true },
  contacts: {
    facebook: { type: String, default: null },
    github: { type: String, default: null },
    instagram: { type: String, default: null },
    mainLink: { type: String, default: null },
    twitter: { type: String, default: null },
    vk: { type: String, default: null },
    website: { type: String, default: null },
    youtube: { type: String, default: null },
  },
  photos: {
    small: { type: String, default: null },
    large: { type: String, default: null }
  },
})

module.exports = mongoose.model('Profile', ProfileSchema)