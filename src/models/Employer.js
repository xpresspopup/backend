import mongoose from 'mongoose';
const { Schema } = mongoose;

const employerSchema = new Schema(
  {
    isVerified: {
      type: Boolean,
      default: false,
    },
    subcriptionType: {
      type: String,
      enum: ['free', 'premium'],
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
    rcNumber: {
      type: String,
      maxlength: 100,
    },
    location: {
      type: String,
      lowercase: true,
      maxlength: 50,
    },
    category: {
      type: String,
    },
    employerDetails: [{ type: Schema.Types.ObjectId, ref: 'User' }],
    jobsPosted: [{ type: Schema.Types.ObjectId, ref: 'Job' }],
  },
  { timestamps: true },
);

const Employer = mongoose.model('Employer', employerSchema);
export default Employer;
