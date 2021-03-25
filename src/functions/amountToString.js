/** Converts goal amount from number to string */
const convertions = {
  "100": "100",
  "500": "500",
  "1000": "1K",
  "2000": "2K",
  "5000": "5K",
  "10000": "10K"
};

const amountToString = amount => {
  return convertions[String(amount)];
};

module.exports = amountToString;
