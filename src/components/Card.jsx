import React from 'react';

const Card = (props) => {
  return (
    <section className='w-1/2 rounded-2xl mx-auto mt-24 p-10'>
      {props.children}
    </section>
  );
};

export default Card;
