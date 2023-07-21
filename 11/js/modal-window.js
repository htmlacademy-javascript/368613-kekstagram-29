import {isEscapeKey} from './util.js';
import {thumbnailsList} from './data.js';

const COMMENTS_PER_PORTION = 5;

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

let commentsShown = 0;
let comments = [];

//открываем модальное окно, убираем хиден
const openUserModal = () => {
  bigPictureContainer.classList.remove('hidden');
  body.classList.add('modal-open');
  document.addEventListener('keydown', onDocumentKeydown);
};

//закрываем модалку, добавляем хиден, обнуляем комменты для открытия другой модалки
const closeUserModal = () => {
  bigPictureContainer.classList.add('hidden');
  body.classList.remove('modal-open');
  commentsShown = 0;
  document.removeEventListener('keydown', onDocumentKeydown);
};

//именно в этом случае невозможно стрелочную - либо декларативно объявлять функцию, либо в модуль выносить
function onDocumentKeydown (evt) {
  if (isEscapeKey(evt)) {
    evt.preventDefault();
    closeUserModal();
  }
}
//закрываем по кнопке-крестику в модалке
bigImageCancel.addEventListener('click', () =>
  closeUserModal()
);
//заполняем один коммент через шаблон
const showComment = ({avatar, name, message}) => {
  const newComment = commentItem.cloneNode(true);
  newComment.querySelector('.social__picture').src = avatar;
  newComment.querySelector('.social__picture').alt = name;
  newComment.querySelector('.social__text').textContent = message;
  return newComment;
};
//отрисовываем комменты по принципу: после нажатия "загрузить ещё" всё стираем
// и перерисовываем с учётом новой порции комментов
const renderComments = () => {
  commentsShown += COMMENTS_PER_PORTION;

  if (commentsShown >= comments.length) {
    commentsLoader.classList.add('hidden');
    commentsShown = comments.length;
  } else {
    commentsLoader.classList.remove('hidden');
  }

  const fragment = document.createDocumentFragment();
  for (let i = 0; i < commentsShown; i++) {
    const commentElement = showComment(comments[i]);
    fragment.append(commentElement);
  }

  commentsContainer.innerHTML = '';
  commentsContainer.append(fragment);
  commentsCount.innerHTML = `${commentsShown} из <span class="comments-count">${comments.length}</span> комментариев`;
};
//переименовываем под критерий названий обработчиков событий
const onCommentsLoaderClick = () => {
  renderComments();
};
//заполняем и показываем через деструктуризацию модалку
const showBigPicture = ({url, likes, description}) => {
  openUserModal();
  bigImage.src = url;
  bigImageLikesCount.textContent = likes;
  commentCount.textContent = comments.length;
  bigImageCaption.textContent = description;
  commentsLoader.addEventListener('click', onCommentsLoaderClick);
};
//связываем через добавления атрибута миниатюрам miniatures и modal-window
// навешиваем на родителя - ссылка <a> с классом .picture обработчик по клику (делигируем)
//через closest всплываем от элемента галереи до родителя с добавленным  атрибутом data-thumbnail-id
const renderBigPicture = () => {
  thumbnailsContainer.addEventListener('click', (evt) => {
    const thumbnailElement = evt.target.closest('[data-thumbnail-id]');
    if (!thumbnailElement) {
      return;
    }
    evt.preventDefault();
    //ищем по id нужный элемент из массива данных
    const picture = thumbnailsList.find(
      (item) => item.id === +thumbnailElement.dataset.thumbnailId //плюс переводит в число дата атрибут
    );
    //используем найденный элемент для отрисовки и модалки и рендера комментов
    comments = Array.from(picture.comments);//
    renderComments(comments);
    showBigPicture(picture);
  });
};

export {renderBigPicture, onDocumentKeydown};
