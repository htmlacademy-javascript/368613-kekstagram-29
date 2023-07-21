import {thumbnailsList} from './data.js';
import {renderMiniatures} from'./miniatures.js';
import {renderBigPicture} from'./modal-window.js';
import { openForm } from './form.js';
import'./slider.js';

renderMiniatures(thumbnailsList);
renderBigPicture();
openForm();
