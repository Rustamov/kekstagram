import { isEscapeKey, getClickedChildWithClass } from './util.js';

const bigPictureNode = document.querySelector('.big-picture');
const closeButtonNode = bigPictureNode.querySelector('.big-picture__cancel');
const loadCommentsButtonNode = bigPictureNode.querySelector('.social__comments-loader');

const commentTemplateFragment = document.querySelector('#social-comment').content;
const commentTemplateNode = commentTemplateFragment.querySelector('.social__comment');

const commentsListNode = document.querySelector('.social__comments');


let restComments = [];
const showedComments = [];


const getSocialСomments = (comments) => {
  const commentsListFragment = document.createDocumentFragment();

  comments.forEach(({ avatar, message, name }) => {
    const commentEl = commentTemplateNode.cloneNode(true);

    commentEl.querySelector('.social__picture').setAttribute('src', avatar);
    commentEl.querySelector('.social__picture').setAttribute('alt', name);
    commentEl.querySelector('.social__text').textContent = message;

    commentsListFragment.appendChild(commentEl);
  });

  return commentsListFragment;
};

const closePopup = () => {
  if (document.body.classList.contains('modal-open')) {
    bigPictureNode.classList.add('hidden');
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
    bigPictureNode.querySelector('.comments-loader').classList.remove('hidden');
  } else {
    bigPictureNode.querySelector('.comments-loader').classList.add('hidden');
  }

  bigPictureNode.querySelector('.comments-showed-count').textContent = showedComments.length;
  commentsListNode.append(getSocialСomments(showedComments.slice(prevShowedCommentsIndex)));
};

function onPopupEscKeydown(evt) {
  if (isEscapeKey(evt)) {
    closePopup();
  }
}

loadCommentsButtonNode.addEventListener('click', () => {

  loadComments();
});

closeButtonNode.addEventListener('click', () => {
  closePopup();
});

const showFullPicture = function (picture) {
  const { url, likes, comments, description } = picture;

  bigPictureNode.classList.remove('hidden');
  document.body.classList.add('modal-open');

  bigPictureNode.querySelector('.big-picture__img img').setAttribute('src', url);
  bigPictureNode.querySelector('.big-picture__img img').setAttribute('alt', description);
  bigPictureNode.querySelector('.social__caption').textContent = description;
  bigPictureNode.querySelector('.likes-count').textContent = likes;
  bigPictureNode.querySelector('.comments-count').textContent = comments.length;
  bigPictureNode.querySelector('.comments-showed-count').textContent = showedComments.length;

  // Insert comments
  commentsListNode.innerHTML = '';
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
    evt.preventDefault();
    cb(pictureEL.getAttribute('id'));
  });

};


export { showFullPicture, setPicturePreviewClick };


