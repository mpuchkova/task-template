const client_id = '4aaa74b856d84cfcb24ddbf77cc57935';
const client_secret = '8a98aad6afc2450a83c2496e2abc395e';
const ARTIST = document.querySelector('#artist');
const ALBUMS = document.querySelector('#albums');
const ABOUTME = document.querySelector('#aboutme');
const SONG = document.querySelector('#song');
const FORM = document.querySelector('#form');

///справится с записью в куки не смогла
/**
 * получение токена
 * @returns acess_token
 */
async function getToken() {
  try {
    const response = await fetch('https://accounts.spotify.com/api/token', {
      method: 'POST',
      body: 'grant_type=client_credentials',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
        Authorization: 'Basic ' + btoa(client_id + ':' + client_secret),
      },
    });
    const token = await response.json();
    return token.access_token;
  } catch (e) {
    console.log(e);
  }
}

/**
 * 
 * @param {ссылка дляполучения информации} url 
 * @param {метоД, который вызывается} method 
 * @returns 
 */
const request = async (url, method) => {
  const token = await getToken();
  const headers = {
    'Content-Type': 'application/json',
    Authorization: `Bearer ` + token,
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
};

/**
 * 
 * @returns url and method
 */
async function getAlbums() {
  const var_url = `https://api.spotify.com/v1/artists/0TnOYISbd1XYRBk9myaseg/albums?include_groups=appears_on&market=ES&limit=4`;
  return await request(var_url, 'GET');
}

const albums = getAlbums();

albums.then((data) => {
  data.items.forEach((item) => {
    ALBUMS.insertAdjacentHTML(
      'beforeend',
      `<div class="card">
    <img class="card_image" src="${item.images[0].url}" alt="${item.name}" />
    <div class="card_title">${item.name}</div>
    <div class="card_autor">${item.release_date}</div>

    </div>`,
    );
  });
});

/**
 * 
 * @returns url and method
 */
async function getArtist() {
  const var_url = `https://api.spotify.com/v1/users/smedjan/playlists?limit=4`;
  return await request(var_url, 'GET');
}

const artist = getArtist();

artist.then((data) => {
  data.items.forEach((item) => {
    ARTIST.insertAdjacentHTML(
      'beforeend',
      `<div class="card">

    <img class="card_image" src="${item.images[0].url}" alt="${item.name}" />
    <div class="card_title">${item.name}</div>
    <div class="card_autor">${item.description}</div>

    </div>`,
    );
  });
});

/**
 * 
 * @returns url and method
 */
async function getAboutMe() {
  const var_url = `https://api.spotify.com/v1/users/31dfsiux6jwrxdnm6jf6urevulhy/playlists?limit=4`;
  return await request(var_url, 'GET');
}

const aboutMe = getAboutMe();

aboutMe.then((data) => {
  data.items.forEach((item) => {
    ABOUTME.insertAdjacentHTML(
      'beforeend',
      `<div class="card">

    <img class="card_image" src="${item.images[0].url}" alt="${item.name}" />
    <div class="card_title">${item.name}</div>
    <div class="card_autor">${item.description}</div>

    </div>`,
    );
  });
});

/**
 * 
 * @returns url and method
 */
async function getSong() {
  const var_url = `https://api.spotify.com/v1/users/spotify/playlists?limit=6`;
  return await request(var_url, 'GET');
}

const song = getSong();

song.then((data) => {
  data.items.forEach((item) => {
    SONG.insertAdjacentHTML(
      'beforeend',
      `<div class="box">
    <img class="box_image" src="${item.images[0].url}" alt="${item.name}" />
    <div class="box_title">${item.name}</div>
    </div>`,
    );
  });
});

/**
 * 
 * @returns url and method
 */
async function getForm() {
  const var_url = `https://api.spotify.com/v1/users/4/playlists?limit=4`;
  return await request(var_url, 'GET');
}

const form = getForm();

form.then((data) => {
  data.items.forEach((item) => {
    FORM.insertAdjacentHTML(
      'beforeend',
      `<div class="card">
    <img class="card_image" src="${item.images[0].url}" alt="${item.name}" />
    <div class="card_title">${item.name}</div>
    <div class="card_autor">${item.description}</div>

    </div>`,
    );
  });
});