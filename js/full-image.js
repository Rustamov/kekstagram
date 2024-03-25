const closeButton = document.querySelector('.big-picture__cancel');

const commentTemplateFragment = document.querySelector('#social-comment').content;
const commentЕemplate = commentTemplateFragment.querySelector('.social__comment');

const commentsListElement = document.querySelector('.social__comments');
const commentsListFragment = document.createDocumentFragment();

const bigPicture = document.querySelector('.big-picture');

function getSocialСomments(comments) {
  comments.forEach(({avatar, message, name}) => {
    const commentEl = commentЕemplate.cloneNode(true);

    commentEl.querySelector('.social__picture').setAttribute('src', avatar);
    commentEl.querySelector('.social__picture').setAttribute('alt', name);
    commentEl.querySelector('.social__text').textContent = message;

    commentsListFragment.appendChild(commentEl);
  });

  return commentsListFragment;
}

function closePopup() {
  if (document.body.classList.contains('modal-open')) {
    bigPicture.classList.add('hidden');
    document.body.classList.remove('modal-open');

  }
}

window.addEventListener('keydown', (evt) => {
  if (evt.keyCode === 27) {
    closePopup();
  }
});

closeButton.addEventListener('click', closePopup);

const showFullPicture = function (picture) {
  const { url, likes, comments, description } = picture;

  bigPicture.classList.remove('hidden');
  document.body.classList.add('modal-open');


  bigPicture.querySelector('.big-picture__img img').setAttribute('src', url);
  bigPicture.querySelector('.big-picture__img img').setAttribute('alt', description);
  bigPicture.querySelector('.social__caption').textContent = description;
  bigPicture.querySelector('.likes-count').textContent = likes;
  bigPicture.querySelector('.comments-count').textContent = comments.length;

  bigPicture.querySelector('.social__comment-count').classList.add('hidden');
  bigPicture.querySelector('.comments-loader').classList.add('hidden');

  // Insert comments
  commentsListElement.innerHTML = '';
  commentsListElement.appendChild(getSocialСomments(comments));
};

export { showFullPicture };
