import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { client_id, client_secret } from './clientID';
import Header from './components/Header';
import Menu from './components/Menu';
import Footer from './components/Footer';
import MiniCard from './components/MiniCard';
import Card from './components/Card';

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

function App() {
  const [token, setToken] = useState('');
  const [albums, setAlbums] = useState<IContent[]>([]);
  const [artists, setArtists] = useState<IContent[]>([]);
  const [songs, setSongs] = useState<IContent[]>([]);

  useEffect(() => {
    const data = new URLSearchParams();
    const headers = {
      'Content-Type': 'application/x-www-form-urlencoded',
      Authorization: 'Basic ' + btoa(client_id + ':' + client_secret),
    };
    data.append('grant_type', 'client_credentials');

    axios
      .post('https://accounts.spotify.com/api/token', data, {
        headers: headers,
      })
      .then((response) => {
        setToken(response.data.access_token);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  useEffect(() => {
    const headers = {
      'Content-Type': 'application/json',
      Authorization: 'Bearer ' + token,
    };

    axios
      .get(
        'https://api.spotify.com/v1/artists/0TnOYISbd1XYRBk9myaseg/albums?include_groups=appears_on&market=ES&limit=5',
        {
          headers: headers,
        },
      )
      .then((response) => {
        setAlbums(response.data.items);
      })
      .catch((error) => {
        console.log(error);
      });
  }, [token]);

  useEffect(() => {
    const headers = {
      'Content-Type': 'application/json',
      Authorization: 'Bearer ' + token,
    };

    axios
      .get('https://api.spotify.com/v1/users/smedjan/playlists?limit=5', {
        headers: headers,
      })
      .then((response) => {
        setArtists(response.data.items);
      })
      .catch((error) => {
        console.log(error);
      });
  }, [token]);

  useEffect(() => {
    const headers = {
      'Content-Type': 'application/json',
      Authorization: 'Bearer ' + token,
    };

    axios
      .get('https://api.spotify.com/v1/users/spotify/playlists?limit=5', {
        headers: headers,
      })
      .then((response) => {
        setSongs(response.data.items);
      })
      .catch((error) => {
        console.log(error);
      });
  }, [token]);

  return (
    <div className="App">
      <Header />
      <Menu />
      <main className="section-playlist">
        {token ? (
          <>
            <h1 className="good_evening">Добрый вечер</h1>
            <div className="boxes">
              {songs.map(({ id, name, images }) => {
                return <MiniCard key={id} title={name} image={images[0].url} />;
              })}
            </div>
            <h1 className="your_content">Твои шоу</h1>
            <div className="cards">
              {albums.map(({ id, name, release_date, images }) => {
                return <Card key={id} title={name} image={images[0].url} desc={release_date} />;
              })}
            </div>
            <h1 className="your_content">Плейлисты</h1>
            <div className="cards">
              {artists.map(({ id, name, description, images }) => {
                return <Card key={id} title={name} image={images[0].url} desc={description} />;
              })}
            </div>
          </>
        ) : (
          <div>Ничего не найдено</div>
        )}
      </main>
      <Footer />
    </div>
  );
}

export default App;
