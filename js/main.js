import { showAlert, debounce } from './util.js';
import { renderPictures } from './pictures.js';
import { getData } from './api.js';
import { setPictureFormSubmit } from './form.js';
import './picture-edit.js';
import { setFilterClick } from './filter.js';
import { setPicturePreviewClick, showFullPicture } from './full-image.js';

const RERENDER_DELAY = 500;

getData(
  (pictures) => {
    renderPictures(pictures);
    setPicturePreviewClick((pictureId) => {
      showFullPicture(pictures[pictureId]);
    });

    setFilterClick(debounce(
      () => renderPictures(pictures),
      RERENDER_DELAY,
    ));
  },
  () => {
    showAlert('Не удалось загрузить данныйе');
  }
);


setPictureFormSubmit(() => {});
