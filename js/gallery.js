import {getPictures} from './data.js';
import {drawPictures} from './pictures.js';
import {showFullPicture} from './full-image.js';

const pictures = getPictures();

const gallery = function() {

  drawPictures(pictures);

  const pictureData = pictures[0];
  showFullPicture(pictureData);
};

export {gallery};
