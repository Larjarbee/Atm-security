import React, { useEffect } from 'react';
// import img from '../../assets/nacomes.jfif';
import Button from './Button';
import { Link } from 'react-router-dom';
import Card from './Card';

const Home = ({ enteredEmailRef }) => {
  const email = enteredEmailRef;

  useEffect(() => {
    const fetchCustomer = async () => {
      const res = await fetch(
        'https://atm-project-e9197-default-rtdb.firebaseio.com/customers.json'
      );
      const data = await res.json();
      console.log(data);
    };

    fetchCustomer();
  }, []);
  return (
    <Card>
      <h1 className=' text-2xl mb-5 text-white'>WELCOME: {email}</h1>
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
              <Link to='/withdraw'>
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
              <Button>
                <Link to='/login'>
                  <span class='material-symbols-outlined'>logout</span>
                </Link>
              </Button>
              <p className='text-white'>Exit</p>
            </div>
          </div>
        </div>
      </div>
    </Card>
  );
};

export default Home;
