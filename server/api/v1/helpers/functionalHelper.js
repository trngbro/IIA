const truncateText = function (str, maxLen) {
  if (str.length > maxLen) {
    return str.substring(0, maxLen) + '...';
  }
  return str;
}

module.exports = truncateText;