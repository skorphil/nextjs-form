"use server";

import connect from "utils/mongooseConnect";
import Record from "models/record";

export async function getLatestRecord() {
  try {
    await connect();
    const latestRecord = await Record.find()
      .sort({ createdAt: -1 })
      .limit(1)
      .exec();
    const institutionsList = latestRecord[0].institutions.toObject({
      transform: function (doc, ret) {
        delete ret._id;
        return ret;
      },
    });

    const initialValues = {
      institutions: institutionsList.map((institution) => ({
        ...institution,
        isDeleted: false,
      })),
    };

    return initialValues;
  } catch (error) {
    throw new Error("Error saving document:", error);
  }
}
