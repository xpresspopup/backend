/* eslint-disable no-underscore-dangle */
/* eslint-disable consistent-return */
import mongoose from 'mongoose';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import config from '../config/index';
const { Schema } = mongoose;

const userSchema = new Schema({
  firstname: {
    type: String,
    lowercase: true,
    required: true,
    maxlength: 100,
  },
  lastname: {
    type: String,
    lowercase: true,
    required: true,
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
    type: String,
    default: '',
  },
  isVerified: {
    type: Boolean,
    default: false,
  },
  subcriptionType: {
    type: String,
    enum: ['free', 'diamond', 'premium'],
  },
  subscriptionStatus: {
    type: Boolean,
    default: false,
  },
  phoneNumber: {
    type: String,
    minlength: 11,
    maxlength: 14,
  },
  gender: {
    type: String,
    enum: ['male', 'female', 'prefer not to say'],
  },
  address: {
    type: String,
    lowercase: true,
    maxlength: 255,
  },
  state: {
    type: String,
    lowercase: true,
    maxlength: 50,
  },
  local_govt_area: {
    type: String,
    lowercase: true,
    maxlength: 100,
  },
  latitude: {
    type: Number,
  },
  longitude: {
    type: Number,
  },
  ageRange: {
    type: String,
  },
  isAdmin: {
    type: Boolean,
  },
  userType: {
    type: String,
    enum: ['blueCollar', 'whiteCollar', 'employer', 'recruiter'],
  },
  profilePic: {
    type: String,
  },
  bio: {
    type: String,
    maxlength: 500,
  },
});
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
      isAdmin: this.isAdmin,
    };
    const token = await jwt.sign(payload, config.secretOrKey);
    this.token = token;
    const doc = await this.save();
    return doc;
  } catch (error) {
    console.log(error);
  }
};
const User = mongoose.model('User', userSchema);
export default User;
