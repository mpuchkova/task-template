import axios from 'axios';
import { useEffect, useState } from 'react';
import { client_id, client_secret } from '../clientID';
import { getCookie } from './getCookie';
import { setCookie } from './setCookie';

/**
 * Получение токена
 * @returns {string} Значение токена
 */
export function ApiConstroller() {
  const [cookies, setCookies] = useState('');
  const [token, setToken] = useState('');

  useEffect(() => {
    const data = new URLSearchParams();

    const headers = {
      'Content-Type': 'application/x-www-form-urlencoded',
      Authorization: 'Basic ' + btoa(client_id + ':' + client_secret),
    };
    data.append('grant_type', 'client_credentials');

    setCookies(getCookie());

    async function fetch() {
      await axios
        .post('https://accounts.spotify.com/api/token', data, {
          headers: headers,
        })
        .then((response) => {
          setCookie('token', response.data.access_token, { 'max-age': response.data.expires_in });
        })
        .catch((error) => {
          console.log(error);
        });
    }

    if (!cookies) {
      fetch();
    }
    setToken(cookies);
  }, [cookies]);

  return token;
}
