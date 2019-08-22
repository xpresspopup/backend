import mongoose from 'mongoose';

const { Schema } = mongoose;

const blueCollarSchema = new Schema(
  {
    isVerified: {
      type: Boolean,
      default: false,
    },
    subcriptionType: {
      type: String,
      enum: ['free', 'platinium'],
    },
    subscriptionStatus: {
      /** Used to know when a subcription is active or not */
      type: Boolean,
      default: false,
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
    stateOfOrigin: {
      type: String,
      lowercase: true,
      maxlength: 50,
    },
    local_govt_area: {
      type: String,
      lowercase: true,
      maxlength: 100,
    },
    ageRange: {
      type: String,
    },
    starRating: {
      type: Number,
    },

    userDetails: [{ type: Schema.Types.ObjectId, ref: 'User' }],
    jobsHistory: [{ type: Schema.Types.ObjectId, ref: 'Job' }],
    ongoingJob: [{ type: Schema.Types.ObjectId, ref: 'Job' }],
  },
  { timestamps: true },
);
const BlueCollar = mongoose.model('BlueCollar', blueCollarSchema);
export default BlueCollar;
