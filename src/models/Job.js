import mongoose from 'mongoose';
import uuid from 'uuid';
const { Schema } = mongoose;

const jobSchema = new Schema(
  {
    title: {
      type: String,
      lowercase: true,
      required: true,
      maxlength: 100,
    },
    category: {
      type: String,
      lowercase: true,
      required: true,
      maxlength: 100,
    },
    reference: {
      type: String,
    },
    description: {
      /** for white collar jobs its job description , while for blue collar jobs its client's brief */
      type: String,
      lowercase: true,
    },
    jobType: {
      type: String,
      enum: ['whiteCollar', 'blueCollar'],
    },
    address: {
      type: String,
      lowercase: true,
    },
    location: {
      type: String,
      lowercase: true,
    },
    latitude: {
      type: Number,
    },
    longitude: {
      type: Number,
    },
    created_by: {
      type: Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
  },
  { timestamps: true },
);
jobSchema.pre('save', async function genRef(next) {
  try {
    const date = new Date();
    const day = date.getDate();
    const month = date.getMonth() + 1;
    const year = date.getFullYear();
    const referenceRandom = uuid.v4();
    const joined = `${year}${month}${day}`;
    this.reference = `${joined}/${referenceRandom}`;
    next();
  } catch (error) {
    return next(error);
  }
});
const Job = mongoose.model('Job', jobSchema);
export default Job;
