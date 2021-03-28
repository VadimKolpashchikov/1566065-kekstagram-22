const imgFilters = document.querySelector('.img-filters');
const imgFiltersForm = imgFilters.querySelector('.img-filters__form');
const imgFiltersButtons = imgFiltersForm.querySelectorAll('button');

let selectedFilter = 'filter-default';

const filterOptions = {
  default: 'filter-default',
  random: 'filter-random',
  discussed: 'filter-discussed',
};

const addPicturesFiltersButtons = (cb) => {
  imgFilters.classList.remove('img-filters--inactive');
  imgFiltersButtons.forEach((button) => {
    button.addEventListener('click', () => {
      imgFiltersForm.querySelector('.img-filters__button--active').classList.remove('img-filters__button--active');
      button.classList.add('img-filters__button--active');
      selectedFilter = button.id;
      cb();
    })
  });
};

const filterPictures = (data, defaultData) => {
  if (selectedFilter === filterOptions.default) {
    return defaultData.slice(0);
  } else if (selectedFilter === filterOptions.random) {
    return [...new Set(data)].sort(() => Math.random() - 0.5).slice(0, 10);
  } else if (selectedFilter === filterOptions.discussed) {
    return data.sort((a, b) => b.comments.length - a.comments.length).slice(0);
  }
};

export {addPicturesFiltersButtons, filterPictures}
