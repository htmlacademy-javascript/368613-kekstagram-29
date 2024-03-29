import { resetZoom, onBiggerButtonClick, onSmallerButtonClick } from './skale.js';
import { resetEffects } from './slider.js';
import { sendData } from './api.js';
import { showPreviewImg } from './upload-img.js';
import { showErrorMessage, showSuccessMessage } from './alerts.js';

const MAX_TAG_COUNT = 5;
const VALID_SYMBOLS = /^#[a-zа-яё0-9]{1,19}$/i;
const ErrorText = {
  INVALID_COUNT: `Не более ${MAX_TAG_COUNT} хэштегов`,
  INVALID_PATTERN: 'Хэштег должен начинаться с # и состоять из букв и чисел',
  NOT_UNIQUE: 'Такой хэштег уже был',
};


const SubmitButtonText = {
  IDLE: 'Сохранить',
  SENDING: 'Сохраняю...'
};

const body = document.body;
const modalElement = document.querySelector ('.img-upload');
const uploadForm = document.querySelector('.img-upload__form');
const uploadControl = uploadForm.querySelector('#upload-file');
const sendFormButton = uploadForm.querySelector('.img-upload__submit');
const uploadOverlay = uploadForm.querySelector('.img-upload__overlay');
const uploadCancelButton = uploadOverlay.querySelector('.img-upload__cancel');
const hashtagField = document.querySelector('.text__hashtags');
const commentField = document.querySelector('.text__description');
const smallerButtonElement = modalElement.querySelector('.scale__control--smaller');
const biggerButtonElement = modalElement.querySelector('.scale__control--bigger');


const pristine = new Pristine(uploadForm, {
  classTo: 'img-upload__field-wrapper',
  errorTextParent: 'img-upload__field-wrapper',
  errorTextClass: 'img-upload__field-wrapper__error'
});

const isTextFieldFocused = () =>
  document.activeElement === hashtagField ||
  document.activeElement === commentField;

const onDocumentKeydown = (evt) => {
  if (evt.key === 'Escape' && !isTextFieldFocused()) {
    evt.preventDefault();
    closeModal();
  }
};

const disableSendButton = () => pristine.validate()
  ? sendFormButton.removeAttribute('disabled')
  : sendFormButton.setAttribute('disabled', 'true');


const openModal = () => {
  uploadOverlay.classList.remove('hidden');
  body.classList.add('modal-open');
  document.addEventListener('keydown', onDocumentKeydown);
  uploadCancelButton.addEventListener('click', closeModal);
  hashtagField.addEventListener('input', disableSendButton);
  smallerButtonElement.addEventListener('click', onSmallerButtonClick);
  biggerButtonElement.addEventListener('click', onBiggerButtonClick);

};

function closeModal () {
  uploadOverlay.classList.add('hidden');
  body.classList.remove('modal-open');
  document.removeEventListener('keydown', onDocumentKeydown);
  uploadCancelButton.removeEventListener('click', closeModal);
  hashtagField.removeEventListener('input', disableSendButton);
  uploadForm.reset();
  pristine.reset();
  resetZoom();
  resetEffects();
}

const normalizeTags = (tags) => tags.trim().split(' ').filter((tag) => Boolean(tag.length));

const isValidTag = (value) => normalizeTags(value).every((tag) => VALID_SYMBOLS.test(tag));

const isValidTagsCount = (value) => normalizeTags(value).length <= MAX_TAG_COUNT;

const isUniqueTags = (value) => {
  const lowerCaseTags = normalizeTags(value).map((tag) => tag.toLowerCase());
  return lowerCaseTags.length === new Set(lowerCaseTags).size;
};

pristine.addValidator(
  hashtagField,
  isValidTagsCount,
  ErrorText.INVALID_COUNT,
  3,
  true
);

pristine.addValidator(
  hashtagField,
  isValidTag,
  ErrorText.INVALID_PATTERN,
  2,
  true
);

pristine.addValidator(
  hashtagField,
  isUniqueTags,
  ErrorText.NOT_UNIQUE,
  1,
  true
);

const blockSubmitBtn = () => {
  sendFormButton.disabled = true;
  sendFormButton.textContent = SubmitButtonText.SENDING;
};

const unblockSubmitBtn = () => {
  sendFormButton.disabled = false;
  sendFormButton.textContent = SubmitButtonText.IDLE;
};

uploadControl.addEventListener('change', () => {
  openModal();
  showPreviewImg();
});

const setUserFormSubmit = () => {

  uploadForm.addEventListener('submit', (evt) => {
    evt.preventDefault();

    const isValid = pristine.validate();
    if (isValid) {
      blockSubmitBtn();
      const formData = new FormData(evt.target);
      sendData(formData)
        .then(()=>{
          closeModal();
          showSuccessMessage();
        })
        .catch(() => {
          showErrorMessage();
        }
        )
        .finally(unblockSubmitBtn);
    }
  });
};


export {setUserFormSubmit, onDocumentKeydown};
