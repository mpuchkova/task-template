import Header from './components/Header';
import Menu from './components/Menu';
import Footer from './components/Footer';
import MiniCard from './components/MiniCard';
import Card from './components/Card';

import { useRequest } from './utils/useRequest';

function App() {
  const albums = useRequest(
    'https://api.spotify.com/v1/artists/0TnOYISbd1XYRBk9myaseg/albums?include_groups=appears_on&market=ES&limit=5',
  );
  const artists = useRequest('https://api.spotify.com/v1/users/smedjan/playlists?limit=5');
  const songs = useRequest('https://api.spotify.com/v1/users/spotify/playlists?limit=5');

  return (
    <div className="App">
      <Header />
      <Menu />
      <main className="section-playlist">
        {!!albums && !!artists && !!songs && (
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
        )}
      </main>
      <Footer />
    </div>
  );
}

export default App;
