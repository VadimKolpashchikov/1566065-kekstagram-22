const documentBody = document.querySelector('body');

const changeStateBody  = {
  createFixed () {
    documentBody.classList.add('modal-open');
  },
  createDefault () {
    documentBody.classList.remove('modal-open');
  },
};

export {changeStateBody}
