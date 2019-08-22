import mongoose from 'mongoose';
const { Schema } = mongoose;

const materialRequestSchema = new Schema(
  {
    title: {
      type: String,
      lowercase: true,
      required: true,
      maxlength: 100,
    },
    reference: {
      type: String,
      lowercase: true,
      unique: true,
    },
    category: {
      type: String,
      lowercase: true,
    },
    isApproved: {
      type: Boolean,
      default: false,
    },
    isVerified: {
      type: Boolean,
      default: false,
    },
    isCompleted: {
      type: Boolean,
      default: false,
    },
    isValid: {
      type: Boolean,
      default: false,
    },
    jobType: {
      type: String,
      enum: ['whiteCollar', 'blueCollar'],
    },
    job: {
      type: Schema.Types.ObjectId,
      ref: 'Job',
      required: true,
    },
    items: [{ type: Schema.Types.ObjectId, ref: 'Material' }],
    raisedBy: {
      type: Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
    client: {
      type: Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
    vendor: {
      type: Schema.Types.ObjectId,
      ref: 'Vendor',
    },
  },
  { timestamps: true },
);

const materialRequest = mongoose.model(
  'Material_Request',
  materialRequestSchema,
);
export default materialRequest;
