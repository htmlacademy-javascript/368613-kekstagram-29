import { createPhotos } from './data.js';
import { getMiniatures } from './miniatures.js';
import {renderBigPicture} from './modal-window.js';

getMiniatures(createPhotos());
renderBigPicture();
