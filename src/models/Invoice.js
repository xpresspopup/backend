import mongoose from 'mongoose';
const { Schema } = mongoose;

const invoiceSchema = new Schema(
  {
    reference: {
      /** Refernce number to be shown across the invoice generated from this schema */
      type: String,
      lowercase: true,
      unique: true,
    },
    accessmentCharge: {
      /** Accessment charge to be fixed by admins or autocalculated by i dont know */
      type: Number,
      required: true,
    },
    serviceCharge: {
      /** Sevice charge to be fixed by admin or to be selected from a list of similar charges for each type of job */
      type: Number,
      required: true,
    },
    isApproved: {
      /** if user pays for the final fee  */
      type: Boolean,
      default: false,
    },
    isVerified: {
      /** if collected by the handy men and delivered to the client */
      type: Boolean,
      default: false,
    },
    isValid: {
      /** if the job is completed, it will be sent to vendor, admin, user, handyman */
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

const invoice = mongoose.model('Invoice', invoiceSchema);
export default invoice;
