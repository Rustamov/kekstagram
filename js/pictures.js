const templateFragment = document.querySelector('#picture').content;
const template = templateFragment.querySelector('a');

const picturesListElement = document.querySelector('.pictures');
const picturesListFragment = document.createDocumentFragment();

const drawPictures = function(picturesData) {
  picturesData.forEach(({url, likes, comments}) => {
    const pictureEl = template.cloneNode(true);

    pictureEl.querySelector('.picture__img').setAttribute('src', url);
    pictureEl.querySelector('.picture__likes').textContent = likes;
    pictureEl.querySelector('.picture__comments').textContent = comments.length;

    picturesListFragment.appendChild(pictureEl);
  });

  picturesListElement.appendChild(picturesListFragment);
};


export {drawPictures};

