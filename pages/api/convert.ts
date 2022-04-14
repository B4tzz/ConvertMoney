import nextConnect from "next-connect";
import { NextApiRequest, NextApiResponse } from "next";
const helmet = require("helmet");
import api from "axios";
import axiosRetry from "axios-retry";
const baseUrl = "http://data.fixer.io/";
import clientPromise from "../../config/database";

const ResultModelView = (result: Currencies) => ({
  id: result.id,
  coinName: result.coinName,
  symbol: result.symbol,
  coin: result.coin,
  total: result.total,
  tax: result.tax,
});

const apiRoute = nextConnect<NextApiRequest, NextApiResponse>({
  // Handle any other HTTP method
  onNoMatch(req, res) {
    res.status(404).json({ message: `Endpoint not found or no access.` });
  },
});

interface RatesJson {
  coin: string,
  rate: number
}

interface Currencies {
  id: string,
  coinName: string,
  symbol: string,
  coin: string,
  total: number,
  tax: number
}

interface Coins {
  _id: string,
  coin: string,
  symbol: string,
  name: string
}

apiRoute.use(helmet());

apiRoute.get(async (req: any, res) => {
  try {
    const { query } = req;
    const { coinFrom, amount } = query;

    if (!coinFrom || !amount) {
      return res.status(400).json({ message: "Bad request: missing params." });
    }

    const json: any[] = [];
    const coins: any[] = [];
    const client = await clientPromise;
    const db = await client.db(process.env.MONGODB_DB);

    const cursor = await db
      .collection("convert_coin")
      .find({ });

    await cursor.forEach((doc) => {
      coins.push(doc);
    });

    const coinList = coins.map(c => c.coin)
    coinList.push('EUR');

    await api
        .get(
          `${baseUrl}/api/latest?access_key=${process.env.FIXER_API_KEY}&symbols=${coinList.join(',')}`
        )
        .then((response) => {
          const rates = response.data.rates
          for (var key of Object.keys(rates)) {
            json.push({coin: key, rate: rates[key]});
          }
        })
        .catch((error) => {
          console.log(error);
        });

    
    const result: Currencies[] = convertCurrencies(json, coinFrom, amount, coins);
    

    return res.status(200).json(result.map((r => ResultModelView(r))));
  } catch (e) {
    console.log(e);
    res.status(500).json({ message: "Unexpected error." });
  }
});

function convertCurrencies(coinsRate: Array<RatesJson>, coinFrom: String, amount: number, coins: Array<Coins> ){
  const coinFromRatecoins = coinsRate.filter((c) => c.coin == coinFrom)[0];
  const currencies : Currencies[] = [];

  coinsRate.map((c, i) => {
    if(c.coin !== coinFrom){

      const coinInfo: Coins = coins.filter(ci => ci.coin == c.coin)[0];

      let total = ( c.rate / coinFromRatecoins.rate ) * amount;
      let tax = ( c.rate / coinFromRatecoins.rate )

      total = Number(total.toFixed(4));
      tax = Number(tax.toFixed(4));

      currencies.push({
        id: i.toString(),
        coinName: coinInfo.name,
        symbol: coinInfo.symbol,
        coin: c.coin,
        total: total,
        tax: tax
      });

    }
  });

  return currencies;
}

export default apiRoute;
