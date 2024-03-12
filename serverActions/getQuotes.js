/* 
Helper server action which used in appendRecord() get quotes based on app's base
curencies list(currencies we need to calculate to)
and currencies from record being saved
*/

"use server";

export async function getQuotes({ baseCurrencies, recordCurrencies }) {
  const fetchUrls = recordCurrencies.map(
    (currency) =>
      `https://cdn.jsdelivr.net/npm/@fawazahmed0/currency-api@latest/v1/currencies/${currency}.json`
  );

  async function fetchQuotes(fetchUrls) {
    const promises = await fetchUrls.map(async (url) => fetch(url));

    const responses = await Promise.all(promises);
    const data = await Promise.all(
      responses.map(async (response) => {
        if (!response.ok) {
          throw new Error(
            `Quotes API request failed with status ${response.status}. Url: ${response.url}`
          );
        }
        return await response.json();
      })
    );
    return data;
  }

  const quotes = (await fetchQuotes(fetchUrls))
    .map((quote) => {
      const { date, ...rest } = quote;
      const [baseCurrency] = Object.keys(rest);
      const quotes = Object.entries(rest[baseCurrency]);
      const targetQuotes = quotes
        .filter(([key]) => baseCurrencies.includes(key))
        .map(([currency, value]) => ({
          currency: currency,
          rate: value,
        }));
      return { baseCurrency: baseCurrency, rates: [...targetQuotes] };
    })
    .flat();

  return quotes;
}
