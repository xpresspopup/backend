import mongoose from 'mongoose';
const { Schema } = mongoose;

const categorySchema = new Schema(
  {
    title: {
      type: String,
      lowercase: true,
      required: true,
      maxlength: 100,
    },
    createdBy: {
      type: Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
  },
  { timestamps: true },
);

const category = mongoose.model('Category', categorySchema);
export default category;
