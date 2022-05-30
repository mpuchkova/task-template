import React from 'react';

export default function MenuItem(props: { title: string; image: string }) {
  return (
    <div className="left_box">
      <img className="image" src={props.image} alt={props.title} />
      <div className="main_list">{props.title}</div>
    </div>
  );
}
