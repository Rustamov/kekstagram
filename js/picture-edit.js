import { throttle } from './util.js';

const picture = document.querySelector('.img-upload__preview img');
const inputPictureScale = document.querySelector('.scale__control--value');
const buttonPictureScaleMinus = document.querySelector('.scale__control--smaller');
const buttonPictureScalePlus = document.querySelector('.scale__control--bigger');

const sliderElement = document.querySelector('.effect-level__slider');
const sliderValueElement = document.querySelector('.effect-level__value');


const cutPercentChar = (str) =>
  str.slice(0, str.length - 1);

const setPictureStyles = throttle(() => {
  const effect = document.querySelector('.effects__list input[type="radio"]:checked').value;
  const effectValue = sliderValueElement.value;

  console.log(effectValue);

  document.querySelector('.img-upload__effect-level').classList.toggle('hidden', effect === 'none');

  const scale = Number(parseFloat(inputPictureScale.value)) / 100;
  picture.style.transform = `scale(${scale})`;

  let filter = '';
  switch (effect) {
    case 'none':
      filter = 'none';
      break;

    case 'chrome':
      filter = `grayscale(${effectValue})`;
      break;

    case 'sepia':
      filter = `sepia(${effectValue})`;
      break;

    case 'marvin':
      filter = `invert(${effectValue}%)`;
      break;

    case 'phobos':
      filter = `blur(${effectValue}px)`;
      break;

    case 'heat':
      filter = `brightness(${effectValue})`;
      break;
  }

  picture.style.filter = filter;
}, 50);

buttonPictureScaleMinus.addEventListener('click', () => {
  let currentValue = Number(cutPercentChar(inputPictureScale.value));

  if (currentValue > 25) {
    currentValue -= 25;
  }

  inputPictureScale.value = `${currentValue}%`;
  inputPictureScale.dispatchEvent(new Event('change', { 'bubbles': true }));
});

buttonPictureScalePlus.addEventListener('click', () => {
  let currentValue = Number(cutPercentChar(inputPictureScale.value));

  if (currentValue < 100) {
    currentValue += 25;
  }

  inputPictureScale.value = `${currentValue}%`;
  inputPictureScale.dispatchEvent(new Event('change', { 'bubbles': true }));
});

inputPictureScale.addEventListener('change', (evt) => {
  let currentValue = Number(cutPercentChar(evt.target.value));

  if (currentValue > 100) {
    currentValue = 100;
    inputPictureScale.value = `${currentValue}%`;

  }
  if (currentValue < 25) {
    currentValue = 25;
    inputPictureScale.value = `${currentValue}%`;
  }

  setPictureStyles();
});



function createSlider() {
  noUiSlider.create(sliderElement, getSliderProps());

  const effect = document.querySelector('.effects__list input[type="radio"]:checked').value;
  updateSlider(effect);
};
createSlider();

function getSliderProps(props) {
  let result;
  const defProps = {
    range: {
      min: 0,
      max: 100,
    },
    start: 100,
    step: 1,
    connect: 'lower',
    format: {
      to: function (value) {
        if (Number.isInteger(value)) {
          return value.toFixed(0);
        }
        return value.toFixed(1);
      },
      from: function (value) {
        return parseFloat(value);
      },
    },
  };

  result = {...defProps, ...props};

  return result;
}

sliderElement.noUiSlider.on('update', () => {
  sliderValueElement.value = sliderElement.noUiSlider.get();
  setPictureStyles();
});

function updateSlider(effect = 'none') {
  switch (effect) {
    case 'none':
      break;

    case 'chrome':
    case 'sepia':
      sliderElement.noUiSlider.updateOptions({
        range: {
          min: 0,
          max: 1,
        },
        step: 0.1,
      });
      sliderElement.noUiSlider.set(1);
      break;

    case 'marvin':
      sliderElement.noUiSlider.updateOptions({
        range: {
          min: 0,
          max: 100,
        },
        step: 1,
      });
      sliderElement.noUiSlider.set(100);
      break;

    case 'phobos':
    case 'heat':
      sliderElement.noUiSlider.updateOptions({
        range: {
          min: 0,
          max: 3,
        },
        step: 0.1,
      });
      sliderElement.noUiSlider.set(3);
      break;
  }
};

const onEffectChange = (evt) => {
  const currentEffect = evt.target.value;
  updateSlider(currentEffect);
  setPictureStyles();

  document.querySelectorAll('.effects__list input[type="radio"]').forEach((input) => {
    const effect = input.value;
    const className = `effects__preview--${effect}`;

    picture.classList.toggle(className, currentEffect === effect);
  });
};



document.querySelector('.effects__list').addEventListener('change', (evt) => {
  onEffectChange(evt);
});



export { setPictureStyles };
