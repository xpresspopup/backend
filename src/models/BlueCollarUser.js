import mongoose from 'mongoose';

const { Schema } = mongoose;

const blueCollarSchema = new Schema(
  {
    gender: {
      type: String,
      enum: ['male', 'female', 'prefer not to say'],
    },
    stateOfOrigin: {
      type: String,
      lowercase: true,
      maxlength: 50,
    },
    local_govt_area: {
      type: String,
      lowercase: true,
      maxlength: 100,
    },
    ageRange: {
      type: String,
    },
    starRating: {
      type: Number,
    },

    userId: { type: Schema.Types.ObjectId, ref: 'User' },
    jobsHistory: [{ type: Schema.Types.ObjectId, ref: 'Job' }],
    openJob: [{ type: Schema.Types.ObjectId, ref: 'Job' }],
  },
  { timestamps: true },
);
const BlueCollar = mongoose.model('BlueCollar', blueCollarSchema);
export default BlueCollar;
