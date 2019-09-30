import mongoose from 'mongoose';
const { Schema } = mongoose;

const listingSchema = new Schema(
  {
    title: {
      type: String,
      lowercase: true,
    },
    description: {
      type: String,
      lowercase: true,
    },
    pictures: [],
    address: {
      type: String,
      lowercase: true,
    },
    location: {
      type: { type: String },
      coordinates: [],
    },
    isApproved: {
      /** if user has paid for the listing, or admin decides to approve it   */
      type: Boolean,
      default: false,
    },
    isValid: {
      /** if the listing is still valid */
      type: Boolean,
      default: false,
    },
    category: { type: Schema.Types.ObjectId, ref: 'Category' },
    createdBy: {
      type: Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
    updatedBy: {
      type: Schema.Types.ObjectId,
      ref: 'User',
    },
  },
  { timestamps: true },
);
listingSchema.index({ location: '2dsphere' });
const listing = mongoose.model('Listing', listingSchema);
export default listing;
