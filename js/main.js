function getRandomNumber(min, max) {
  const minCeiled = Math.ceil(min);
  const maxFloored = Math.floor(max);
  return Math.floor(Math.random() * (maxFloored - minCeiled + 1) + minCeiled);
}

function isStringLimited(str, maxLength) {
  if (str.length <= maxLength) { return true; }

  return false;
}

getRandomNumber(1, 10);
isStringLimited('Some text!', 10);
