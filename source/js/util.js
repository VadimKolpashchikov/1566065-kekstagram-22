const debounce = function(fn, time) {
  let timeout;
  return () => {
    let self = this;
    const functionCall = () => {
      return fn.apply(self, arguments);
    };
    clearTimeout(timeout);
    timeout = setTimeout(functionCall, time);
  }
};

const isEscEvent = (evt) => {
  return evt.key === 'Escape' || evt.key === 'Esc';
};

export {debounce, isEscEvent};
