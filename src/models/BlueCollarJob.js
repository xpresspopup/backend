// import EmployerSchema from './Employer'
import mongoose from 'mongoose';
const { Schema } = mongoose;

const blueCollarJobSchema = new Schema(
  {
    jobStatus: {
      type: String,
      enum: ['approved', 'accepted', 'ongoing', 'completed'],
    },
    isAccepted: {
      /** when the blue collar peron accepts the job */
      type: Boolean,
      default: false,
    },
    acceptedTime: {
      /** time the blue collar accepts the job */
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
    jobId: {
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
