import { isEscapeKey, isEnterKey } from './util.js';

const uploadInput = document.querySelector('#upload-file');
const uploadModal = document.querySelector('.img-upload__overlay');
const buttonCloseUploadModal = document.querySelector('.img-upload__cancel');

const form = document.querySelector('.img-upload__form');
const inputHashtags = form.querySelector('.text__hashtags');
const inputDescription = form.querySelector('.text__description');

const showUploadModal = () => {
  uploadModal.classList.remove('hidden');
  document.body.classList.add('modal-open');

  document.addEventListener('keydown', onPopupEscKeydown);
};

showUploadModal();

const closeUploadModal = () => {
  uploadModal.classList.add('hidden');
  document.body.classList.remove('modal-open');

  form.reset();
  document.removeEventListener('keydown', onPopupEscKeydown);
};

function onPopupEscKeydown(evt) {
  if (isEscapeKey(evt)) {
    evt.preventDefault();
    closeUploadModal();
  }
}

buttonCloseUploadModal.addEventListener('click', () => {
  closeUploadModal();
});

buttonCloseUploadModal.addEventListener('keydown', (evt) => {
  if (isEnterKey(evt)) {
    closeUploadModal();
  }
});

uploadInput.addEventListener('change', () => {
  showUploadModal();
});

inputHashtags.addEventListener('keydown', (evt) => {
  evt.stopPropagation();
});
inputDescription.addEventListener('keydown', (evt) => {
  evt.stopPropagation();
});


// Validation
// const pristine = new Pristine(form, {
//   classTo: 'img-upload__element',
//   errorClass: 'img-upload__item--invalid',
//   successClass: 'img-upload__item--valid',
//   errorTextParent: 'img-upload__element',
//   errorTextTag: 'span',
//   errorTextClass: 'img-upload__error',
// });

const pristine = new Pristine(form, {
  classTo: 'img-upload__element',
  errorTextParent: 'img-upload__element',
  errorTextClass: 'img-upload__error',
});

const validateTags = (value) => {
  if (value.length === 0) {
    return true;
  }

  const hashtagRegx = /^#[A-Za-zА-Яа-яЕё0-9]{1,19}$/;

  const hashtags = value.split(' ');

  if (hashtags.length > 5) {
    return false;
  }

  return hashtags.every((hashtag) =>
    hashtagRegx.test(hashtag)
  );
};

pristine.addValidator(
  inputHashtags,
  validateTags,
  'Неправильно заполнены хэштеги'
);

form.addEventListener('submit', (evt) => {
  const isValid = pristine.validate();

  if (!isValid) {
    evt.preventDefault();
  }
});

