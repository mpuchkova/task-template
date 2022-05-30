import React from 'react';

/**
* Компонент карточки
* @component
*/ 
export default function Card(props: { title: string; image: string; desc?: string }) {
  return (
    <div className="card">
      <img className="card_image" src={props.image} alt={props.title} />
      <div className="card_title">{props.title}</div>
      <div className="card_desc">{props.desc}</div>
    </div>
  );
}
