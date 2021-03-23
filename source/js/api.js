const SERVER_ADDRESS = 'https://22.javascript.pages.academy/kekstagram';

const getData = (onSuccess) => {
  fetch(SERVER_ADDRESS + '/data')
    .then((response) => response.json())
    .then((data) => {
      console.log(data);
      onSuccess(data);
    })
    .catch(() => {
      console.log(22222)
      //onSuccess();
    });
};

export {getData}
