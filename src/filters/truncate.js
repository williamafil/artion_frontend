export default (value, num) => {
  // If the length of str is less than or equal to num
  // just return str--don't truncate it.
  if (value.length <= num) {
    return value;
  }
  // Return str truncated with '...' concatenated to the end of str.
  return `${value.slice(0, num)}...`;
};
