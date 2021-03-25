const classFromIncrement = increment => {
  if (increment > 0) {
    return "positive";
  } else if (increment === 0) {
    return "neutral";
  } else {
    return "negative";
  }
};

export default classFromIncrement;
