import { onDocumentKeydown} from './form.js';
import { closeModal } from './form.js';


const body = document.body;
const successMessageTemplate = document.querySelector('#success').content;
const newSuccessMessage = successMessageTemplate.cloneNode(true);
const successButton = newSuccessMessage.querySelector('.success__button');

const errorMessageTemplate = document.querySelector('#error').content;
const newErrorMessage = errorMessageTemplate.cloneNode(true);
const errorButton = newErrorMessage.querySelector('.error__button');

const createMessages = () => {
  body.append(newSuccessMessage);
  document.querySelector('.success').classList.add('hidden');
  body.append(newErrorMessage);
  document.querySelector('.error').classList.add('hidden');
};

const onDocumentClickSuccess = (evt) => {
  const isClickOnModal = evt.target.dataset.successMessage !== undefined;

  if (!isClickOnModal) {
    evt.preventDefault();

    closeSuccessMessage();
  }
};

const onDocumentSuccessKeydown = (evt) => {
  if(evt.key === 'Escape'){
    evt.preventDefault();
    evt.stopPropagation();
    closeSuccessMessage();
  }
};

function closeSuccessMessage () {
  document.querySelector('.success').classList.add('hidden');
  successButton.removeEventListener('click', closeSuccessMessage);
  document.removeEventListener('keydown', onDocumentSuccessKeydown);
  document.removeEventListener('click', onDocumentClickSuccess);
  document.addEventListener('keydown', onDocumentKeydown);

  closeModal();
}

const showSuccessMessage = () => {
  document.querySelector('.success').classList.remove('hidden');
  successButton.addEventListener('click', closeSuccessMessage);
  document.addEventListener('keydown', onDocumentSuccessKeydown);
  document.addEventListener('click', onDocumentClickSuccess);
  document.removeEventListener('keydown', onDocumentKeydown);

};

const onDocumentClickError = (evt) => {
  const isClickOnModalErr = evt.target.dataset.errorMessage !== undefined;

  if (!isClickOnModalErr) {
    evt.preventDefault();
    closeErrorMessage();
    evt.stopPropagation();


  }
};

const onDocumentErrorKeydown = (evt) => {
  if(evt.key === 'Escape'){
    evt.preventDefault();
    closeErrorMessage();
    evt.stopPropagation();
  }
};

function closeErrorMessage () {
  document.querySelector('.error').classList.add('hidden');
  errorButton.removeEventListener('click', closeErrorMessage);
  document.removeEventListener('keydown', onDocumentErrorKeydown);
  document.removeEventListener('click', onDocumentClickError);
  document.addEventListener('keydown', onDocumentKeydown);
}

const showErrorMessage = () => {
  document.querySelector('.error').classList.remove('hidden');
  errorButton.addEventListener('click', closeErrorMessage);
  document.addEventListener('keydown', onDocumentErrorKeydown);
  document.addEventListener('click', onDocumentClickError);
  document.removeEventListener('keydown', onDocumentKeydown);
};

const showAlert = (message) => {
  const alertContainer = document.createElement('div');
  alertContainer.style.zIndex = '100';
  alertContainer.style.position = 'absolute';
  alertContainer.style.left = '0';
  alertContainer.style.top = '0';
  alertContainer.style.right = '0';
  alertContainer.style.padding = '10px 3px';
  alertContainer.style.fontSize = '30px';
  alertContainer.style.textAlign = 'center';
  alertContainer.style.backgroundColor = 'red';

  alertContainer.textContent = message;

  document.body.append(alertContainer);
};

createMessages();

export {showErrorMessage, showSuccessMessage, showAlert};

