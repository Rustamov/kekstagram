import { isEscapeKey, isEnterKey, showAlert } from './util.js';
import { setPictureStyles } from './picture-edit.js';
import { sendData } from './api.js';

const uploadInputNode = document.querySelector('#upload-file');
const uploadModal = document.querySelector('.img-upload__overlay');
const buttonCloseUploadModalNode = document.querySelector('.img-upload__cancel');
const pictureNode = document.querySelector('.img-upload__preview img');


const formNode = document.querySelector('.img-upload__form');
const submitButtonNode = document.querySelector('.img-upload__submit');
const inputHashtagsNode = formNode.querySelector('.text__hashtags');
const inputDescriptionNode = formNode.querySelector('.text__description');

const FILE_TYPES = ['gif', 'jpg', 'jpeg', 'png', 'webp'];


// Validation
const pristine = new Pristine(formNode, {
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
  inputHashtagsNode,
  validateTags,
  'Неправильно заполнены хэштеги'
);


const showUploadModal = () => {
  setPictureStyles();

  uploadModal.classList.remove('hidden');
  document.body.classList.add('modal-open');

  document.addEventListener('keydown', onPopupEscKeydown);
};

const closeUploadModal = () => {
  uploadModal.classList.add('hidden');
  document.body.classList.remove('modal-open');

  formNode.reset();
  pristine.reset();
  document.removeEventListener('keydown', onPopupEscKeydown);
};

function onPopupEscKeydown(evt) {
  if (isEscapeKey(evt)) {
    evt.preventDefault();
    closeUploadModal();
  }
}

buttonCloseUploadModalNode.addEventListener('click', () => {
  closeUploadModal();
});

buttonCloseUploadModalNode.addEventListener('keydown', (evt) => {
  if (isEnterKey(evt)) {
    closeUploadModal();
  }
});

uploadInputNode.addEventListener('change', () => {
  const file = uploadInputNode.files[0];
  const fileName = file.name.toLowerCase();

  const matches = FILE_TYPES.some((it) => fileName.endsWith(it));

  if (matches) {
    pictureNode.src = URL.createObjectURL(file);
    showUploadModal();
  } else {
    showAlert('Выберите подходящюю картинку');
  }
});

inputHashtagsNode.addEventListener('keydown', (evt) => {
  evt.stopPropagation();
});
inputDescriptionNode.addEventListener('keydown', (evt) => {
  evt.stopPropagation();
});


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

function closeLoadSuccessMsg() {
  if (document.querySelector('.success')) {
    document.querySelector('.success').remove();
    document.body.classList.remove('modal-open');

    document.removeEventListener('keydown', onLoadSuccessEscKeydown);
  }
}
function onLoadSuccessEscKeydown(evt) {
  if (isEscapeKey(evt)) {
    closeLoadSuccessMsg();
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

function closeLoadErrorMsg() {
  if (document.querySelector('.error')) {
    document.querySelector('.error').remove();
    document.body.classList.remove('modal-open');

    document.removeEventListener('keydown', onLoadErrorEscKeydown);
  }
}

function onLoadErrorEscKeydown(evt) {
  if (isEscapeKey(evt)) {
    closeLoadErrorMsg();
  }
}

const blockSubmitButton = () => {
  submitButtonNode.disabled = true;
  submitButtonNode.textContent = 'Публикую...';
};

const unblockSubmitButton = () => {
  submitButtonNode.disabled = false;
  submitButtonNode.textContent = 'Опубликовать';
};

const setPictureFormSubmit = () => {
  formNode.addEventListener('submit', (evt) => {
    evt.preventDefault();

    const isValid = pristine.validate();
    if (isValid) {
      blockSubmitButton();
      sendData(
        () => {
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

