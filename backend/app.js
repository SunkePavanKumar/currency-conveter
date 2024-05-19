import express from "express";
import { rateLimit } from "express-rate-limit";
const PORT = process.env.PORT;
import "dotenv/config";
import cors from "cors";
import axios from "axios";

const app = express();
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  limit: 100, // Limit each IP to 100 requests per `window` (here, per 15 minutes)..
});

app.use(limiter);
app.use(cors());
app.use(express.json());

// router for conversion of api

app.post("/api/v1/converter", async (req, res) => {
  try {
    const CONVERTER_URI = process.env.CONVERTER_URI;
    const CONVERTER_SECRET = process.env.CONVERTER_SECRET;
    let { baseCurrency, targetCurrency, value } = req.body;
    const finalUrl = `${CONVERTER_URI}/${CONVERTER_SECRET}/pair/${baseCurrency}/${targetCurrency}/${parseInt(
      value
    )}`;
    const response = await axios.get(finalUrl);
    if (response && !response.data.result === "success") {
      res.send({
        success: false,
        message: "Failed to convert the data",
        data: await response.data,
      });
    }
    let { result, base_code, target_code, conversion_rate, conversion_result } =
      await response.data;
    let data = {
      result,
      base_code,
      target_code,
      conversion_rate,
      conversion_rate,
      conversion_result,
    };
    res.send({
      success: true,
      message: `Successfully converted from ${baseCurrency} to ${targetCurrency}`,
      data,
    });
  } catch (error) {
    console.error(`Error while converting, ${error}`);
    res.send({
      success: false,
      error: error.message || "Something went wrong",
    });
  }
});
app.listen(PORT, (err) => {
  if (err) throw err;
  console.log(`App is listening to the port ${PORT}`);
});
