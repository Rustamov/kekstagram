const getRandomPositiveInteger = (a, b) => {
  const lower = Math.ceil(Math.min(Math.abs(a), Math.abs(b)));
  const upper = Math.floor(Math.max(Math.abs(a), Math.abs(b)));

  const result = Math.random() * (upper - lower + 1) + lower;

  return Math.floor(result);
};

const checkStringLength = (string, length) =>
  string.length <= length;


const isEscapeKey = (evt) =>
  evt.key === 'Escape';


const isEnterKey = (evt) =>
  evt.key === 'Enter';

const makeCounter = () => {
  let count = 0;

  return () =>
    ++count;
};

const throttle = (func, ms) => {

  let isThrottled = false,
    savedArgs,
    savedThis;

  function wrapper() {

    if (isThrottled) { // (2)
      savedArgs = arguments;
      savedThis = this;
      return;
    }

    func.apply(this, arguments); // (1)

    isThrottled = true;

    setTimeout(() => {
      isThrottled = false; // (3)
      if (savedArgs) {
        wrapper.apply(savedThis, savedArgs);
        savedArgs = savedThis = null;
      }
    }, ms);
  }

  return wrapper;
};

export { getRandomPositiveInteger, checkStringLength, isEscapeKey, isEnterKey, makeCounter, throttle };
