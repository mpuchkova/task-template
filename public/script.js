const redirect_uri = "http://localhost:3000/";

const client_id = '4aaa74b856d84cfcb24ddbf77cc57935';
const client_secret = '8a98aad6afc2450a83c2496e2abc395e';

const AUTHORIZE = "https://accounts.spotify.com/authorize";
const TOKEN = "https://accounts.spotify.com/api/token";
const PLAYLISTS = "https://api.spotify.com/v1/me/playlists";


var access_token = null;
var refresh_token = null;

function requestAuthorization(){
    let url = AUTHORIZE;
    url += "?client_id=" + client_id;
    url += "&response_type=code";
    url += "&redirect_uri=" + encodeURI(redirect_uri);
    url += "&show_dialog=true";
    url += "&scope=user-read-private user-read-email user-modify-playback-state user-read-playback-position user-library-read streaming user-read-playback-state user-read-recently-played playlist-read-private playlist-modify-private";
    window.location.href = url; 
}

function onPageLoad(){
    if ( window.location.search.length > 0 ){
        handleRedirect();
    }
}
function handleRedirect(){
    let code = getCode();
    fetchAccessToken( code );
    window.history.pushState("", "", redirect_uri);
}

function fetchAccessToken( code ){
    let body = "grant_type=authorization_code";
    body += "&code=" + code; 
    body += "&redirect_uri=" + encodeURI(redirect_uri);
    body += "&client_id=" + client_id;
    body += "&client_secret=" + client_secret;
    callAuthorizationApi(body);
}

function callAuthorizationApi(body){
    let xhr = new XMLHttpRequest();
    xhr.open("POST", TOKEN, true);
    xhr.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');
    xhr.setRequestHeader('Authorization', 'Basic ' + btoa(client_id + ":" + client_secret));
    xhr.send(body);
    xhr.onload = handleAuthorizationResponse;
}

function handleAuthorizationResponse(){
    if ( this.status == 200 ){
        var data = JSON.parse(this.responseText);
        console.log(data);
        var data = JSON.parse(this.responseText);
        if ( data.access_token != undefined ){
            access_token = data.access_token;
            localStorage.setItem("access_token", access_token);
        }
        if ( data.refresh_token  != undefined ){
            refresh_token = data.refresh_token;
            localStorage.setItem("refresh_token", refresh_token);
        }
        onPageLoad();
    }
    else {
        console.log(this.responseText);
        alert(this.responseText);
    }
}

const $albums = document.querySelector('#albums');

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

async function getAlbums() {
  const limit = 4;
  const token = await getToken();
  try {
    const response = await fetch(
      `https://api.spotify.com/v1/artists/0TnOYISbd1XYRBk9myaseg/albums?include_groups=appears_on&market=ES&limit=${limit}`,
      {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          Authorization: 'Bearer ' + token,
        },
      },
    );
    return response.json();
  } catch (e) {
    console.log(e);
  }
}

const albums = getAlbums();

albums.then((data) => {
  console.log(data.items);
  data.items.forEach((item) => {
    console.log(item);
    $albums.insertAdjacentHTML(
      'beforeend',
      `<div class="card">

    <img class="card_image" src="${item.images[0].url}" alt="${item.name}" />
    <div class="card_title">${item.name}</div>
    <div class="card_autor">${item.release_date}</div>

    </div>`,
    );
  });
});



const $artist = document.querySelector('#artist');

async function getArtist() {
  const token = await getToken();
  const id="smedjan";
  const limit=4;
  try {
    const response = await fetch(
      `https://api.spotify.com/v1/users/${id}/playlists?limit=${limit}`,
      {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          Authorization: 'Bearer ' + token,
        },
      },
    );
    return response.json();
  } catch (e) {
    console.log(e);
  }
}

const artist = getArtist();

artist.then((data) => {
  console.log(data.items);
  data.items.forEach((item) => {
    console.log(item);
    $artist.insertAdjacentHTML(
      'beforeend',
      `<div class="card">

    <img class="card_image" src="${item.images[0].url}" alt="${item.name}" />
    <div class="card_title">${item.name}</div>
    <div class="card_autor">${item.description}</div>
 
    </div>`,
    );
  });
});


const $i = document.querySelector('#i');

async function geti() {
  const token = await getToken();
  const id="31dfsiux6jwrxdnm6jf6urevulhy";
  const limit=4;
  try {
    const response = await fetch(
      `https://api.spotify.com/v1/users/${id}/playlists?limit=${limit}`,
      {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          Authorization: 'Bearer ' + token,
        },
      },
    );
    return response.json();
  } catch (e) {
    console.log(e);
  }
}

const i = geti();

i.then((data) => {
  console.log(data.items);
  data.items.forEach((item) => {
    console.log(item);
    $i.insertAdjacentHTML(
      'beforeend',
      `<div class="card">
 
    <img class="card_image" src="${item.images[0].url}" alt="${item.name}" />
    <div class="card_title">${item.name}</div>
    <div class="card_autor">${item.description}</div>

    </div>`,
    );
  });
});



const $song = document.querySelector('#song');

async function getsong() {
  const token = await getToken();
  const id="spotify";
  const limit=6;
  try {
    const response = await fetch(
      `https://api.spotify.com/v1/users/${id}/playlists?limit=${limit}`,
      {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          Authorization: 'Bearer ' + token,
        },
      },
    );
    return response.json();
  } catch (e) {
    console.log(e);
  }
}

const song = getsong();

song.then((data) => {
  console.log(data.items);
  data.items.forEach((item) => {
    console.log(item);
    $song.insertAdjacentHTML(
      'beforeend',
      `<div class="box">
    
    <img class="box_image" src="${item.images[0].url}" alt="${item.name}" />
    <div class="box_title">${item.name}</div>
    </div>`,
    );
  });
});

const $forme = document.querySelector('#forme');

async function getforme() {
  const token = await getToken();
  const id="4";
  const limit=4;
  try {
    const response = await fetch(
      `https://api.spotify.com/v1/users/${id}/playlists?limit=${limit}`,
      {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          Authorization: 'Bearer ' + token,
        },
      },
    );
    return response.json();
  } catch (e) {
    console.log(e);
  }
}

const forme = getforme();

forme.then((data) => {
  console.log(data.items);
  data.items.forEach((item) => {
    console.log(item);
    $forme.insertAdjacentHTML(
      'beforeend',
      `<div class="card">

    <img class="card_image" src="${item.images[0].url}" alt="${item.name}" />
    <div class="card_title">${item.name}</div>
    <div class="card_autor">${item.description}</div>
   
    </div>`,
    );
  });
});
