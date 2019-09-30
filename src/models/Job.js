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
      type: String,
    },
    isApproved: {
      /** when the admin approves the job posting */
      type: Boolean,
      default: true,
    },
    isValid: {
      /** if its approved and within due date */
      type: Boolean,
      default: true,
    },
    dueDate: {
      /** due date is set by the client or 5days after posting for blueCollar 20 days after for whiteCollar */
      type: Date,
    },
    postedDate: {
      /** Day it is approved */
      type: Date,
    },
    jobType: {
      type: String,
      enum: ['whiteCollar', 'blueCollar'],
    },
    description: {
      /** for white collar jobs its job description , while for blue collar jobs its client's brief */
      type: String,
      lowercase: true,
    },
    address: {
      type: String,
      lowercase: true,
    },
    location: {
      type: { type: String },
      coordinates: [],
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
    let result = '';
    const myNumber = parseInt(Math.random() * 1000000000, 10);
    const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
    const charactersLength = characters.length;
    characters.split('').forEach((element, i) => {
      if (i < 2) {
        result += characters.charAt(
          Math.floor(Math.random() * charactersLength),
        );
      }
    });
    this.reference = `${result}/${myNumber}`;
    next();
  } catch (error) {
    return next(error);
  }
});
jobSchema.index({ location: '2dsphere' });
const Job = mongoose.model('Job', jobSchema);
export default Job;
