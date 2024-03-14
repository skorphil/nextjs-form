"use server";

import connect from "utils/mongooseConnect";
import Record from "models/record";

export async function getLatestRecord() {
  /**
   * Getting latest record from mongodb
   *
   * @throws Error retreiving record, when mongoose can't perform Record.find
   *
   * @returns list of institutions with assets
   * to be used by react-hook-form in RecordForm as defaultValues
   */

  await connect();

  let recordsList = null;
  try {
    recordsList = await Record.find().sort({ createdAt: -1 }).limit(1).exec();
  } catch (error) {
    throw new Error("Error retreiving record:", error.message);
  }

  if (recordsList.length === 0) return null;

  const latestRecord = recordsList[0].toObject({
    transform: function (doc, ret) {
      delete ret._id;
      delete ret.__v;
      return ret;
    },
  });

  return latestRecord;
}
