const ALERT_SHOW_TIME = 5000;

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
    if (isThrottled) {
      savedArgs = arguments;
      savedThis = this;
      return;
    }

    func.apply(this, arguments);

    isThrottled = true;

    setTimeout(() => {
      isThrottled = false;
      if (savedArgs) {
        wrapper.apply(savedThis, savedArgs);
        savedArgs = savedThis = null;
      }
    }, ms);
  }

  return wrapper;
};

// function throttle(func, timeFrame) {
//   var lastTime = 0;
//   return function (...args) {
//     var now = new Date();
//     console.log();
//     if (now - lastTime >= timeFrame) {
//       func(...args);
//       lastTime = now;
//     }
//   };
// }



const showAlert = (message) => {
  const alertContainer = document.createElement('div');
  alertContainer.style.zIndex = 100;
  alertContainer.style.position = 'absolute';
  alertContainer.style.left = 0;
  alertContainer.style.top = 0;
  alertContainer.style.right = 0;
  alertContainer.style.padding = '10px 3px';
  alertContainer.style.fontSize = '30px';
  alertContainer.style.textAlign = 'center';
  alertContainer.style.backgroundColor = 'red';

  alertContainer.textContent = message;

  document.body.append(alertContainer);

  setTimeout(() => {
    alertContainer.remove();
  }, ALERT_SHOW_TIME);
}


export {
  getRandomPositiveInteger,
  checkStringLength,
  isEscapeKey,
  isEnterKey,
  makeCounter,
  throttle,
  showAlert,
};
