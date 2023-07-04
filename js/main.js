import { thumbnailsList } from './data.js';
import { getMiniatures } from './miniatures.js';
import {renderBigPicture} from './modal-window.js';


renderBigPicture(getMiniatures(thumbnailsList));
