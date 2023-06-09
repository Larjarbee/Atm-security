import React, { useState } from 'react';
import Button from './Button';
import { Link, useNavigate } from 'react-router-dom';
import Card from './Card';
import { useParams } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { authActions } from '../store/AuthSlice';

const Home = ({ customer, loading }) => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const customerDetail = customer ?.find((detail) => detail.imageId === id);
  dispatch(authActions.balance(customerDetail ?.balance))

  const authHandler = () => {
    localStorage.removeItem('imageId')
    navigate('/login')
    document.location.reload();
  }

  return (
    <Card>
      {loading ? <p>Loading...</p> : <>
        <h5 className='text-white'>
          WELCOME:
        <span className='pl-3 font-bold text-2xl '>
            {customerDetail ?.firstname ?.toUpperCase()}
          </span>
        </h5>
        <h6 className='mb-3 text-[#5c469c]'>Please select your transaction</h6>
        <div className='background flex justify-between rounded-2xl'>
          <div className='p-10 w-[40%] my-auto space-y-20'>
            <div className='flex items-center gap-5'>
              <Button>
                <Link to='/withdraw'>
                  <span class='material-symbols-outlined'>payments</span>
                </Link>
              </Button>
              <p className='text-white'>Money Withdrawal</p>
            </div>
            <div className='flex items-center gap-5'>
              <Button>
                <Link to='/deposit'>
                  <span class='material-symbols-outlined'>paid</span>
                </Link>
              </Button>
              <p className='text-white'>Money Deposit</p>
            </div>
          </div>
          <div className='backgrounds flex justify-between w-[60%] p-10 rounded-r-2xl'>
            <div className='space-y-20'>
              <div className='text-center'>
                <Button>
                  <Link to='/balance'>
                    <span class='material-symbols-outlined'>account_balance</span>
                  </Link>
                </Button>
                <p className='text-white'>Balance Inquiry</p>
              </div>
              <div className='text-center'>
                <Button>
                  <Link to='/balance'>
                    <span class='material-symbols-outlined'>library_books</span>
                  </Link>
                </Button>
                <p className='text-white'>Fund Transfer</p>
              </div>
            </div>
            <div className='space-y-20'>
              <div className='text-center'>
                <Button>
                  <Link to='/withdraw'>
                    <span class='material-symbols-outlined'>local_atm</span>
                  </Link>
                </Button>
                <p className='text-white'>Bill Payment</p>
              </div>
              <div className='text-center'>
                <Button onClick={authHandler}>
                  <span class='material-symbols-outlined'>logout</span>
                </Button>
                <p className='text-white'>Exit</p>
              </div>
            </div>
          </div>
        </div>
      </>}
    </Card>
  );
};

export default Home;
