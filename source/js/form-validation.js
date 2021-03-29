import {isEscEvent} from './util.js';
import {closeDownloadWindow} from './upload-picture.js';

const SPACE = ' ';
const REGULAR = /\W/;
const MAX_HASHTAG_LENGTH = 20;

const imgUploadText = document.querySelector('.img-upload__text');
const inputHashtags = imgUploadText.querySelector('.text__hashtags');
const inputDescription = imgUploadText.querySelector('.text__description');

const closeWithKey = (evt) => {
  if (isEscEvent(evt)) {
    evt.preventDefault();
    closeDownloadWindow();
  }
};

const onFocusoutDeactivateEsc = () => {
  document.removeEventListener('keydown', closeWithKey);
};

const onFocusinActivateEsc = () => {
  document.addEventListener('keydown', closeWithKey);
};

const splitHashtagsString = (stringToSplit, separator) => {
  const arrayOfHashtags = stringToSplit.split(separator);

  arrayOfHashtags.forEach((item, number) => {
    arrayOfHashtags[number] = item.toLowerCase()
  });
  if(
    arrayOfHashtags.every((item) => {
      if (inputHashtags.value.length === 0) {
        return true
      } else if (item.length > MAX_HASHTAG_LENGTH) {
        inputHashtags.setCustomValidity('Максимальная длина одного хэш-тега 20 символов, включая решётку. Хэш-теги разделяются пробелами');
        return false
      } else if (item[0] !== '#') {
        inputHashtags.setCustomValidity('Хэш-тег начинается с символа # (решётка)');
        return false
      } else if (item.length === 1) {
        inputHashtags.setCustomValidity('Хеш-тег не может состоять только из одной решётки');
        return false
      } else if (REGULAR.test(item.slice(1, item.length))) {
        inputHashtags.setCustomValidity('Хэш-тег состоит из букв латинского алфавита и чисел');
        return false
      } else if (arrayOfHashtags.length > 5) {
        inputHashtags.setCustomValidity('Нельзя указать больше пяти хэш-тегов');
        return false
      } else if (Array.from(new Set(arrayOfHashtags)).length !== arrayOfHashtags.length) {
        inputHashtags.setCustomValidity('Один и тот же хэш-тег не может быть использован дважды');
        return false
      }
      return true
    })
  ) {removeInputError();
    inputHashtags.setCustomValidity('');
  } else {addInputError()}
};

const reportValidity = () => {
  return inputHashtags.reportValidity();
}

const addInputError = () => {
  inputHashtags.classList.add('input_error')
}

const removeInputError = () => {
  inputHashtags.classList.remove('input_error')
}

const collectOnInputHashtagsValidation = () => {
  const inputHashtagsText = inputHashtags.value;
  splitHashtagsString(inputHashtagsText, SPACE);
  reportValidity()
}

const addValidation = () => {
  inputHashtags.addEventListener('input', collectOnInputHashtagsValidation);
  document.addEventListener('keydown', closeWithKey);
  inputHashtags.addEventListener('focusin', onFocusoutDeactivateEsc);
  inputHashtags.addEventListener('focusout', onFocusinActivateEsc);
  inputDescription.addEventListener('focusin', onFocusoutDeactivateEsc);
  inputDescription.addEventListener('focusout', onFocusinActivateEsc);
};

const removeValidation = () => {
  removeInputError();
  inputHashtags.removeEventListener('input', collectOnInputHashtagsValidation);
  inputHashtags.removeEventListener('focusin', onFocusoutDeactivateEsc);
  inputHashtags.removeEventListener('focusout', onFocusinActivateEsc);
  inputDescription.removeEventListener('focusin', onFocusoutDeactivateEsc);
  inputDescription.removeEventListener('focusout', onFocusinActivateEsc);
  document.removeEventListener('keydown', closeWithKey);
};

export {addValidation, removeValidation, reportValidity}
