const phrase = 'tenet';
const maxSymbols = 3;

const isValidStr = function (str, maxLength) {
  return (str.length <= maxLength);
};
isValidStr (phrase, maxSymbols);


const isPalindrome = function (str) {
  str = str.toLowerCase().replaceAll(' ', '');
  //(/[^а-яa-z1-9]/gi,'');
  const lastIndex = str.length - 1;
  for (let i = 0; i < str.length / 2; i++) {
    if (str[i] !== str[lastIndex - i]) {
      return false;
    }
  }
  return true;
};
isPalindrome (phrase);
