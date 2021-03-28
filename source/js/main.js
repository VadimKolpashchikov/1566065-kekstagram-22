import {getData} from './api.js'
import {showPicture} from './show-photos.js'
import {uploadPicture, SubmitPictureForm} from './upload-picture'
import {addPicturesFiltersButtons} from './picture-filters.js'
import {debounce} from './util.js';

const RERENDER_DELAY = 500;

let defaultData = Array();

getData((data) => {
  data.forEach((item) => {
    defaultData.push(item)
  })
  showPicture(data, defaultData);
  addPicturesFiltersButtons(debounce(
    () => showPicture(data, defaultData),
    RERENDER_DELAY,
  ));
});
uploadPicture();
SubmitPictureForm();
