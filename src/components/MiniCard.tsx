import React from 'react';

export default function MiniCard(props: { title: string; image: string }) {
  return (
    <div className="box">
      <img className="box_image" src={props.image} alt={props.title} />
      <div className="box_title">{props.title}</div>
    </div>
  );
}
