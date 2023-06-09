import React from 'react';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import Button from './Button';
import Card from './Card';

const Balance = () => {
  const navigate = useNavigate()
  const balance = useSelector((state) => state.auth.amount);
  const faceId = localStorage.getItem('imageId')

  const homeHandler = () => {
    navigate(`/home/${faceId}`)
    document.location.reload();
  }
  const authHandler = () => {
    localStorage.removeItem('imageId')
    navigate('/login')
    document.location.reload();
  }
  return (
    <Card>
      <div className='background py-10'>
        <h1 className='text-center text-white text-2xl'>Available Balance</h1>
        <h1 className='text-center text-2xl text-white font-bold py-10'>
          ₦ {balance ?.toLocaleString('en-US')}
        </h1>

        <div className='text-center backgrounds w-2/3 mx-auto rounded-lg p-5'>
          <h3 className='mb-5 text-white'>Did you want to perform another transaction?</h3>

          <div className='flex justify-center space-x-5'>
            <Button onClick={homeHandler}>
              Yes
          </Button>
            <Button onClick={authHandler}>
              No
          </Button>
          </div>
        </div>
      </div>
    </Card>
  );
};

export default Balance;
