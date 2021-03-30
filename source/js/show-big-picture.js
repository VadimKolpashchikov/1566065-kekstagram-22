import {changeStateBody} from './page-states.js';
import {isEscEvent} from './util.js';

const DEFAULT_COMMENTS_COUNT = 5;
const COUNTER_ADDITIONAL_COMMENTS = 5;

const bigPicture = document.querySelector('.big-picture');
const bigPictureContainer = bigPicture.querySelector('.big-picture__img');
const bigPictureImg = bigPictureContainer.querySelector('img');
const bigPictureClose = bigPicture.querySelector('.big-picture__cancel');
const bigPictureLikes = bigPicture.querySelector('.likes-count');
const bigPictureCaption = bigPicture.querySelector('.social__caption');
const bigPictureCommentsCount = bigPicture.querySelector('.comments-count');
const bigPictureCommentsCountDisplayed = bigPicture.querySelector('.comments-count_displayed');
const bigPictureCommentsLoader = bigPicture.querySelector('.comments-loader');
const bigPictureSocialComments = bigPicture.querySelector('.social__comments');
const bigPictureSocialComment = bigPictureSocialComments.querySelector('.social__comment').cloneNode(true);
let selectedElementData = null;

const closeWithKey = (evt) => {
  if (isEscEvent(evt)) {
    evt.preventDefault();
    bigPictureCloseHandler();
  }
};

const showBigPicture = (data) => {
  return () => {
    selectedElementData = data;
    bigPictureImg.src = data.url;
    bigPictureLikes.textContent = data.likes;
    bigPictureCommentsCount.textContent = data.comments.length;
    bigPictureCaption.textContent = data.description;

    if(data.comments.length <= 5) {
      bigPictureCommentsCountDisplayed.textContent = data.comments.length;
      bigPictureCommentsLoader.classList.add('hidden');
    } else {
      bigPictureCommentsCountDisplayed.textContent = DEFAULT_COMMENTS_COUNT;
      bigPictureCommentsLoader.classList.remove('hidden');
    }
    bigPictureSocialComments.innerHTML = '';
    addSocialComments(data, 0, DEFAULT_COMMENTS_COUNT);
    bigPictureCommentsLoader.addEventListener('click', commentsLoadAdditionallyHandler);
    bigPicture.classList.remove('hidden');
    changeStateBody.createFixed();
    bigPictureClose.addEventListener('click', bigPictureCloseHandler);
    document.addEventListener('keydown', closeWithKey);
  }
};

const bigPictureCloseHandler = () => {
  changeStateBody.createDefault();
  bigPicture.classList.add('hidden');
  bigPictureClose.removeEventListener('click', bigPictureCloseHandler);
  bigPictureCommentsLoader.removeEventListener('click', commentsLoadAdditionallyHandler);
  document.removeEventListener('keydown', closeWithKey);
};

const addSocialComments = (data, commentsStart, commentsEnd) => {
  const socialCommentsFragment = document.createDocumentFragment();
  data.comments.slice(commentsStart, commentsEnd).forEach((element) => {
    const bigPictureSocialCommentClone = bigPictureSocialComment.cloneNode(true);
    const bigPictureSocialImg = bigPictureSocialCommentClone.querySelector('.social__picture');
    const bigPictureSocialText = bigPictureSocialCommentClone.querySelector('.social__text');

    bigPictureSocialImg.src = element.avatar;
    bigPictureSocialImg.alt = element.name;
    bigPictureSocialText.textContent = element.message;

    socialCommentsFragment.appendChild(bigPictureSocialCommentClone);
  });
  bigPictureSocialComments.appendChild(socialCommentsFragment);
};


const commentsLoadAdditionallyHandler = () => {
  const lastComment = bigPictureCommentsCountDisplayed.textContent;
  let newLastComment = Number(lastComment) + COUNTER_ADDITIONAL_COMMENTS;
  if (newLastComment >= selectedElementData.comments.length) {
    newLastComment = selectedElementData.comments.length;
    bigPictureCommentsLoader.classList.add('hidden');
  }
  bigPictureCommentsCountDisplayed.textContent = newLastComment;
  addSocialComments(selectedElementData, lastComment, newLastComment);
};


export {showBigPicture}
