import mongoose from "mongoose";
import { v4 as uuidv4 } from "uuid"; 

const reportSchema = new mongoose.Schema(
  {
    reportId: {
      type: String,
      default: uuidv4, 
      unique: true, 
      required: true,
    },
    title: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    generatedOn: {
      type: Date,
      default: Date.now,
    },
  },
  { timestamps: true } 
);

const reportModel = mongoose.models.reports || mongoose.model("reports", reportSchema);

export { reportModel };
