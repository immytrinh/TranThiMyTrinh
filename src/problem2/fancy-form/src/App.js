import "./App.css";
import { useState, useEffect } from "react";
import CurrencyInput from "./components/CurrencyInput";

function App() {
  const [prices, setPrices] = useState([]);
  const [inputAmount, setInputAmount] = useState(0);
  const [outputAmount, setOutputAmount] = useState(0);
  const [inputCurrency, setInputCurrency] = useState("");
  const [outputCurrency, setOutputCurrency] = useState("");

  useEffect(() => {
    fetch("https://interview.switcheo.com/prices.json")
      .then((response) => response.json())
      .then((data) => {
        data.sort((a, b) => a.currency.localeCompare(b.currency));
        setPrices(data);
        if (data.length > 0) {
          setInputCurrency(data[7].currency);
          setOutputCurrency(data[5].currency);
        }
      });
  }, []);

  useEffect(() => {
    calculateOutputAmount(inputAmount);
  }, [inputAmount, outputCurrency]);

  useEffect(() => {
    calculateInputAmount(outputAmount);
  }, [outputAmount, inputCurrency]);

  const calculateOutputAmount = (amount) => {
    const inputPrice =
      prices.find((price) => price.currency === inputCurrency)?.price || 1;
    const outputPrice =
      prices.find((price) => price.currency === outputCurrency)?.price || 1;
    const result = (amount * inputPrice) / outputPrice;
    setOutputAmount(result);
  };

  const calculateInputAmount = (amount) => {
    const inputPrice =
      prices.find((price) => price.currency === inputCurrency)?.price || 1;
    const outputPrice =
      prices.find((price) => price.currency === outputCurrency)?.price || 1;
    const result = (amount * outputPrice) / inputPrice;
    setInputAmount(result);
  };

  return (
    <div className="flex min-h-full flex-1 flex-col justify-center items-center px-6 py-12 lg:px-8">
      <h2 className="text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">
        Currency Swap
      </h2>
      <div className="mt-10 grid sm:grid-cols-2 gap-4 w-3/4">
        <div className="">
          <label
            htmlFor="input-amount"
            className="block text-sm font-medium leading-6 text-gray-900"
          >
            Amount to send
          </label>
          <CurrencyInput
            amount={inputAmount}
            onAmountChange={setInputAmount}
            onCurrencyChange={setInputCurrency}
            currency={inputCurrency}
            prices={prices}
          />
        </div>
        <div className="">
          <label
            htmlFor="output-amount"
            className="block text-sm font-medium leading-6 text-gray-900"
          >
            Amount to receive
          </label>
          <CurrencyInput
            amount={outputAmount}
            onAmountChange={setOutputAmount}
            onCurrencyChange={setOutputCurrency}
            currency={outputCurrency}
            prices={prices}
          />
        </div>
      </div>
    </div>
  );
}

export default App;
