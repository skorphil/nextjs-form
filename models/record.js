import mongoose from "mongoose";
const Schema = mongoose.Schema;

const RecordSchema = new Schema(
  {
    date: Number,
    quotes: [
      {
        baseCurrency: String,
        rates: [{ currency: String, rate: Number }],
      },
    ],
    institutions: [
      {
        name: String,
        country: String,
        assets: [
          {
            currency: String,
            amount: Number,
            isEarning: Boolean,
            description: String,
          },
        ],
      },
    ],
  },
  { timestamps: true }
);

module.exports =
  mongoose.models.Record || mongoose.model("Record", RecordSchema);
