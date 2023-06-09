import React from 'react';

const Card = (props) => {
  return (
    <section className='w-1/2 rounded-lg mx-auto mt-10 p-10'>
      {props.children}
    </section>
  );
};

export default Card;
