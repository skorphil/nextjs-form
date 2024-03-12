/* 
Server action appends new record to mongoDB

Record transformed before being appended. 
- Added quotes
- Added date
- Removed institutions with 'isDeleted:true'
*/

// TODO add error handling to ui
// TODO add success handling to UI
// TODO prevent adding multiple records per month. Ask to override

"use server";

import Ajv from "ajv";
import connect from "utils/mongooseConnect";
import Record from "models/record";
import { getQuotes } from "./getQuotes";

const baseCurrencies = ["usd", "rub", "amd", "brl"];
const ajv = new Ajv();
const recordSchema = {
  type: "object",
  properties: {
    institutions: {
      type: "array",
      items: [
        {
          type: "object",
          properties: {
            name: {
              type: "string",
            },
            country: {
              type: "string",
              maxLength: 2,
            },
            assets: {
              type: "array",
              items: [
                {
                  type: "object",
                  properties: {
                    currency: {
                      type: "string",
                      minLength: 3,
                    },
                    amount: {
                      type: "number",
                    },
                    isEarning: {
                      type: "boolean",
                    },
                    description: {
                      type: "string",
                    },
                  },
                  required: ["currency", "amount", "isEarning", "description"],
                },
              ],
            },
          },
          required: ["name", "country", "assets"],
        },
      ],
    },
  },
  required: ["institutions"],
};

export async function appendRecord(formData) {
  const isFormDataValid = ajv.validate(recordSchema, formData);
  console.log("isFormDataValid", isFormDataValid);
  if (!isFormDataValid) {
    throw new Error(`Provided data has wrong structure: ${ajv.errorsText()}`);
  }

  const recordInstitutions = formData.institutions
    .filter((institution) => !institution.isDeleted)
    .map(({ isDeleted, ...rest }) => rest);

  const recordCurrencies = Array.from(
    new Set(
      recordInstitutions.flatMap((institution) =>
        institution.assets.map((asset) => asset.currency)
      )
    )
  );

  const record = new Record({
    date: Date.now(),
    quotes: await getQuotes({ baseCurrencies, recordCurrencies }),
    institutions: recordInstitutions,
  });

  try {
    await connect();
    await record.save();
    console.log("Document saved to db");
  } catch (error) {
    throw new Error("Error saving document:", error.message);
  }
}
