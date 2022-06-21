import axios from 'axios';
import { useEffect, useState } from 'react';
import { ApiConstroller } from './ApiConstroller';

interface IImage {
  url: string;
}

interface IContent {
  id: string;
  name: string;
  release_date?: string;
  description?: string;
  images: IImage[];
}

/**
 * Получение данных
 * @returns {string} Результат запроса с данными
 */
export function useRequest(url: string) {
  const [data, setData] = useState<IContent[]>([]);
  const token = ApiConstroller();

  useEffect(() => {
    const headers = {
      'Content-Type': 'application/json',
      Authorization: 'Bearer ' + token,
    };

    async function fetch() {
      await axios
        .get(url, {
          headers: headers,
        })
        .then((response) => {
          setData(response.data.items);
        })
        .catch((error) => {
          console.log(error);
        });
    }

    if (token) {
      fetch();
    }
  }, [url, token]);

  return data;
}
