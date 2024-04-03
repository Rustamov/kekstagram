import { showAlert } from './util.js';
import { renderPictures } from './pictures.js';
import { getData } from './api.js';
import { setPictureFormSubmit, closeUploadModal } from './form.js';
import './picture-edit.js';


getData(
  (pictures) => {
    renderPictures(pictures);
  },
  () => {
    showAlert('Не удалось загрузить данныйе');
  }
);


setPictureFormSubmit(() => {


  // console.log()
});
