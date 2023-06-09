const phrase = 'tenet';
const maxSymbols = 3;

const validStr = function (str, maxLength) {
  if (str.length <= maxLength) {
    return true;
  }
  return false;
};
validStr (phrase, maxSymbols);


const palindrome = function (str) {
  str = str.toLowerCase().replace(/[^а-яa-z1-9]/gi,'');
  const lastIndex = str.length - 1;
  for (let i = 0; i < str.length / 2; i++) {
    if (str[i] !== str[lastIndex - i]) {
      return false;
    }
  }
  return true;
};
palindrome (phrase);
