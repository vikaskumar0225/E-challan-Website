import mongoose from 'mongoose';

const challanSchema = new mongoose.Schema(
  {
    finePayed:{
        type:Boolean,
        default:false
    },
    vehicleNumber: {
      type: String,
      required: true,
      uppercase: true,
    },
    fineAmount: {
      type: Number,
      required: true,
      min: 0,
    },
    vehicleType: {
      type: String,
      enum: ["Heavy Vehicle", "Light Vehicle"],
      required: true,
    },
    fineDescription: {
      type: String,
      required: true,
      trim: true,
    },
    ruleDescription: {
      type: String,
      required: true,
      trim: true,
    },
    dueDate: {
      type: Date,
      required: true,
    },
    additionalComments: {
      type: String,
      trim: true,
    },
    createdAt: {
      type: Date,
      default: Date.now,
    },
  },
  {
    timestamps: true,
  }
);

const Challan = mongoose.model('Challan', challanSchema);
export default Challan;
