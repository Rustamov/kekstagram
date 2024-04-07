import { getRandomElementsFromArray } from './util.js';
import { getCurrentFilter, FILTERS } from './filter.js';

const templateFragment = document.querySelector('#picture').content;
const template = templateFragment.querySelector('a');

const picturesListElement = document.querySelector('.pictures');
const picturesListFragment = document.createDocumentFragment();

const SHOWED_RANDOM_PICTURES_COUNT = 10;

const sortPicturesByDiscussed = (pictureA, pictureB) => pictureB.comments.length - pictureA.comments.length;

const renderPictures = function (picturesData) {
  const pictures = picturesData.slice();
  let sortedPicrures = [];

  switch (getCurrentFilter()) {
    case FILTERS.RANDOM:
      sortedPicrures = getRandomElementsFromArray(pictures, SHOWED_RANDOM_PICTURES_COUNT);
      break;

    case FILTERS.DISCUSSED:
      sortedPicrures = pictures.slice().sort(sortPicturesByDiscussed);
      break;

    default:
      sortedPicrures = pictures;
      break;
  }

  sortedPicrures.forEach(({ id, url, likes, comments }) => {
    const pictureEl = template.cloneNode(true);

    pictureEl.setAttribute('id', id);
    pictureEl.querySelector('.picture__img').setAttribute('src', url);
    pictureEl.querySelector('.picture__likes').textContent = likes;
    pictureEl.querySelector('.picture__comments').textContent = comments.length;

    picturesListFragment.appendChild(pictureEl);
  });

  picturesListElement.querySelectorAll('.picture').forEach((pictureEl) => {
    pictureEl.remove();
  });
  picturesListElement.appendChild(picturesListFragment);
};

export { renderPictures };

