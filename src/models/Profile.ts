import { Document, Schema, model } from 'mongoose';
export interface IProfile extends Document {
  aboutMe: string | null
  fullName: string
  lookingForAJob: boolean
  lookingForAJobDescription: string
  userId: string
  contacts: {
    facebook: string | null
    github: string | null
    instagram: string | null
    mainLink: string | null
    twitter: string | null
    vk: string | null
    website: string | null
    youtube: string | null
  }
  photos: {
    small?: string
    large?: string
  }
}

const ProfileSchema = new Schema({
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

export default model<IProfile>('Profile', ProfileSchema)