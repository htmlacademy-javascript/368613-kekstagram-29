const thumbnailsContainer = document.querySelector('.pictures');

const thumbnailTemplate = document.querySelector('#picture').content.querySelector('.picture');

const thumbanailElements = ({url, description, likes, comments}) => {
  const thumbanailElement = thumbnailTemplate.cloneNode(true);
  thumbanailElement.querySelector('.picture__img').src = url;
  thumbanailElement.querySelector('.picture__img').alt = description;
  thumbanailElement.querySelector('.picture__likes').textContent = likes;
  thumbanailElement.querySelector('.picture__comments').textContent = comments.length;

  return thumbanailElement;
};

const getMiniatures = (pictures) => {
  const thumbnailsContainerFragment = document.createDocumentFragment();
  pictures.forEach((picture) => {
    const thumbanailElement = thumbanailElements(picture);
    thumbnailsContainerFragment.appendChild(thumbanailElement);

  });

  thumbnailsContainer.appendChild(thumbnailsContainerFragment);
};
export {getMiniatures};
