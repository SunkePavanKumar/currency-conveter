import React, { useState, useEffect } from "react";
import axios from "axios";
export default function CurrencyConverter() {
  const popularCurrencyCodes = [
    "USD",
    "EUR",
    "JPY",
    "GBP",
    "AUD",
    "CAD",
    "CHF",
    "CNY",
    "SEK",
    "NZD",
    "HKD",
    "SGD",
    "NOK",
    "KRW",
    "TRY",
    "RUB",
    "INR",
    "BRL",
    "MXN",
    "ZAR",
  ];

  const [amount, setAmount] = useState(1);
  const [fromCurrency, setFromCurrency] = useState("USD");
  const [toCurrency, setToCurrency] = useState("EUR");
  const [convertedAmount, setConvertedAmount] = useState(null);
  const [exchangeRate, setExchangeRate] = useState(null);
  const [loader, setLodaer] = useState(false);
  useEffect(() => {
    // This effect triggers whenever fromCurrency or toCurrency changes
    // It clears the convertedAmount and exchangeRate if either changes
    setConvertedAmount(null);
    setExchangeRate(null);
  }, [fromCurrency, toCurrency]);
  async function handleConverter() {
    try {
      setLodaer(true);
      let data = {
        baseCurrency: fromCurrency,
        targetCurrency: toCurrency,
        value: amount,
      };

      const response = await axios.post(
        "http://localhost:3000/api/v1/converter",
        data
      );
      const responseData = response.data.data;
      setConvertedAmount(responseData.conversion_result);
      setExchangeRate(responseData.conversion_rate);
      setLodaer(false);
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <div className="p-4 bg-white rounded shadow-md">
      <div className="mb-4">
        <label
          htmlFor="amount"
          className="block text-sm font-medium text-gray-700"
        >
          Amount
        </label>
        <input
          type="number"
          id="amount"
          value={amount}
          onChange={(e) => {
            setAmount(e.target.value);
          }}
          className="mt-1 p-2 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
        />
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium text-gray-700">
            From
          </label>

          <select
            value={fromCurrency}
            onChange={(e) => {
              setFromCurrency(e.target.value);
            }}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
          >
            {popularCurrencyCodes.map((code) => (
              <option key={code} value={code}>
                {code}
              </option>
            ))}
          </select>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">To</label>
          <select
            value={toCurrency}
            onChange={(e) => setToCurrency(e.target.value)}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
          >
            {popularCurrencyCodes
              .filter((code) => code !== fromCurrency)
              .map((code) => (
                <option key={code} value={code}>
                  {code}
                </option>
              ))}
          </select>
        </div>
      </div>
      <center>
        <div className=" flex items-center justify-center mt-10 border-2 rounded-full bg-blue-400 hover:bg-blue-200 cursor-pointer w-[160px] p-1">
          <button onClick={handleConverter}>
            {loader ? "......." : "Convert"}
          </button>
        </div>
      </center>

      {convertedAmount && (
        <div className="mt-4 text-center text-lg font-semibold">
          {amount} {fromCurrency} = {convertedAmount} {toCurrency}
          {exchangeRate && (
            <span className="block text-sm text-gray-500">
              (1 {fromCurrency} = {exchangeRate} {toCurrency})
            </span>
          )}
        </div>
      )}
    </div>
  );
}
