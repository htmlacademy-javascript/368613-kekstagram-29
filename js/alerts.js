const successTemplate = document.querySelector('#success').content.querySelector('.success');
const errorTemplate = document.querySelector('#error').content.querySelector('.error');

const onDocumentKeydown = (evt,cb) => {
  if (evt.key === 'Escape') {
    evt.preventDefault();
    evt.stopPropagation();
    cb();
  }
};

const onSuccessDocumentClick = (evt) => {
  evt.preventDefault();
  const isClickOnModalSuccess = evt.target.dataset.successMessage !== undefined;

  if (!isClickOnModalSuccess) {
    closeSuccessMessage();
  }
};
const onSuccesButtonClick = () => closeSuccessMessage();
const onCloseSuccessMessage = (evt) => onDocumentKeydown(evt,closeSuccessMessage);
function closeSuccessMessage () {
  document.body.querySelector('.success').remove();
  document.body.removeEventListener('click',onSuccessDocumentClick);
  document.body.removeEventListener('keydown', onCloseSuccessMessage);
}
const showSuccessMessage = () => {
  const successElement = successTemplate.cloneNode(true);
  document.body.append(successElement);
  successElement.querySelector('.success__button').addEventListener('click', onSuccesButtonClick);
  document.body.addEventListener('click',onSuccessDocumentClick);
  document.body.addEventListener('keydown',onCloseSuccessMessage);
};

const onErrorDocumentClick = (evt) => {
  evt.preventDefault();
  const isClickOnModalError = evt.target.dataset.errorMessage !== undefined;

  if (!isClickOnModalError) {
    closeErrorMessage();
  }
};
const onErrorButtonclick = () => closeErrorMessage();
const onCloseErrorMessage = (evt) => onDocumentKeydown(evt,closeErrorMessage);
function closeErrorMessage () {
  document.body.querySelector('.error').remove();
  document.body.classList.remove('modal-open');
  document.body.removeEventListener('click',onErrorDocumentClick);
  document.removeEventListener('keydown', onCloseErrorMessage);
}

const showErrorMessage = () => {
  const errorElement = errorTemplate.cloneNode(true);
  const errorButton = errorElement.querySelector('.error__button');
  document.body.append(errorElement);
  document.body.classList.add('modal-open');
  errorButton.addEventListener('click',onErrorButtonclick);
  document.body.addEventListener('keydown',onCloseErrorMessage);
  document.body.addEventListener('click',onErrorDocumentClick);

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

export{showSuccessMessage, showErrorMessage, showAlert};
