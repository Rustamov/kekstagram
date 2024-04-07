import { isEscapeKey } from './util.js';

const bigPicture = document.querySelector('.big-picture');
const closeButton = bigPicture.querySelector('.big-picture__cancel');
const loadCommentsButton = bigPicture.querySelector('.social__comments-loader');

const commentTemplateFragment = document.querySelector('#social-comment').content;
const commentTemplate = commentTemplateFragment.querySelector('.social__comment');

const commentsListElement = document.querySelector('.social__comments');


let restComments = [];
const showedComments = [];


const getSocialСomments = (comments) => {
  const commentsListFragment = document.createDocumentFragment();

  comments.forEach(({ avatar, message, name }) => {
    const commentEl = commentTemplate.cloneNode(true);

    commentEl.querySelector('.social__picture').setAttribute('src', avatar);
    commentEl.querySelector('.social__picture').setAttribute('alt', name);
    commentEl.querySelector('.social__text').textContent = message;

    commentsListFragment.appendChild(commentEl);
  });

  return commentsListFragment;
};

const closePopup = () => {
  if (document.body.classList.contains('modal-open')) {
    bigPicture.classList.add('hidden');
    document.body.classList.remove('modal-open');

    document.removeEventListener('keydown', onPopupEscKeydown);
  }
};

const loadComments = () => {
  const prevShowedCommentsIndex = showedComments.length;

  for (let i = 0; i < 5; i++) {
    showedComments.push(restComments.shift());
    if (restComments.length === 0) {
      break;
    }
  }

  if (restComments.length > 0) {
    bigPicture.querySelector('.comments-loader').classList.remove('hidden');
  } else {
    bigPicture.querySelector('.comments-loader').classList.add('hidden');
  }

  bigPicture.querySelector('.comments-showed-count').textContent = showedComments.length;
  commentsListElement.append(getSocialСomments(showedComments.slice(prevShowedCommentsIndex)));
};

window.addEventListener('keydown', (evt) => {
  if (evt.keyCode === 27) {
    closePopup();
  }
});

function onPopupEscKeydown(evt) {
  if (isEscapeKey(evt)) {
    closePopup();
  }
}

loadCommentsButton.addEventListener('click', () => {

  loadComments();
});

closeButton.addEventListener('click', () => {
  closePopup();
});

const showFullPicture = function (picture) {
  const { url, likes, comments, description } = picture;
  restComments = [...comments];

  bigPicture.classList.remove('hidden');
  document.body.classList.add('modal-open');

  bigPicture.querySelector('.big-picture__img img').setAttribute('src', url);
  bigPicture.querySelector('.big-picture__img img').setAttribute('alt', description);
  bigPicture.querySelector('.social__caption').textContent = description;
  bigPicture.querySelector('.likes-count').textContent = likes;
  bigPicture.querySelector('.comments-count').textContent = comments.length;
  bigPicture.querySelector('.comments-showed-count').textContent = showedComments.length;

  // Insert comments
  commentsListElement.innerHTML = '';
  // commentsListElement.appendChild(getSocialСomments(showedComments));

  loadComments();

  document.addEventListener('keydown', onPopupEscKeydown);
};

export { showFullPicture };


