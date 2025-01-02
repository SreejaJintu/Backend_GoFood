import mongoose from "mongoose";

const reportSchema = new mongoose.Schema(
  {
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
});

const reportModel = mongoose.models.reports || mongoose.model("reports", reportSchema);

export  { reportModel };
