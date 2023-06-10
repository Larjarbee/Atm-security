import React, { useRef } from 'react';
import Button from './Button';
import { useDispatch } from 'react-redux';
import { authActions } from '../store/AuthSlice';
import { Link } from 'react-router-dom';
import Card from './Card';

const Deposit = ({ updateAmountDeposit, customer }) => {
  const dispatch = useDispatch();
  const id = localStorage.getItem('imageId')
  const amountDepositRef = useRef(0)


  const customerDetail = customer ?.find((detail) => detail.imageId === id);

  const submitFormHandler = (e) => {
    e.preventDefault();

    const amountDeposit = amountDepositRef.current.value;

    dispatch(authActions.enteredDepositAmount(amountDeposit));
    dispatch(authActions.increaseBalance(amountDeposit));
  };

  return (
    <Card>
      <div className='background py-10'>
        <h5 className='mb-5 text-white text-center'>Please Enter The Amount</h5>
        <form onSubmit={submitFormHandler} className='text-center space-y-5'>
          <input
            type='number'
            min='1'
            ref={amountDepositRef}
            className='p-2'
          />
          <br />
          <div className='flex justify-center space-x-5'>
            <Button>
              <Link to={`/home/${id}`}>
                Cancel
              </Link>
            </Button>
            <Button onClick={() => updateAmountDeposit(customerDetail ?.id, customerDetail ?.balance)}>
              Enter
            </Button>
          </div>

        </form>
      </div>
    </Card>
  );
};

export default Deposit;
