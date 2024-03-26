import {getPictures} from './data.js';
import {renderPictures} from './pictures.js';
import {showFullPicture} from './full-image.js';

const pictures = getPictures();

const gallery = function() {

  renderPictures(pictures);

  const pictureData = pictures[0];
  showFullPicture(pictureData);
};

export {gallery};
