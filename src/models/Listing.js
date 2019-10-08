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
    picture: { type: String },
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
      default: true,
    },
    category: { type: Schema.Types.ObjectId, ref: 'Category', required: true },
    catalogue: [{ type: Schema.Types.ObjectId, ref: 'Catalogue' }],
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
