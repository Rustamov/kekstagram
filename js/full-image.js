import { isEscapeKey, getClickedChildWithClass } from './util.js';

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
  showedComments.splice(0, showedComments.length);
  restComments.splice(0, restComments.length);
  restComments = [...comments];

  loadComments();

  document.addEventListener('keydown', onPopupEscKeydown);
};


const setPicturePreviewClick = (cb) => {
  document.querySelector('.pictures').addEventListener('click', (evt) => {
    const pictureEL = getClickedChildWithClass(evt.currentTarget, evt.target, 'picture');

    if (!pictureEL) {
      return;
    }

    cb(pictureEL.getAttribute('id'));
  });

};


export { showFullPicture, setPicturePreviewClick };


