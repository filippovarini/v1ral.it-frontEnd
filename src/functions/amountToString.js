/** Converts goal amount from number to string */
const convertions = {
  "100": "100",
  "500": "500",
  "1000": "1k",
  "2000": "2k",
  "5000": "5k",
  "10000": "10k"
};

const amountToString = amount => {
  return convertions[String(amount)];
};

module.exports = amountToString;
