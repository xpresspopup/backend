import mongoose from 'mongoose';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import config from '../config/index';
const { Schema } = mongoose;

const userSchema = new Schema(
  {
    firstname: {
      type: String,
      lowercase: true,
      maxlength: 100,
    },
    lastname: {
      type: String,
      lowercase: true,
      maxlength: 100,
    },
    title: {
      /** for vendors or employers  more like company name */
      type: String,
      lowercase: true,
      maxlength: 100,
    },
    email: {
      type: String,
      trim: true,
      lowercase: true,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
      minlength: 5,
    },
    token: {
      /** change token to array */
      type: String,
      default: '',
    },
    phoneNumber: {
      type: String,
      minlength: 11,
      maxlength: 14,
    },
    address: {
      type: String,
      lowercase: true,
      maxlength: 255,
    },
    latitude: {
      type: Number,
    },
    longitude: {
      type: Number,
    },
    isActive: {
      /** Used to deactivate a user */
      type: Boolean,
      default: false,
    },
    isVerified: {
      type: Boolean,
      default: false,
    },
    accountConfirm: {
      type: Boolean,
      default: false,
    },
    confirmationCode: {
      type: Number,
      required: true,
    },
    isAdmin: {
      type: Boolean,
      default: false,
    },
    userType: {
      type: String,
      enum: [
        'blueCollar',
        'whiteCollar',
        'recruiter',
        'employer',
        'vendor',
        'client',
        'admin',
      ],
    },
    profilePic: {
      type: String,
    },
    ipAddress: {
      type: String,
      default: null,
    },
  },
  { timestamps: true },
);
userSchema.pre('save', async function hashPassword(next) {
  try {
    if (this.isModified('password')) {
      const salt = await bcrypt.genSaltSync(10);
      const hash = await bcrypt.hashSync(this.password, salt);
      this.password = hash;
      next();
    } else {
      next();
    }
  } catch (error) {
    return next(error);
  }
});
userSchema.methods.comparePassword = async function passComp(plainPassword) {
  try {
    const isMatch = await bcrypt.compareSync(plainPassword, this.password);
    return isMatch;
  } catch (error) {
    console.log(error);
  }
};
userSchema.methods.generateToken = async function genToken() {
  try {
    const payload = {
      id: this._id,
      email: this.email,
      title: this.title,
      firstname: this.firstname,
      lastname: this.lastname,
      isAdmin: this.isAdmin,
    };
    const token = await jwt.sign(payload, config.secretOrKey);
    this.token = `Bearer ${token}`;
    const doc = await this.save();
    return doc;
  } catch (error) {
    console.log(error);
  }
};
const User = mongoose.model('User', userSchema);
export default User;
