import {showBigPicture} from './show-big-picture'
import {filterPictures} from './picture-filters.js'

const taskTemplatePicture = document.querySelector('#picture').content;
const templatePicture = taskTemplatePicture.querySelector('.picture');
const picturesContainer = document.querySelector('.pictures')



const showPicture = (items , defaultData) => {
  const selectedPictures = picturesContainer.querySelectorAll('.picture');
  if (selectedPictures.length !== 0) {
    selectedPictures.forEach((selectedPicture) => {
      selectedPicture.remove();
    });
  }
  const filteredPicture = filterPictures(items, defaultData);
  const picturesListFragment = document.createDocumentFragment();
  filteredPicture.forEach((item) => {
    const pictureClone = templatePicture.cloneNode(true);
    const pictureImg = pictureClone.querySelector('.picture__img');
    const pictureComments = pictureClone.querySelector('.picture__comments');
    const pictureLikes = pictureClone.querySelector('.picture__likes');

    pictureImg.src = item.url;
    pictureLikes.textContent = item.likes;
    pictureComments.textContent = item.comments.length;

    pictureClone.addEventListener('click', showBigPicture(item));
    picturesListFragment.appendChild(pictureClone);
  })
  picturesContainer.appendChild(picturesListFragment)
}

export {showPicture}
