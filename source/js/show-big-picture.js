const DEFAULT_COMMENTS_COUNT = '5';

const bigPicture = document.querySelector('.big-picture');
const documentBody = document.querySelector('body')
const bigPictureContainer = bigPicture.querySelector('.big-picture__img');
const bigPictureImg = bigPictureContainer.querySelector('img');
const bigPictureClose = bigPicture.querySelector('.big-picture__cancel');
const bigPictureLikes = bigPicture.querySelector('.likes-count');
const bigPictureCaption = bigPicture.querySelector('.social__caption');
const bigPictureCommentsCount = bigPicture.querySelector('.comments-count');
const bigPictureCommentsCountDisplayed = bigPicture.querySelector('.comments-count_displayed');
const bigPictureCommentsLoader = bigPicture.querySelector('.comments-loader');
const bigPictureSocialComments = bigPicture.querySelector('.social__comments');
const bigPictureSocialComment = bigPictureSocialComments.querySelector('.social__comment');


const showBigPicture = (data) => {
  return () => {
    bigPictureImg.src = data.url;
    bigPictureLikes.textContent = data.likes;
    bigPictureCommentsCount.textContent = data.comments.length;
    bigPictureCaption.textContent = data.description;

    addSocialComments(data);

    if(data.comments.length <= 5) {
      bigPictureCommentsCountDisplayed.textContent = data.comments.length;
      bigPictureCommentsLoader.classList.add('hidden');
    } else {
      bigPictureCommentsCountDisplayed.textContent = DEFAULT_COMMENTS_COUNT;
      bigPictureCommentsLoader.classList.remove('hidden');
    }

    bigPicture.classList.remove('hidden');
    documentBody.classList.add('modal-open');
    bigPictureClose.addEventListener('click', closeBigPicture);
  }

}

const closeBigPicture = () => {
  documentBody.classList.remove('modal-open');
  bigPicture.classList.add('hidden');
  bigPictureClose.removeEventListener('click', closeBigPicture);
}

const addSocialComments = (data) => {
  const socialCommentsFragment = document.createDocumentFragment();
  data.comments.forEach((element) => {
    const bigPictureSocialCommentClone = bigPictureSocialComment.cloneNode(true);
    const bigPictureSocialImg = bigPictureSocialCommentClone.querySelector('.social__picture');
    const bigPictureSocialText = bigPictureSocialCommentClone.querySelector('.social__text');

    bigPictureSocialImg.src = element.avatar;
    bigPictureSocialImg.alt = element.name;
    bigPictureSocialText.textContent = element.message;

    socialCommentsFragment.appendChild(bigPictureSocialCommentClone);
  });
  bigPictureSocialComments.innerHTML = '';
  bigPictureSocialComments.appendChild(socialCommentsFragment);
}


export {showBigPicture}
