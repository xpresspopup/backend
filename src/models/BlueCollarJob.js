// import EmployerSchema from './Employer'
import mongoose from 'mongoose';
const { Schema } = mongoose;

const blueCollarJobSchema = new Schema(
  {
    isAccepted: {
      /** when the blue collar peron accepts the job */
      type: Boolean,
      default: false,
    },
    acceptedTime: {
      /** time the blue collar accepts the job */
      type: Date,
    },
    isApproved: {
      /** when the client agrees to get materials */
      type: Boolean,
      default: false,
    },
    aprovedTime: {
      /** time the client accepts the job */
      type: Date,
    },
    isPaid: {
      /** when the client paid for the material */
      type: Boolean,
      default: false,
    },
    paymentTime: {
      /** time the client accepts the job */
      type: Date,
    },
    isCompleted: {
      /** when the handyman closes / finishes the job */
      type: Boolean,
      default: false,
    },
    completedTime: {
      /** time the client accepts the job */
      type: Date,
    },
    clientSignature: {
      type: String,
    },
    isValid: {
      /** it is valid if b4 due date */
      type: Boolean,
      default: false,
    },
    dueDate: {
      /** due date is set by the client or 5days after posting */
      type: Date,
    },
    postedDate: {
      /** Day it is posted it becomes the posted date until after 5days it becomes invalid */
      type: Date,
    },
    jobDetails: {
      type: Schema.Types.ObjectId,
      ref: 'Job',
      required: true,
    },
    client: {
      type: Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
    handyManDetails: {
      type: Schema.Types.ObjectId,
      ref: 'BlueCollar',
      required: true,
    },
    invoice: {
      type: Schema.Types.ObjectId,
      ref: 'Invoice',
    },
  },
  { timestamps: true },
);

const BlueCollarJob = mongoose.model('BlueCollarJob', blueCollarJobSchema);
export default BlueCollarJob;
