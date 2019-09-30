import mongoose from 'mongoose';
const { Schema } = mongoose;

const employerSchema = new Schema(
  {
    subcriptionType: {
      type: String,
      enum: ['free', 'premium'],
    },
    subscriptionStatus: {
      type: Boolean,
      default: false,
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
    userId: { type: Schema.Types.ObjectId, ref: 'User' },
    jobsPosted: [{ type: Schema.Types.ObjectId, ref: 'Job' }],
  },
  { timestamps: true },
);

const Employer = mongoose.model('Employer', employerSchema);
export default Employer;
