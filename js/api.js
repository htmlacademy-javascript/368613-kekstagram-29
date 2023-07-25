import { showErrorMessage, showAlert } from './alerts.js';

const BASE_URL = 'https://29.javascript.pages.academy/ekstagram';
const DATA_URL = '/data';

const Method = {
  GET: 'GET',
  POST: 'POST',
};

const load = (route, onFail, method = Method.GET, body = null) =>
  fetch(route, {method, body})
    .then((response) => {
      if (!response.ok) {
        throw new Error();
      }
      return response.json();
    })
    .catch(() => {
      onFail();
    });

const getData = () => load(`${BASE_URL}${DATA_URL}`, showAlert);

const sendData = (body) => load(`${BASE_URL}`, showErrorMessage, Method.POST, body);

export {getData, sendData};

