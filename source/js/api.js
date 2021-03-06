import {showLoadingErrorMessage} from './notifications.js'

const SERVER_ADDRESS = 'https://22.javascript.pages.academy/kekstagram';

const getData = (onSuccess) => {
  fetch(SERVER_ADDRESS + '/data')
    .then((response) => response.json())
    .then((data) => {
      onSuccess(data);
    })
    .catch(() => {
      showLoadingErrorMessage();
    });
};

const sendData = (data, dataReset, successMessage, errorMessage) => {
  fetch(
    SERVER_ADDRESS,
    {
      method: 'POST',
      body: data,
    },
  )
    .then((response) => {
      if (response.ok) {
        successMessage();
        dataReset();
      }
    })
    .catch(() => {
      errorMessage();
      dataReset();
    });
};

export {getData, sendData}
