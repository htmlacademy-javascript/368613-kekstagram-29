import {getRandomInteger} from './util.js';
import {renderMiniatures} from './miniatures.js';

const Filter = {
  DEFAULT: 'filter-default',
  RANDOM: 'filter-random',
  DISCUSSED: 'filter-discussed',
};

const MAX_RANDOM_MINIATURES = 10;

const TYME_OUT_OF_DELAY = 500;

const sortContainer = document.querySelector('.img-filters');
const defaultSort = document.querySelector('#filter-default');
const btnSortForm = document.querySelector('.img-filters__form');
const buttons = btnSortForm.children;
const randomSort = document.querySelector('#filter-random');
const discussSort = document.querySelector('#filter-discussed');

const activeSortClass = 'img-filters__button--active';

const showSorting = () => {
  sortContainer.classList.remove('img-filters--inactive');
};

const deleteMiniatures = () => {
  const personalMiniatures = document.querySelectorAll('.picture');
  if (personalMiniatures) {
    personalMiniatures.forEach((personalMiniature) => {
      personalMiniature.remove();
    });
  }
};

const sortRandomMiniatures = (arr) => {
  const newRandomMiniatures = arr.sort(getRandomInteger);

  return newRandomMiniatures.slice(0, MAX_RANDOM_MINIATURES);
};

const sortDiscussMiniatures = (arr) => arr.slice().sort((arrItemA, arrItemB) => arrItemB.comments.length - arrItemA.comments.length);

const renderDefaultMiniatures = (arr) => {
  deleteMiniatures();
  renderMiniatures(arr);
};

const renderRandomMiniatures = (arr) => {
  deleteMiniatures();
  renderMiniatures(sortRandomMiniatures(arr));
};

const renderDiscussMiniatures = (arr) => {
  deleteMiniatures();
  renderMiniatures(sortDiscussMiniatures(arr));
};

const setBtnClick = (cb) => {
  for (const btn of buttons) {
    btn.addEventListener('click', () => {
      cb(btn);
    });
  }
};

const reGenerateMiniatures = (arr, btn) => {
  if (btn.id === Filter.RANDOM) {
    renderRandomMiniatures(arr);
    randomSort.classList.add(activeSortClass);
    defaultSort.classList.remove(activeSortClass);
    discussSort.classList.remove(activeSortClass);
  }

  if (btn.id === Filter.DISCUSSED) {
    renderDiscussMiniatures(arr);
    discussSort.classList.add(activeSortClass);
    defaultSort.classList.remove(activeSortClass);
    randomSort.classList.remove(activeSortClass);
  }

  if (btn.id === Filter.DEFAULT) {
    renderDefaultMiniatures(arr);
    defaultSort.classList.add(activeSortClass);
    discussSort.classList.remove(activeSortClass);
    randomSort.classList.remove(activeSortClass);
  }
};

export {showSorting, reGenerateMiniatures, setBtnClick, TYME_OUT_OF_DELAY};
