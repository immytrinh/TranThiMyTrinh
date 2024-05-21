import React from 'react';
import noImage from "../assets/photo.png";

const CurrencyIcon = ({ currency }) => {
  try {
    const icon = require(`../assets/token-icons/${currency}.svg`);
    return <img src={icon.default} alt={currency} className='w-6 h-6'/>;
  } catch (error) {
    return <img src={noImage} alt={currency} className='w-6 h-6 rounded-full'/>;
  }
};

export default CurrencyIcon;
