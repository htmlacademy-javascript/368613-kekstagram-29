import {isEscapeKey} from './util.js';
import {thumbnailsList} from './data.js';

const body = document.querySelector('body');
const thumbnailsContainer = document.querySelector('.pictures');
const bigPictureContainer = document.querySelector('.big-picture');
const bigImage = bigPictureContainer.querySelector('.big-picture__img img');
const bigImageLikesCount = bigPictureContainer.querySelector('.likes-count');
const bigImageCaption = bigPictureContainer.querySelector('.social__caption');
const bigImageCancel = bigPictureContainer.querySelector('.big-picture__cancel');


const commentsContainer = bigPictureContainer.querySelector('.social__comments');
const commentItem = commentsContainer.querySelector('.social__comment');
const commentCount = bigPictureContainer.querySelector('.comments-count');
const commentsCount = bigPictureContainer.querySelector('.social__comment-count');
const commentsLoader = bigPictureContainer.querySelector('.comments-loader');

const onDocumentKeydown = (evt) => {
  if (isEscapeKey(evt)) {
    evt.preventDefault();
    closeUserModal();
  }
};

function openUserModal () {
  bigPictureContainer.classList.remove('hidden');
  body.classList.add('modal-open');
  document.addEventListener('keydown', onDocumentKeydown);
  commentsCount.classList.add('hidden');
  commentsLoader.classList.add('hidden');
}

function closeUserModal () {
  bigPictureContainer.classList.add('hidden');
  body.classList.remove('modal-open');
  document.removeEventListener('keydown', onDocumentKeydown);
  commentsCount.classList.remove('hidden');
  commentsLoader.classList.remove('hidden');
}
const renderComments = (commentsArray) => {
  commentsArray.forEach(({avatar, name, message}) => {
    const newComment = commentItem.cloneNode(true);
    newComment.querySelector('.social__picture').src = avatar;
    newComment.querySelector('.social__picture').alt = name;
    newComment.querySelector('.social__text').textContent = message;
    return newComment;
  });
};

const showBigPicture = (url, likes, comments, description) => {
  openUserModal();
  bigImage.src = url;
  bigImageLikesCount.textContent = likes;
  commentCount.textContent = comments.length;
  bigImageCaption.textContent = description;
  commentsContainer.innerHTML = '';
  renderComments(comments);
};

const renderBigPicture = () => {
  thumbnailsContainer.addEventListener('click', (evt) => {
    const thumbnail = evt.target.closest('[data-thumbnail-id]');
    if (!thumbnail) {
      return;
    }
    evt.preventDefault();

    const picture = thumbnailsList.find(
      (item) => item.id === +(thumbnail.dataset.thumbnailId)
    );

    showBigPicture(picture);
  });
};

bigImageCancel.addEventListener('click', () =>
  closeUserModal()
);

export {renderBigPicture};
