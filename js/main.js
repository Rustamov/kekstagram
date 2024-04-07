import { showAlert, debounce } from './util.js';
import { renderPictures } from './pictures.js';
import { getData } from './api.js';
import { setPictureFormSubmit } from './form.js';
import './picture-edit.js';
import { setFilterClick } from './filter.js';

const RERENDER_DELAY = 500;

getData(
  (pictures) => {
    renderPictures(pictures);

    setFilterClick(debounce(
      () => renderPictures(pictures),
      RERENDER_DELAY,
    ));
  },
  () => {
    showAlert('Не удалось загрузить данныйе');
  }
);


setPictureFormSubmit(() => {


  // console.log()
});
