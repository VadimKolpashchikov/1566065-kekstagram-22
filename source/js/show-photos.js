import {showBigPicture} from './show-big-picture'

const PICTURES_COUNT = 10;

const taskTemplatePicture = document.querySelector('#picture').content;
const templatePicture = taskTemplatePicture.querySelector('.picture');
const picturesContainer = document.querySelector('.pictures')



const showPicture = (items) => {
  const picturesListFragment = document.createDocumentFragment();
  items.forEach((item) => {
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
