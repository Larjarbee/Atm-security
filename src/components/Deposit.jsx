import React from 'react';
import Button from './Button';
import { useDispatch } from 'react-redux';
import { authActions } from '../store/AuthSlice';
import { useNavigate, Link } from 'react-router-dom';
import Card from './Card';

const Deposit = ({ updateAmountDeposit, customer, amountDeposit, setAmountDeposit }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const id = localStorage.getItem('imageId')

  const customerDetail = customer ?.find((detail) => detail.imageId === id);

  const submitFormHandler = (e) => {
    e.preventDefault();

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
            value={amountDeposit}
            onChange={(e) => setAmountDeposit(e.target.value)}
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
