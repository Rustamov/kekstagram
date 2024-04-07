import { throttle } from './util.js';

const pictureNode = document.querySelector('.img-upload__preview img');
const inputPictureScaleNode = document.querySelector('.scale__control--value');
const buttonPictureScaleMinusNode = document.querySelector('.scale__control--smaller');
const buttonPictureScalePlusNode = document.querySelector('.scale__control--bigger');

const sliderNode = document.querySelector('.effect-level__slider');
const sliderValueNode = document.querySelector('.effect-level__value');


const cutPercentChar = (str) =>
  str.slice(0, str.length - 1);

const setPictureStyles = throttle(() => {
  const effect = document.querySelector('.effects__list input[type="radio"]:checked').value;
  const effectValue = sliderValueNode.value;

  document.querySelector('.img-upload__effect-level').classList.toggle('hidden', effect === 'none');

  const scale = Number(parseFloat(inputPictureScaleNode.value)) / 100;
  pictureNode.style.transform = `scale(${scale})`;

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

  pictureNode.style.filter = filter;
}, 50);

buttonPictureScaleMinusNode.addEventListener('click', () => {
  let currentValue = Number(cutPercentChar(inputPictureScaleNode.value));

  if (currentValue > 25) {
    currentValue -= 25;
  }

  inputPictureScaleNode.value = `${currentValue}%`;
  inputPictureScaleNode.dispatchEvent(new Event('change', { 'bubbles': true }));
});

buttonPictureScalePlusNode.addEventListener('click', () => {
  let currentValue = Number(cutPercentChar(inputPictureScaleNode.value));

  if (currentValue < 100) {
    currentValue += 25;
  }

  inputPictureScaleNode.value = `${currentValue}%`;
  inputPictureScaleNode.dispatchEvent(new Event('change', { 'bubbles': true }));
});

inputPictureScaleNode.addEventListener('change', (evt) => {
  let currentValue = Number(cutPercentChar(evt.target.value));

  if (currentValue > 100) {
    currentValue = 100;
    inputPictureScaleNode.value = `${currentValue}%`;

  }
  if (currentValue < 25) {
    currentValue = 25;
    inputPictureScaleNode.value = `${currentValue}%`;
  }

  setPictureStyles();
});


function createSlider() {
  noUiSlider.create(sliderNode, getSliderProps());

  const effect = document.querySelector('.effects__list input[type="radio"]:checked').value;
  updateSlider(effect);
}
createSlider();

function getSliderProps(props) {
  let result = props;
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

sliderNode.noUiSlider.on('update', () => {
  sliderValueNode.value = sliderNode.noUiSlider.get();
  setPictureStyles();
});

function updateSlider(effect = 'none') {
  switch (effect) {
    case 'none':
      break;

    case 'chrome':
    case 'sepia':
      sliderNode.noUiSlider.updateOptions({
        range: {
          min: 0,
          max: 1,
        },
        step: 0.1,
      });
      sliderNode.noUiSlider.set(1);
      break;

    case 'marvin':
      sliderNode.noUiSlider.updateOptions({
        range: {
          min: 0,
          max: 100,
        },
        step: 1,
      });
      sliderNode.noUiSlider.set(100);
      break;

    case 'phobos':
    case 'heat':
      sliderNode.noUiSlider.updateOptions({
        range: {
          min: 0,
          max: 3,
        },
        step: 0.1,
      });
      sliderNode.noUiSlider.set(3);
      break;
  }
}

const onEffectChange = (evt) => {
  const currentEffect = evt.target.value;
  updateSlider(currentEffect);
  setPictureStyles();

  document.querySelectorAll('.effects__list input[type="radio"]').forEach((input) => {
    const effect = input.value;
    const className = `effects__preview--${effect}`;

    pictureNode.classList.toggle(className, currentEffect === effect);
  });
};


document.querySelector('.effects__list').addEventListener('change', (evt) => {
  onEffectChange(evt);
});


export { setPictureStyles };
