import React, { useState, useRef } from 'react';
import Button from './Button';
import { useDispatch, useSelector } from 'react-redux';
import { authActions } from '../store/AuthSlice';
import { Link } from 'react-router-dom';
import Card from './Card';

const Withdraw = ({ updateAmount, customer }) => {
  const dispatch = useDispatch();
  const [error, setError] = useState(false);
  const balance = useSelector((state) => state.auth.amount);
  const id = localStorage.getItem('imageId')
  const amountWithdrawalRef = useRef(0)

  const customerDetail = customer ?.find((detail) => detail.imageId === id);

  const submitFormHandler = (e) => {
    e.preventDefault();

    const amount = amountWithdrawalRef.current.value;

    if (amount > balance) {
      setError(true)
      return;
    }

    dispatch(authActions.enteredWithdrawalAmount(amount));
    dispatch(authActions.deductBalance(amount));

  };

  return (
    <>
      {error && <div>
        <div className='fixed h-full w-full bg-black top-0 opacity-80' />
        <div className='background py-10 text-center space-y-2 px-32 absolute index-10 top-[22%] left-[32%]'>
          <h3 className='text-white top-[20%] text-2xl'><span class="material-symbols-outlined">
            warning
          </span> Insufficient Funds</h3>
          <Button onClick={() => setError(false)}>Close</Button>
        </div>
      </div>}
      <Card>
        <div className='background py-10'>
          <h5 className='mb-5 text-white text-center'>Please Enter The Withdrawal Amount</h5>
          <form onSubmit={submitFormHandler} className='text-center space-y-5'>
            <input
              type='number'
              min='1'
              ref={amountWithdrawalRef}
              className='p-2'
            />
            <br />
            <div className='flex justify-center space-x-5'>
              <Button>
                <Link to={`/home/${id}`}>
                  Cancel
              </Link>
              </Button>
              <Button onClick={() => updateAmount(customerDetail ?.id, customerDetail ?.balance)}>
                Enter
              </Button>
            </div>

          </form>
        </div>
      </Card>
    </>
  );
};

export default Withdraw;
