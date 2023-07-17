const thumbnailsContainer = document.querySelector('.pictures');

const thumbnailTemplate = document.querySelector('#picture').content.querySelector('.picture');

const thumbnailElements = ({url, description, likes, comments, id}) => {
  const thumbnailElement = thumbnailTemplate.cloneNode(true);
  thumbnailElement.querySelector('.picture__img').src = url;
  thumbnailElement.querySelector('.picture__img').alt = description;
  thumbnailElement.querySelector('.picture__likes').textContent = likes;
  thumbnailElement.querySelector('.picture__comments').textContent = comments.length;
  thumbnailElement.dataset.thumbnailId = id; //завели для делегирования, добавляет атрибут data-thumbnail-id к миниатюре

  return thumbnailElement;
};

const renderMiniatures = (pictures) => {
  const thumbnailsContainerFragment = document.createDocumentFragment();
  pictures.forEach((picture) => {
    const thumbnailElement = thumbnailElements(picture);
    thumbnailsContainerFragment.appendChild(thumbnailElement);

  });

  thumbnailsContainer.appendChild(thumbnailsContainerFragment);
};
export {renderMiniatures};
