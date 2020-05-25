const appendPx = (value) =>
  isFinite(value) && !isNaN(parseFloat(value)) ? `${value}px` : value;

export default appendPx;
