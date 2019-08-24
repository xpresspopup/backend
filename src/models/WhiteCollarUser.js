import mongoose from 'mongoose';

const { Schema } = mongoose;

const whiteCollarSchema = new Schema(
  {
    bio: {
      type: String,
      maxlength: 500,
    },
    subcriptionType: {
      type: String,
      enum: ['free', 'diamond', 'premium'],
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
    cvUrl: {
      type: String,
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

    userId: { type: Schema.Types.ObjectId, ref: 'User' },
    jobsApplied: [{ type: Schema.Types.ObjectId, ref: 'Job' }],
    jobHistory: [{ type: Schema.Types.ObjectId, ref: 'Job' }],
  },
  { timestamps: true },
);
const WhiteCollar = mongoose.model('WhiteCollar', whiteCollarSchema);
export default WhiteCollar;
