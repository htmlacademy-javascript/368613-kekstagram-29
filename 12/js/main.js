//import {thumbnailsList} from './data.js';
import {renderMiniatures} from'./miniatures.js';
import {renderBigPicture} from'./modal-window.js';
import './form.js';
import'./slider.js';
import { getData } from './api.js';
import { setUserFormSubmit } from './form.js';
import { showSuccessMessage, showErrorMessage, showAlert } from './alerts.js';
import { debounce } from './util.js';
import {showSorting, reGenerateMiniatures, setBtnClick, TYME_OUT_OF_DELAY} from './sort.js';

getData()
  .then((data) => {
    renderMiniatures(data);
    showSorting();
    setBtnClick(debounce((btn) => {
      reGenerateMiniatures(data, btn);
    }, TYME_OUT_OF_DELAY));
    renderBigPicture(data);
  })
  .catch(
    (err) => {
      showAlert(err.message);
    }
  );
//openForm();
setUserFormSubmit(showSuccessMessage,showErrorMessage);
