import mongoose from 'mongoose';
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
      /** Auto generated when job is created feom this schema */
      type: String,
      lowercase: true,
      unique: true,
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

const Job = mongoose.model('Job', jobSchema);
export default Job;
