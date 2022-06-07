const client_id = '4aaa74b856d84cfcb24ddbf77cc57935';
const client_secret = '8a98aad6afc2450a83c2496e2abc395e';
const ARTIST = document.querySelector('#artist');
const ALBUMS = document.querySelector('#albums');
const ABOUTME = document.querySelector('#aboutme');
const SONG = document.querySelector('#song');
const FORM = document.querySelector('#form');

/**
 * Получение куки
 * @returns {string} Значение куки
 */
function getCookie() {
  const cookieName = 'token';
  const name = cookieName + '=';
  const cDecoded = decodeURIComponent(document.cookie);
  const cArr = cDecoded.split('; ');
  let res;
  cArr.forEach((val) => {
    if (val.indexOf(name) === 0) res = val.substring(name.length);
  });

  return res;
}

/**
 * Запись куки
 * @param {string} name Название куки
 * @param {string} value Значение куки
 * @param {object} options Дополнительные параметры
 */
function setCookie(name, value, options = {}) {
  options = {
    path: '/',
    SameSite: null,
    ...options,
  };

  if (options.expires instanceof Date) {
    options.expires = options.expires.toUTCString();
  }

  let updatedCookie = encodeURIComponent(name) + '=' + encodeURIComponent(value);

  for (let optionKey in options) {
    updatedCookie += '; ' + optionKey;
    let optionValue = options[optionKey];
    if (optionValue !== true) {
      updatedCookie += '=' + optionValue;
    }
  }

  document.cookie = updatedCookie;
}

/**
 * Получение токена
 * @returns {string} Токен
 */
async function getToken() {
  if (getCookie()) {
    return getCookie();
  } else {
    try {
      const response = await fetch('https://accounts.spotify.com/api/token', {
        method: 'POST',
        body: 'grant_type=client_credentials',
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded',
          Authorization: 'Basic ' + btoa(client_id + ':' + client_secret),
        },
      });
      const res = await response.json();
      setCookie('token', res.access_token, { 'max-age': res.expires_in });

      return getCookie();
    } catch (e) {
      console.log(e);
    }
  }
}

/**
 * Отправка запроса
 * @param {string} url Адрес запроса
 * @param {string} method Метод запроса
 * @returns {object} Ответ на запрос
 */
async function request(url, method = 'GET') {
  const token = await getToken();
  const headers = {
    'Content-Type': 'application/json',
    Authorization: 'Bearer ' + token,
  };

  try {
    const response = await fetch(url, {
      method: method,
      headers: headers,
    });

    return response.json();
  } catch (err) {
    console.error('Error', err);
  }
}

/**
 * Создание карточки
 * @param {object} response Результат  запроса
 * @param {HTMLElement} element Элемент для вставки контента
 */
function createCards(response, element) {
  response.then((data) => {
    data.items.forEach((item) => {
      element.insertAdjacentHTML(
        'beforeend',
        `<div class="card">
          <img class="card_image" src="${item.images[0].url}" alt="${item.name}" />
          <div class="card_title">${item.name}</div>
          <div class="card_autor">${item.release_date}</div>
        </div>`,
      );
    });
  });
}

/**
 * Создание мини карточки
 * @param {object} response Результат  запроса
 * @param {HTMLElement} element Элемент для вставки контента
 */
function createCardsMini(response, element) {
  response.then((data) => {
    data.items.forEach((item) => {
      element.insertAdjacentHTML(
        'beforeend',
        `<div class="box">
          <img class="box_image" src="${item.images[0].url}" alt="${item.name}" />
          <div class="box_title">${item.name}</div>
        </div>`,
      );
    });
  });
}

createCards(
  request(
    'https://api.spotify.com/v1/artists/0TnOYISbd1XYRBk9myaseg/albums?include_groups=appears_on&market=ES&limit=4',
  ),
  ALBUMS,
);
createCards(
  request('https://api.spotify.com/v1/users/31dfsiux6jwrxdnm6jf6urevulhy/playlists?limit=4'),
  ABOUTME,
);
createCards(request('https://api.spotify.com/v1/users/smedjan/playlists?limit=4'), ARTIST);
createCards(request('https://api.spotify.com/v1/users/4/playlists?limit=4'), FORM);
createCardsMini(request('https://api.spotify.com/v1/users/spotify/playlists?limit=6'), SONG);