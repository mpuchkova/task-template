import React from 'react';

import MenuItem from './MenuItem';

/**
* Компонент общего меню
* @component
*/ 
export default function Menu() {
  return (
    <div className="border">
      <img className="picture" src="./images/spotify.svg" alt="img" />
      <div className="main_list">
        <div className="main_box">
          <MenuItem title="Главная" image="./images/home_filled.svg" />
          <MenuItem title="Поиск" image="./images/Vector.svg" />
          <MenuItem title="Моя медиатека" image="./images/Library_big.svg" />
        </div>
      </div>
      <div className="main_list">
        <div className="main_box">
          <MenuItem title="Создать плейлист" image="./images/plus.svg" />
          <MenuItem title="Любимые треки" image="./images/repit.svg" />
        </div>
      </div>
    </div>
  );
}
