import mongoose from 'mongoose';
import uuid from 'uuid';
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
      unique: true,
    },
    isApproved: {
      /** if client approves the purchase of the material */
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
materialRequestSchema.pre('save', async function hashPassword(next) {
  try {
    if (this.isModified('reference')) {
      const date = new Date();
      const day = date.getDate();
      const month = date.getMonth() + 1;
      const year = date.getFullYear();
      const referenceId = uuid.v4();
      const joined = `${year}${month}${day}`;
      this.reference = `${joined}/${referenceId}`;
      next();
    } else {
      next();
    }
  } catch (error) {
    return next(error);
  }
});
const materialRequest = mongoose.model(
  'Material_Request',
  materialRequestSchema,
);
export default materialRequest;
