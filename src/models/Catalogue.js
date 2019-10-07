import mongoose from 'mongoose';
const { Schema } = mongoose;

const catalogueSchema = new Schema(
  {
    title: {
      type: String,
      lowercase: true,
      required: true,
      maxlength: 100,
    },
    amount: {
      type: Number,
    },
    picture: { type: String },
    isAvailable: {
      type: Boolean,
      default: true,
    },
    createdBy: {
      type: Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
  },
  { timestamps: true },
);

const catalogue = mongoose.model('Catalogue', catalogueSchema);
export default catalogue;
