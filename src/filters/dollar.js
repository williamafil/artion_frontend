export const dollarSign = (value) => `$ ${value}`;

export const thousandSeparator = (value) => value.toLocaleString('en-US');

// export default (value) => {
//   return value.toString().replace(/\B(?<!\.\d*)(?=(\d{3})+(?!\d))/g, ',');
// };
