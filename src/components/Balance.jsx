import React from 'react';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import Button from './Button';
import Card from './Card';

const Balance = () => {
  const balance = useSelector((state) => state.auth.amount);
  const faceId = useSelector((state) => state.auth.faceId);
  return (
    <Card>
      <div className='background py-10'>
        <h1 className='text-center text-white text-2xl'>Available Balance</h1>
        <h1 className='text-center text-2xl text-white font-bold py-10'>
          N{balance}
        </h1>
        <div className='flex justify-around'>
          <Button>
            <Link to={`/home/${faceId}`}>Yes</Link>
          </Button>
          <Button>
            <Link to='/login'>No</Link>
          </Button>
        </div>
      </div>
    </Card>
  );
};

export default Balance;
