import React from 'react';

const Time = ({createdAt}) => {
  const date = new Date(createdAt);
  return `${date.toLocaleDateString()} às ${date.toLocaleTimeString()}`;
}

export default Time;