import React from 'react';

const Button = (props) => {
  return (
    <button
      className='pt-2 px-3 items-center rounded-full hover:opacity-60'
      onClick={props.onClick}
    >
      {props.children}
    </button>
  );
};

export default Button;
