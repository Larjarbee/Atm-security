import React, { useState } from 'react';
import Button from './Button';
import { useSelector } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import Card from './Card';
import { useFetch } from '../hooks/useCustomer';

const Withdraw = () => {
  const { amount, setAmount, customer, updateAmount } = useFetch();
  const [error, setError] = useState(false);
  const [msg, setMsg] = useState(false);
  const balance = useSelector((state) => state.auth.amount);
  const id = localStorage.getItem('imageId');
  const navigate = useNavigate();

  const customerDetail = customer?.find((detail) => detail.imageId === id);

  const submitFormHandler = (e) => {
    e.preventDefault();

    if (amount > balance) {
      setError(true);
      return;
    }

    setMsg(true);
    setAmount(0);
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
    <>
      {error && (
        <div>
          <div className='fixed h-full w-full bg-black top-0 opacity-80' />
          <div className='background py-10 text-center space-y-2 px-32 absolute index-10 top-[22%] left-[32%]'>
            <h3 className='text-white top-[20%] text-2xl'>
              <span class='material-symbols-outlined'>warning</span>{' '}
              Insufficient Funds
            </h3>
            <Button onClick={() => setError(false)}>Close</Button>
          </div>
        </div>
      )}
      <Card>
        {!msg && (
          <div className='background py-10'>
            <h5 className='mb-5 text-white text-center'>
              Please Enter The Withdrawal Amount
            </h5>
            <form
              onSubmit={submitFormHandler}
              className='text-center space-y-5'
            >
              <input
                type='number'
                min='1'
                value={amount}
                onChange={(e) => setAmount(e.target.value)}
                className='p-2'
              />
              <br />
              <div className='flex justify-center space-x-5'>
                <Button>
                  <Link to={`/home/${id}`}>Cancel</Link>
                </Button>
                <Button
                  onClick={() =>
                    updateAmount(customerDetail?.id, customerDetail?.balance)
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
              Transaction Successful. Did you want to perform another
              transaction?
            </h3>

            <div className='flex justify-center space-x-5'>
              <Button onClick={homeHandler}>Yes</Button>
              <Button onClick={authHandler}>No</Button>
            </div>
          </div>
        )}
      </Card>
    </>
  );
};

export default Withdraw;
