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
      /** if user has paid for the lisiting  */
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
  },
  { timestamps: true },
);

const listing = mongoose.model('Listing', listingSchema);
export default listing;
