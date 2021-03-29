import {changeStateBody} from './page-states.js';
import {slider} from './nouislider.js'
import {addValidation, removeValidation} from './form-validation.js'
import {sendData} from './api.js'
import {showErrorMessage, showSuccessMessage} from './notifications.js';

const FILE_TYPES = ['gif', 'jpg', 'jpeg', 'png'];

const imgUploadForm = document.querySelector('.img-upload__form');
const uploadFileInput = imgUploadForm.querySelector('#upload-file');
const imgUploadOverlay = imgUploadForm.querySelector('.img-upload__overlay');
const imgUploadPreviewContainer = imgUploadForm.querySelector('.img-upload__preview');
const imgUploadPreview = imgUploadPreviewContainer.querySelector('img');
const effectsList = imgUploadForm.querySelector('.effects__list');
const effectsPreviews = effectsList.querySelectorAll('.effects__preview');
const defaultEffect = effectsList.querySelectorAll('#effect-none');
const imgUploadCancelButton = imgUploadForm.querySelector('.img-upload__cancel');
const imgUploadScale = imgUploadForm.querySelector('.img-upload__scale');
const scaleControlSmaller = imgUploadScale.querySelector('.scale__control--smaller');
const scaleControlBigger = imgUploadScale.querySelector('.scale__control--bigger');
const scaleControlValue = imgUploadScale.querySelector('.scale__control--value');

const scaleControlPossibleValue = {
  min: 25,
  max: 100,
}

const uploadPicture = () => {
  uploadFileInput.addEventListener('change', () => {
    const file = uploadFileInput.files[0];
    const fileName = file.name.toLowerCase();

    const matches = FILE_TYPES.some((it) => {
      return fileName.endsWith(it);
    });

    if (matches) {
      const reader = new FileReader();

      reader.addEventListener('load', () => {
        imgUploadPreview.src = reader.result;
        imgUploadPreview.style.transform = 'scale(' + parseInt(scaleControlValue.value)/100 + ')';
        effectsPreviews.forEach((item) => {
          item.style.backgroundImage = 'url(\'' + reader.result + '\')';
        });
        imgUploadOverlay.classList.remove('hidden');
        slider.hide();
        slider.create();
        changeStateBody.createFixed();
        imgUploadCancelButton.addEventListener('click', closeDownloadWindow);
        scaleControlSmaller.addEventListener('click', addScaleControlSmallerOnClick);
        scaleControlBigger.addEventListener('click', addScaleControlBiggerOnClick);
        effectsList.addEventListener('change', () => slider.configureEffects(imgUploadPreview, effectsList));
        addValidation();
      });

      reader.readAsDataURL(file);
    }
  });
};

const closeDownloadWindow = () => {
  changeStateBody.createDefault();
  imgUploadForm.reset();
  imgUploadOverlay.classList.add('hidden');
  imgUploadCancelButton.removeEventListener('click', closeDownloadWindow);
  scaleControlSmaller.removeEventListener('click', addScaleControlSmallerOnClick);
  scaleControlBigger.removeEventListener('click', addScaleControlBiggerOnClick);
  effectsList.removeEventListener('change', () => slider.configureEffects(imgUploadPreview, effectsList));
  imgUploadPreview.removeAttribute('class');
  imgUploadPreview.style.filter = null;
  effectsList.querySelector('input:checked').removeAttribute('checked')
  defaultEffect[0].setAttribute('checked', 'checked');
  slider.remove();
  removeValidation();
};

const submitPictureForm = () => {
  imgUploadForm.addEventListener('submit', (evt) => {
    evt.preventDefault();
    const formData = new FormData(evt.target);

    sendData(formData, closeDownloadWindow(), showSuccessMessage, showErrorMessage);
  });
}

const addScaleControlSmallerOnClick = () => {
  if (parseInt(scaleControlValue.value) > scaleControlPossibleValue.min) {
    scaleControlValue.value = [parseInt(scaleControlValue.value) - scaleControlPossibleValue.min] + '%' ;
  }
  imgUploadPreview.style.transform = 'scale(' + parseInt(scaleControlValue.value)/100 + ')';
};

const addScaleControlBiggerOnClick = () => {
  if (parseInt(scaleControlValue.value) < scaleControlPossibleValue.max) {
    scaleControlValue.value = (parseInt(scaleControlValue.value) + scaleControlPossibleValue.min) + '%' ;
  }
  imgUploadPreview.style.transform = 'scale(' + parseInt(scaleControlValue.value)/100 + ')';
};

export {uploadPicture, closeDownloadWindow, submitPictureForm}
