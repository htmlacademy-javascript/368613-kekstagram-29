import { onDocumentKeydown } from './modal-window';

const uploadForm = document.querySelector('.img-upload__form');
const uploadControl = uploadForm.querySelector('.img-upload__input');
const sendFormButton = uploadForm.querySelector('.img-upload__submit');
const uploadOverlay = uploadForm.querySelector('.img-upload__overlay');
const uploadCancelButton = uploadOverlay.querySelector('.img-upload__cancel');
const hashtagField = document.querySelector('.text__hashtags');
const commentField = document.querySelector('.text__description');

const pristine = new Pristine(uploadForm, {
  classTo: 'img-upload__field-wrapper',
  errorTextParent: 'img-upload__field-wrapper',
  errorTextClass: 'img-upload__field-wrapper__error'
});

const closeModal = () => {
  if (document.activeElement === hashtagField || document.activeElement === commentField) {
    return;
  }

  uploadOverlay.classList.add('hidden');
  document.classList.remove('modal-open');
  document.removeEventListener('keydown', onDocumentKeydown);
  uploadCancelButton.removeEventListener('click', closeModal);
};

const openModal = () => {
  uploadOverlay.classList.remove('hidden');
  document.classList.add('modal-open');
  document.addEventListener('keydown', onDocumentKeydown);
  uploadCancelButton.addEventListener('click', closeModal);
};

uploadControl.addEventListener('change', () =>
  openModal()
);

sendFormButton.addEventListener('input', (evt) => {
  evt.preventDefault();
  pristine.validate();
});
