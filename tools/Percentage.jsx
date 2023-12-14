const Percentage = (value, maxValue) => {
  // console.log("Value: ", value, " MAxValue: ", maxValue)
  // console.log("result: ", value, " MAxValue: ", maxValue)
  return (value * 100) / maxValue;
};
export const PercentageOf = (value, percent) => {
  // console.log("Value: ", value, " MAxValue: ", maxValue)
  // console.log("result: ", value, " MAxValue: ", maxValue)
  return (percent / 100) * value;
};

export default Percentage;
