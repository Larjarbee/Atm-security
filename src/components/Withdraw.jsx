import React, { useState } from 'react';
import Button from './Button';
import { useDispatch } from 'react-redux';
import { authActions } from '../store/AuthSlice';
import { useNavigate } from 'react-router-dom';
import Card from './Card';

const Withdraw = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [amount, setAmount] = useState(0);

  const submitFormHandler = (e) => {
    e.preventDefault();

    dispatch(authActions.deductBalance(amount));
    navigate('/balance');
  };

  return (
    <Card>
      <div className='background py-10'>
        <form onSubmit={submitFormHandler} className='text-center space-y-5'>
          <input
            type='number'
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
            className='p-2'
          />
          <br />
          <Button>Enter</Button>
        </form>
      </div>
    </Card>
  );
};

export default Withdraw;
