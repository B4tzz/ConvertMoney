import nextConnect from "next-connect";
import { NextApiRequest, NextApiResponse } from "next";
const helmet = require("helmet");
import api from "axios";
import axiosRetry from "axios-retry";
const baseUrl = "http://data.fixer.io/";
import clientPromise from "../../config/database";
import { WithId, Document } from "mongodb";

const ResultModelView = (result: any) => ({
  id: result.coin,
  name: result.name,
  symbol: result.symbol,
  coin: result.coin,
});

const apiRoute = nextConnect<NextApiRequest, NextApiResponse>({
  // Handle any other HTTP method
  onNoMatch(req, res) {
    res.status(404).json({ message: `Endpoint not found or no access.` });
  },
});

apiRoute.use(helmet());

apiRoute.get(async (req: NextApiRequest, res : NextApiResponse) => {
  try {
    const coins: any[] = [];
    const client = await clientPromise;
    const db = await client.db(process.env.MONGODB_DB);

    const cursor = await db
      .collection("convert_coin")
      .find({});

    await cursor.forEach((doc)=> {
      coins.push(doc)
    });

    res.status(200).json(coins.map((c) => ResultModelView(c)));
    res.end();
  } catch (e) {
    console.log(e);
    res.status(500).json({ message: "Unexpected error." });
  }
});

export default apiRoute;
