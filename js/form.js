import { isEscapeKey, isEnterKey } from './util.js';
import { setPictureStyles } from './picture-edit.js';
import { sendData } from './api.js';

const uploadInput = document.querySelector('#upload-file');
const uploadModal = document.querySelector('.img-upload__overlay');
const buttonCloseUploadModal = document.querySelector('.img-upload__cancel');

const form = document.querySelector('.img-upload__form');
const submitButton = document.querySelector('.img-upload__submit');
const inputHashtags = form.querySelector('.text__hashtags');
const inputDescription = form.querySelector('.text__description');

const showUploadModal = () => {
  setPictureStyles();

  uploadModal.classList.remove('hidden');
  document.body.classList.add('modal-open');

  document.addEventListener('keydown', onPopupEscKeydown);
};

const closeUploadModal = () => {
  uploadModal.classList.add('hidden');
  document.body.classList.remove('modal-open');

  form.reset();
  pristine.reset();
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


function onLoadSuccessEscKeydown(evt) {
  if (isEscapeKey(evt)) {
    closeLoadSuccessMsg();
  }
}

const showLoadSuccessMsg = () => {
  const messageTemplateFragment = document.querySelector('#success').content;
  const messageTemplate = messageTemplateFragment.querySelector('.success');

  const messageEl = messageTemplate.cloneNode(true);

  document.body.appendChild(messageEl);
  document.body.classList.add('modal-open');

  messageEl.querySelector('.success__inner').addEventListener('click', (evt) => {
    evt.stopPropagation();
  });
  messageEl.addEventListener('click', () => {
    closeLoadSuccessMsg();
  });
  messageEl.querySelector('.success__button').addEventListener('click', () => {
    closeLoadSuccessMsg();
  });

  document.addEventListener('keydown', onLoadSuccessEscKeydown);
};

const closeLoadSuccessMsg = () => {
  if (document.querySelector('.success')) {
    document.querySelector('.success').remove();
    document.body.classList.remove('modal-open');

    document.removeEventListener('keydown', onLoadSuccessEscKeydown);
  }
};


function onLoadErrorEscKeydown(evt) {
  if (isEscapeKey(evt)) {
    closeLoadErrorMsg();
  }
}

const showLoadErrorMsg = () => {
  const messageTemplateFragment = document.querySelector('#error').content;
  const messageTemplate = messageTemplateFragment.querySelector('.error');

  const messageEl = messageTemplate.cloneNode(true);

  document.body.appendChild(messageEl);
  document.body.classList.add('modal-open');

  messageEl.querySelector('.error__inner').addEventListener('click', (evt) => {
    evt.stopPropagation();
  });
  messageEl.addEventListener('click', () => {
    closeLoadErrorMsg();
  });
  messageEl.querySelector('.error__button').addEventListener('click', () => {
    closeLoadErrorMsg();
  });

  document.addEventListener('keydown', onLoadErrorEscKeydown);
};

const closeLoadErrorMsg = () => {
  if (document.querySelector('.error')) {
    document.querySelector('.error').remove();
    document.body.classList.remove('modal-open');

    document.removeEventListener('keydown', onLoadErrorEscKeydown);
  }
};

const blockSubmitButton = () => {
  submitButton.disabled = true;
  submitButton.textContent = 'Публикую...';
};

const unblockSubmitButton = () => {
  submitButton.disabled = false;
  submitButton.textContent = 'Опубликовать';
};

const setPictureFormSubmit = (onSuccess) => {
  form.addEventListener('submit', (evt) => {
    evt.preventDefault();

    const isValid = pristine.validate();
    if (isValid) {
      blockSubmitButton();
      sendData(
        () => {
          onSuccess();
          showLoadSuccessMsg();
          unblockSubmitButton();
          closeUploadModal();
        },
        () => {
          showLoadErrorMsg();
          unblockSubmitButton();
          closeUploadModal();
        },
        new FormData(evt.target),
      );
    } else {
      showAlert('Заполните форму!');
    }
  });
};

export { setPictureFormSubmit, closeUploadModal };

