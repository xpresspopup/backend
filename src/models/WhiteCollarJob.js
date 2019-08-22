// import EmployerSchema from './Employer'
import mongoose from 'mongoose';
const { Schema } = mongoose;

const whiteCollarJobSchema = new Schema(
  {
    isApproved: {
      /** Day it is approved it becomes the posted date until after 30days it becomes invalid */
      type: Boolean,
      default: false,
    },
    isValid: {
      /** it is valid as long as the admin say so or until the due date elapsed */
      type: Boolean,
      default: false,
    },
    dueDate: {
      /** due date is set by the company or 30days after posted */
      type: Date,
    },
    postedDate: {
      /** Day it is approved it becomes the posted date until after 30days it becomes invalid */
      type: Date,
    },
    salary_range: {
      type: String,
      trim: true,
    },
    created_by: {
      type: Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
  },
  { timestamps: true },
);

const WhiteCollarJob = mongoose.model('WhiteCollarJob', whiteCollarJobSchema);
export default WhiteCollarJob;
