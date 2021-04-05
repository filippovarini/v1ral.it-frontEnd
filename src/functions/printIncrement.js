const printIncrement = (increment, perc) => {
  const sign = Math.sign(increment) < 0 ? "-" : "+";
  return `${sign}${Math.abs(increment)}${perc ? "%" : ""}`;
};

export default printIncrement;
