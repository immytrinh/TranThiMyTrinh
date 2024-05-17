import "./App.css";
import { useState, useEffect } from "react";
import { Fragment } from "react";
import {
  Menu,
  MenuButton,
  MenuItems,
  MenuItem,
  Transition,
} from "@headlessui/react";
import { ChevronDownIcon } from "@heroicons/react/20/solid";

function classNames(...classes) {
  return classes.filter(Boolean).join(" ");
}

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

  const handleInputAmountChange = (e) => {
    setInputAmount(e.target.value);
    calculateOutputAmount(e.target.value);
  };

  const handleOutputAmountChange = (e) => {
    setOutputAmount(e.target.value);
    calculateInputAmount(e.target.value);
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
          <div className="relative rounded-md shadow-sm mt-2">
            <input
              id="input-amount"
              type="number"
              min="0"
              value={inputAmount}
              onChange={handleInputAmountChange}
              className="pl-2 block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
            />
            <div className="absolute inset-y-0 right-0 flex items-center">
              <label htmlFor="input-currency" className="sr-only">
                Currency
              </label>
              <Menu as="div" className="relative inline-block text-left">
                <div>
                  <MenuButton className="inline-flex w-full justify-center gap-x-1.5 rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50">
                    {inputCurrency}
                    <ChevronDownIcon
                      className="-mr-1 h-5 w-5 text-gray-400"
                      aria-hidden="true"
                    />
                  </MenuButton>
                </div>

                <Transition
                  as={Fragment}
                  enter="transition ease-out duration-100"
                  enterFrom="transform opacity-0 scale-95"
                  enterTo="transform opacity-100 scale-100"
                  leave="transition ease-in duration-75"
                  leaveFrom="transform opacity-100 scale-100"
                  leaveTo="transform opacity-0 scale-95"
                >
                  <MenuItems className="overflow-y-auto max-h-80 absolute right-0 z-10 mt-2 w-56 origin-top-right rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
                    <div className="py-1">
                      {prices.map((value, index) => (
                        <MenuItem key={index}>
                          {({ active }) => (
                            <div
                              onClick={() => setInputCurrency(value.currency)}
                              className={classNames(
                                active
                                  ? "bg-gray-100 text-gray-900"
                                  : "text-gray-700",
                                "block px-4 py-2 text-sm"
                              )}
                            >
                              {value.currency}
                            </div>
                          )}
                        </MenuItem>
                      ))}
                    </div>
                  </MenuItems>
                </Transition>
              </Menu>
            </div>
          </div>
        </div>
        <div className="">
          <label
            htmlFor="output-amount"
            className="block text-sm font-medium leading-6 text-gray-900"
          >
            Amount to receive
          </label>
          <div className="relative rounded-md shadow-sm mt-2">
            <input
              id="output-amount"
              type="number"
              min="0"
              value={outputAmount}
              onChange={handleOutputAmountChange}
              className="pl-2 block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
            />
            <div className="absolute inset-y-0 right-0 flex items-center">
              <label htmlFor="output-currency" className="sr-only">
                Currency
              </label>
              <Menu as="div" className="relative inline-block text-left">
                <div>
                  <MenuButton className="inline-flex w-full justify-center gap-x-1.5 rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50">
                    {outputCurrency}
                    <ChevronDownIcon
                      className="-mr-1 h-5 w-5 text-gray-400"
                      aria-hidden="true"
                    />
                  </MenuButton>
                </div>

                <Transition
                  as={Fragment}
                  enter="transition ease-out duration-100"
                  enterFrom="transform opacity-0 scale-95"
                  enterTo="transform opacity-100 scale-100"
                  leave="transition ease-in duration-75"
                  leaveFrom="transform opacity-100 scale-100"
                  leaveTo="transform opacity-0 scale-95"
                >
                  <MenuItems className="overflow-y-auto max-h-80 absolute right-0 z-10 mt-2 w-56 origin-top-right rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
                    <div className="py-1">
                      {prices.map((value, index) => (
                        <MenuItem key={index}>
                          {({ active }) => (
                            <div
                              onClick={() => setOutputCurrency(value.currency)}
                              className={classNames(
                                active
                                  ? "bg-gray-100 text-gray-900"
                                  : "text-gray-700",
                                "block px-4 py-2 text-sm"
                              )}
                            >
                              {value.currency}
                            </div>
                          )}
                        </MenuItem>
                      ))}
                    </div>
                  </MenuItems>
                </Transition>
              </Menu>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
