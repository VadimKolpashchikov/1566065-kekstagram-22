import {isEscEvent} from './util.js';

const taskSuccessMessageTemplate = document.querySelector('#success').content;
const successMessageTemplate = taskSuccessMessageTemplate.querySelector('.success');
const successMessage = successMessageTemplate.cloneNode(true);
const successButton = successMessage.querySelector('.success__button');
const taskErrorMessageTemplate = document.querySelector('#error').content;
const errorMessageTemplate = taskErrorMessageTemplate.querySelector('.error');
const errorMessage = errorMessageTemplate.cloneNode(true);
const errorButton = errorMessage.querySelector('.error__button');
const taskLoadingErrorMessageTemplate = document.querySelector('#loading-error').content;
const loadingErrorMessageTemplate = taskLoadingErrorMessageTemplate.querySelector('.error');
const loadingErrorMessage = loadingErrorMessageTemplate.cloneNode(true);
const loadingErrorButton = loadingErrorMessage.querySelector('.error__button');
const documentMain = document.querySelector('main')

const closeWithKey = (evt) => {
  if (isEscEvent(evt)) {
    evt.preventDefault();
    hideMessage();
  }
};

const closeWithClick = (evt) => {
  if (evt.target.className === 'success') {
    hideMessage();
  } else if (evt.target.className === 'error') {
    hideMessage();
  } else {
    evt.preventDefault()
  }
};

const hideMessage = () => {
  document.removeEventListener('keydown', closeWithKey);
  document.removeEventListener('click', closeWithClick);
  errorMessage.remove();
  successMessage.remove();
  loadingErrorMessage.remove();
};

const showErrorMessage = () => {
  documentMain.append(errorMessage);
  document.addEventListener('keydown', closeWithKey);
  document.addEventListener('click', closeWithClick);
  errorButton.addEventListener('click', () => {
    hideMessage();
  });
}

const showSuccessMessage = () => {
  documentMain.append(successMessage);
  document.addEventListener('keydown', closeWithKey);
  document.addEventListener('click', closeWithClick);
  successButton.addEventListener('click', () => {
    hideMessage();
  });
}

const showLoadingErrorMessage = () => {
  documentMain.append(loadingErrorMessage);
  document.addEventListener('keydown', closeWithKey);
  document.addEventListener('click', closeWithClick);
  loadingErrorButton.addEventListener('click', () => {
    hideMessage();
  });
}

export {showErrorMessage, showSuccessMessage, showLoadingErrorMessage}
