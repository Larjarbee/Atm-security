import React, { useState } from 'react';
import Button from './Button';
import { Link, useNavigate } from 'react-router-dom';
import Card from './Card';
import { useFetch } from '../hooks/useCustomer';

const Deposit = () => {
  const id = localStorage.getItem('imageId');
  const [msg, setMsg] = useState(false);
  const navigate = useNavigate();

  const { amountDeposit, setAmountDeposit, customer, updateAmountDeposit } =
    useFetch();

  const customerDetail = customer ?.find((detail) => detail.imageId === id);

  const submitFormHandler = (e) => {
    e.preventDefault();

    setMsg(true);
    setAmountDeposit(0);
  };

  const homeHandler = () => {
    navigate(`/home/${id}`);
    document.location.reload();
  };
  const authHandler = () => {
    localStorage.removeItem('imageId');
    navigate('/login');
    document.location.reload();
  };

  return (
    <Card>
      {!msg && (
        <div className='background py-10'>
          <h5 className='mb-5 text-white text-center'>
            Please Enter Amount To Deposit
          </h5>
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
                <Link to={`/home/${id}`}>Cancel</Link>
              </Button>
              <Button
                onClick={() =>
                  updateAmountDeposit(
                    customerDetail ?.id,
                    customerDetail ?.balance
                  )
                }
              >
                Enter
              </Button>
            </div>
          </form>
        </div>
      )}
      {msg && (
        <div className='text-center backgrounds w-2/3 mx-auto rounded-lg p-5'>
          <h3 className='mb-5 text-white'>
            Transaction Successful. Did you want to perform another transaction?
          </h3>

          <div className='flex justify-center space-x-5'>
            <Button onClick={homeHandler}>Yes</Button>
            <Button onClick={authHandler}>No</Button>
          </div>
        </div>
      )}
    </Card>
  );
};

export default Deposit;
