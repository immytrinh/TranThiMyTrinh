import {
  Menu,
  MenuButton,
  MenuItems,
  MenuItem,
  Transition,
} from "@headlessui/react";
import { ChevronDownIcon } from "@heroicons/react/20/solid";
import CurrencyIcon from "./CurrencyIcon";
import { Fragment } from "react";

function classNames(...classes) {
  return classes.filter(Boolean).join(" ");
}

function CurrencyInput({
  amount,
  onAmountChange,
  onCurrencyChange,
  currency,
  prices,
}) {
  const handleAmountChange = (e) => {
    onAmountChange(parseFloat(e.target.value));
  };

  return (
    <div className="relative rounded-md shadow-sm mt-2">
      <input
        type="number"
        min="0"
        value={amount}
        onChange={handleAmountChange}
        className="pl-2 placeholder:text-lg block w-full h-10 text-lg rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
      />
      <div className="absolute inset-y-0 right-0 flex items-center">
        <label className="sr-only">Currency</label>
        <Menu as="div" className="relative inline-block text-left">
          <div>
            <MenuButton className="inline-flex w-full justify-center gap-x-1.5 rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50">
              <CurrencyIcon currency={currency} />
              {currency}
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
            <MenuItems className="overflow-y-auto max-h-80 absolute right-0 z-10 mt-2 w-48 origin-top-right rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
              <div className="py-1">
                {prices.map((value, index) => (
                  <MenuItem key={index}>
                    {({ active }) => (
                      <div
                        className="flex items-center space-x-4 p-2 hover:bg-gray-100 cursor-pointer pl-4"
                        onClick={() => onCurrencyChange(value.currency)}
                      >
                        <CurrencyIcon currency={value.currency} />
                        <div
                          className={classNames(
                            active
                              ? "text-gray-900 font-medium"
                              : "text-gray-700",
                            "text-sm"
                          )}
                        >
                          {value.currency}
                        </div>
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
  );
}

export default CurrencyInput;
