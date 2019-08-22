import mongoose from 'mongoose';
const { Schema } = mongoose;

const materialSchema = new Schema(
  {
    title: {
      type: String,
      lowercase: true,
      required: true,
      maxlength: 100,
    },
    unitPrice: {
      type: Number,
      maxlength: 255,
    },
    isAvailable: {
      type: Boolean,
      default: true,
    },
    isVerified: {
      type: Boolean,
      default: false,
    },
  },
  { timestamps: true },
);

const material = mongoose.model('Material', materialSchema);
export default material;
