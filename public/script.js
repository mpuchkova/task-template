var redirect_uri = "http://localhost:3000/";

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

function getCode(){
    let code = null;
    const queryString = window.location.search;
    if ( queryString.length > 0 ){
        const urlParams = new URLSearchParams(queryString);
        code = urlParams.get('code')
    }
    return code;
}

///Get Current User's Profile
async function getUserProfile(){
    access_token = localStorage.getItem('access_token');
    const headers ={
        'Content-Type': 'application/json',
        Autorization : `Bearer ${access_token}`,
    };

    try{
        const response = await fetch(`https://api.spotify.com/v1/me`,{
            method: 'GET',
            headers: headers,
        });

        const user = await response.json();
        
        return user.id;
    }   catch (err){
        console.error('Error',err);
    }
};

async function getUserPlaylists(){
    access_token = localStorage.getItem('access_token');
    const headers ={
        'Content-Type': 'application/json',
        Autorization : `Bearer ${access_token}`,
    };

    try{
        const response = await fetch(`https://api.spotify.com/v1/me/playlists?limit=5`,{
            method: 'GET',
            headers: headers,
        });
        
        return response.json();
    }   catch (err){
        console.error('Error',err);
    }
};
