const Percentage = (value, maxValue) => {
  return (value * 100) / maxValue;
};
export const PercentageOf = (value, percent) => {
  let result = (percent / 100) * value;

  return result;
};

export default Percentage;
