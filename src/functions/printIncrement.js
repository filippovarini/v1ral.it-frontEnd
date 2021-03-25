const printIncrement = (increment, perc) => {
  const sign = Math.sign(increment) < 0 ? "-" : "+";
  return `${sign}${Math.abs(increment)}${perc ? "%" : ""} rispetto a ieri`;
};

export default printIncrement;
