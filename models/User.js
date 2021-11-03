const mongoose = require("mongoose")
const mongoosePaginate = require("mongoose-paginate-v2")

const UserSchema = new mongoose.Schema({
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
UserSchema.virtual('id').get(function(){
  return this._id.toHexString();
});
// Ensure virtual fields are serialised.
UserSchema.set('toJSON', {
  virtuals: true
});

module.exports = mongoose.model('User', UserSchema)
