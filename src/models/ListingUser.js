import mongoose from 'mongoose';
const { Schema } = mongoose;

const listingUserSchema = new Schema(
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
      maxlength: 20,
    },
    userId: { type: Schema.Types.ObjectId, ref: 'User' },
    listingPosted: [{ type: Schema.Types.ObjectId, ref: 'Listing' }],
  },
  { timestamps: true },
);

const listingUser = mongoose.model('listingUser', listingUserSchema);
export default listingUser;
