const DEFAULT_SCALE = 100;
const SCALE_STEP = 25;
const MIN_SCALE = 25;
const MAX_SCALE = 100;

const modalElement = document.querySelector ('.img-upload');
const smallerButtonElement = modalElement.querySelector('.scale__control--smaller');
const biggerButtonElement = modalElement.querySelector('.scale__control--bigger');
const scaleFieldElement = modalElement.querySelector('.scale__control--value');
const imageElement = modalElement.querySelector('.img-upload__preview img');

let currentScaleValue = parseInt(scaleFieldElement.value, 10);

const scaleImage = (value) => {
  imageElement.style.transform = `scale(${value / 100})`;
  scaleFieldElement.value = `${value}%`;
};

const onSmallerButtonClick = () => {
  currentScaleValue -= SCALE_STEP;
  if (currentScaleValue < MIN_SCALE) {
    currentScaleValue = MIN_SCALE;
  }
  scaleImage(currentScaleValue);
};

const onBiggerButtonClick = () => {
  currentScaleValue += SCALE_STEP;
  if (currentScaleValue > MAX_SCALE) {
    currentScaleValue = MAX_SCALE;
  }
  scaleImage(currentScaleValue);
};

const resetZoom = () => scaleImage(DEFAULT_SCALE);

smallerButtonElement.addEventListener('click', onSmallerButtonClick);
biggerButtonElement.addEventListener('click', onBiggerButtonClick);

export {resetZoom, imageElement};
