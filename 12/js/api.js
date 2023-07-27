const getData = () => fetch(
  'https://29.javascript.pages.academy/kekstagram/data')
  .then((response) => {
    if (!response.ok) {
      throw new Error();
    }
    return response.json();
  })
  .catch(() => {
    throw new Error('Не удалось загрузить данные. Попробуйте обновить страницу');
  });

const sendData = (body) => fetch(
  'https://29.javascript.pages.academy/kekstagram',
  {
    method: 'POST',
    body,
  })
  .then((response) => {
    if (!response.ok) {
      throw new Error();
    }
  });


export { getData , sendData };
/*const Method = {
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

export {getData, sendData};*/

