import React from 'react';

/*
*Компонент для футера
*@component
*/ 
export default function Footer() {
  return (
    <footer className="footer">
      <div className="current">
        <div className="current-items">
          <img className="current-items_image" src="./images/2type.png" alt="img" />
          <div className="current-items_info">
            <h3 className="current-items__info__title">2 типа людей</h3>
            <p className="current-items__info__description">Макс Корж</p>
          </div>
        </div>
      </div>
      <div className="control">
        <div className="control-items">
          <div className="control-items__button1"></div>
          <div className="control-items__button1"></div>
          <div className="control-items__button1"></div>
        </div>
      </div>
    </footer>
  );
}
