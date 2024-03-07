"use server";

import mongoose from "mongoose";
import Ajv from "ajv";
const dbUri = process.env.MONGO_URI;

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
              minLength: 2,
            },
            assets: {
              type: "array",
              items: [
                {
                  type: "object",
                  properties: {
                    currency: {
                      type: "string",
                      maxLength: 3,
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
  if (!isFormDataValid) {
    throw new Error(`Provided data has wrong structure: ${ajv.errorsText()}`);
  }
  // TODO add error handling to ui

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

  const record = {
    date: Date.now(),
    quotes: await getQuotes({ baseCurrencies, recordCurrencies }),
    institutions: recordInstitutions,
  };

  console.log("record:", record);

  // push to db
  // if no database?

  // await mongoose.connect(uri, {
  //   useNewUrlParser: true,
  //   serverSelectionTimeoutMS: 5000,
  //   socketTimeoutMS: 45000,
  //   family: 4, // Use IPv4, skip trying IPv6
  // });
  // console.log("models:", mongoose.models);

  // console.log("Mongoose connected to MongoDB Atlas!");
  // const kittySchema = new mongoose.Schema({
  //   name: String,
  // });
  // const Cat = mongoose.models.Cat || mongoose.model("Cat", kittySchema);
  // console.log("Cat modeled");

  // const fluffy = new Cat({ name: "fluffy" });
  // fluffy.save;
}

async function getQuotes({ baseCurrencies, recordCurrencies }) {
  const fetchUrls = recordCurrencies.map(
    (currency) =>
      `https://cdn.jsdelivr.net/npm/@fawazahmed0/currency-api@latest/v1/currencies/${currency}.json`
  );

  async function fetchQuotes(fetchUrls) {
    try {
      const promises = fetchUrls.map((url) => fetch(url));
      const responses = await Promise.all(promises);
      const data = await Promise.all(
        responses.map((response) => response.json())
      );
      return data;
    } catch (error) {
      console.error(error);
    }
  }

  // TODO reformat quotes because currencies can be 4 or more symbols. and `usdtcny` will be unable to parse
  /* [
    {recordCurrency: target currencies}
    {usd:[rub:90, amd:400...]}
    {rub:[rub:1, usd: 0.01...]}
  ] */
  const quotes = (await fetchQuotes(fetchUrls))
    .map((quote) => {
      const { date, ...rest } = quote;
      const [baseCurrency] = Object.keys(rest);
      const quotes = Object.entries(rest[baseCurrency]);
      debugger;
      const targetQuotes = quotes
        .filter(([key]) => baseCurrencies.includes(key) && key != baseCurrency)
        .map(([currency, value]) => ({
          [`${baseCurrency}${currency}`]: value,
        }));
      return targetQuotes;
    })
    .flat();

  return quotes;
}
