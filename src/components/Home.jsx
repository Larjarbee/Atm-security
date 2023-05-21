import React, { useEffect, useState } from 'react';
// import img from '../../assets/nacomes.jfif';
import Button from './Button';
import { Link } from 'react-router-dom';
import Card from './Card';
import { collection, getDocs } from '@firebase/firestore';
import { db } from '../store/firebase-config';
import { useParams } from 'react-router-dom';

const Home = () => {
  const { id } = useParams();

  const [customer, setCustomer] = useState([]);

  const customersCollection = collection(db, 'customers');

  useEffect(() => {
    const fetchCustomer = async () => {
      const data = await getDocs(customersCollection);
      setCustomer(data.docs.map((doc) => ({ ...doc.data(), id: doc.id })));
    };

    fetchCustomer();
  }, []);

  const customerDetail = customer?.find((detail) => detail.imageId === id);

  return (
    <Card>
      <h5 className='mb-5 text-white'>
        WELCOME:
        <span className='pl-3 font-bold text-4xl '>
          {customerDetail?.firstname}
        </span>
      </h5>
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
