import { PaginateModel, Document, Schema, model } from 'mongoose';
import mongoosePaginate from "mongoose-paginate-v2"

export interface IUser extends Document {
  email: string
  password: string
  name: string
  status?: string
  followedIds?: Array<string>
  followed?: boolean
  photos: {
    small?: string
    large?: string
  },
  roles: Array<string>
}

const UserSchema = new Schema({
  email: { type: String, unique: true, required: true },
  password: { type: String, required: true },
  name: { type: String, required: true },
  status: { type: String, default: null },
  followedIds: [String],
  followed: { type: Boolean, default: false },
  photos: {
    small: { type: String, default: null },
    large: { type: String, default: null }
  },
  roles: [{ type: String, ref: 'Role' }]
}, { timestamps: true })

UserSchema.plugin(mongoosePaginate);
// Duplicate the ID field.
UserSchema.virtual('id').get(function (this: { _id: any }) {
  return this._id.toHexString();
});
// Ensure virtual fields are serialised.
UserSchema.set('toJSON', {
  virtuals: true
});

interface UserModel<T extends Document> extends PaginateModel<T> { }

export const User: UserModel<IUser> = model<IUser>('User', UserSchema);

