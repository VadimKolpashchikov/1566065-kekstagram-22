import noUiSlider from 'nouislider';
import 'nouislider/distribute/nouislider.css';

const sliderContainer = document.querySelector('.effect-level__slider');
const imgUploadEffectLevel = document.querySelector('.img-upload__effect-level');
const effectLevelValue = document.querySelector('.effect-level__value');

const variantsFilters = {
  chrome: 'grayscale(',
  sepia: 'sepia(',
  marvin: 'invert(',
  phobos: 'blur(',
  heat: 'brightness(',
};

const variantsFiltersEnd = {
  chrome: ')',
  sepia: ')',
  marvin: '%)',
  phobos: 'px)',
  heat: ')',
};

const filtersType = {
  none: 'none',
  chrome: 'chrome',
  sepia: 'sepia',
  marvin: 'marvin',
  phobos: 'phobos',
  heat: 'heat',
}

const slider = {
  create() {
    noUiSlider.create(sliderContainer, {
      range: {
        min: 0,
        max: 100,
      },
      start: 100,
      step: 1,
      connect: 'lower',
      format: {
        to: function (value) {
          if (Number.isInteger(value)) {
            return value.toFixed(0);
          }
          return value.toFixed(1);
        },
        from: function (value) {
          return parseFloat(value);
        },
      },
    });
  },
  configureEffects(img, effects) {
    img.removeAttribute('class');
    const selectedEffect = effects.querySelector('input:checked');
    img.classList.add('effects__preview--' + selectedEffect.value);
    slider.updateOptions(selectedEffect.value);
    if (selectedEffect.value !== 'none') {
      sliderContainer.noUiSlider.on('update', (values, handle) => {
        effectLevelValue.value = values[handle];
        img.style.filter = variantsFilters[selectedEffect.value] + effectLevelValue.value + variantsFiltersEnd[selectedEffect.value];
      });
    } else {
      img.removeAttribute('class');
      img.style.filter = null;
    }
  },
  hide() {
    imgUploadEffectLevel.classList.add('hidden');
  },
  show() {
    imgUploadEffectLevel.classList.remove('hidden');
  },
  remove() {
    sliderContainer.noUiSlider.destroy();
  },
  updateOptions(type) {
    if (type !== filtersType.none) {
      this.show();
    }
    if (type === filtersType.none) {
      this.hide();
      sliderContainer.noUiSlider.updateOptions({
        range: {
          min: 0,
          max: 100,
        },
        start: 100,
        step: 1,
      });
    }
    if (type === filtersType.chrome || type === filtersType.sepia) {
      sliderContainer.noUiSlider.updateOptions({
        range: {
          min: 0,
          max: 1,
        },
        start: 1,
        step: 0.1,
      });
    }
    if (type === filtersType.marvin) {
      sliderContainer.noUiSlider.updateOptions({
        range: {
          min: 0,
          max: 100,
        },
        start: 100,
        step: 1,
      });
    }
    if (type === filtersType.phobos) {
      sliderContainer.noUiSlider.updateOptions({
        range: {
          min: 0,
          max: 3,
        },
        start: 3,
        step: 0.1,
      });
    }
    if (type === filtersType.heat) {
      sliderContainer.noUiSlider.updateOptions({
        range: {
          min: 1,
          max: 3,
        },
        start: 3,
        step: 0.1,
      });
    }
  },
};

export {slider}
