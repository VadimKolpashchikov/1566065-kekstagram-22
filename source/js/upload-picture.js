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

const ScaleControlPossibleValue = {
  MIN: 25,
  MAX: 100,
}

const uploadPictureChangeHandler = () => {
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
        imgUploadCancelButton.addEventListener('click', DownloadWindowCloseHandler);
        scaleControlSmaller.addEventListener('click', onScaleControlSmallerClick);
        scaleControlBigger.addEventListener('click', onScaleControlBiggerClick);
        effectsList.addEventListener('change', () => slider.configureEffects(imgUploadPreview, effectsList));
        addValidation();
      });

      reader.readAsDataURL(file);
    }
  });
};

const DownloadWindowCloseHandler = () => {
  changeStateBody.createDefault();
  imgUploadForm.reset();
  imgUploadOverlay.classList.add('hidden');
  imgUploadCancelButton.removeEventListener('click', DownloadWindowCloseHandler);
  scaleControlSmaller.removeEventListener('click', onScaleControlSmallerClick);
  scaleControlBigger.removeEventListener('click', onScaleControlBiggerClick);
  effectsList.removeEventListener('change', () => slider.configureEffects(imgUploadPreview, effectsList));
  imgUploadPreview.removeAttribute('class');
  imgUploadPreview.style.filter = null;
  effectsList.querySelector('input:checked').removeAttribute('checked')
  defaultEffect[0].setAttribute('checked', 'checked');
  slider.remove();
  removeValidation();
};

const pictureFormSubmitHandler = () => {
  imgUploadForm.addEventListener('submit', (evt) => {
    evt.preventDefault();
    const formData = new FormData(evt.target);

    sendData(formData, DownloadWindowCloseHandler, showSuccessMessage, showErrorMessage);
  });
}

const onScaleControlSmallerClick = () => {
  if (parseInt(scaleControlValue.value) > ScaleControlPossibleValue.MIN) {
    scaleControlValue.value = (parseInt(scaleControlValue.value) - ScaleControlPossibleValue.MIN) + '%' ;
  }
  imgUploadPreview.style.transform = 'scale(' + parseInt(scaleControlValue.value)/100 + ')';
};

const onScaleControlBiggerClick = () => {
  if (parseInt(scaleControlValue.value) < ScaleControlPossibleValue.MAX) {
    scaleControlValue.value = (parseInt(scaleControlValue.value) + ScaleControlPossibleValue.MIN) + '%' ;
  }
  imgUploadPreview.style.transform = 'scale(' + parseInt(scaleControlValue.value)/100 + ')';
};

export {uploadPictureChangeHandler, DownloadWindowCloseHandler, pictureFormSubmitHandler}
