import React, { useState } from 'react';
import Button from './Button';
import { useSelector } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import Card from './Card';
import { useFetch } from '../hooks/useCustomer';

const Transfer = () => {
  const { amount, setAmount, customer, updateAmount } = useFetch();
  const [error, setError] = useState(false);
  const [show, setShow] = useState(false);
  const [bank, setBank] = useState('');
  const [showBank, setShowBank] = useState(false);
  const [msg, setMsg] = useState(false);
  const [accountNumber, setAccountNumber] = useState(0);
  const balance = useSelector((state) => state.auth.amount);
  const id = localStorage.getItem('imageId');
  const navigate = useNavigate();

  const accountDetails = [
    {
      name: 'Osunlaja Abiodun',
      accountNumber: 7013826816,
    },
    {
      name: 'Adejuwon Kehinde',
      accountNumber: 8134810269,
    },
    {
      name: 'Adediji Oluranti',
      accountNumber: 2237868978,
    },
  ];

  const customerDetail = customer?.find((detail) => detail.imageId === id);
  const bankDetail = accountDetails?.find(
    (detail) => detail.accountNumber === +accountNumber
  );

  const submitFormHandler = (e) => {
    e.preventDefault();

    if (amount > balance) {
      setError(true);
      return;
    }

    updateAmount(customerDetail?.id, customerDetail?.balance);

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
            {!showBank ? (
              !show ? (
                <h5 className='mb-5 text-white text-center'>
                  Please Enter Amount
                </h5>
              ) : (
                <h5 className='mb-5 text-white text-center'>
                  Please Enter Account Number
                </h5>
              )
            ) : (
              <h5 className='mb-5 text-white text-center'>
                Please Choose the Destination Bank
              </h5>
            )}
            <form className='text-center space-y-5'>
              {!show && (
                <>
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
                    <Button onClick={() => setShow(true)}>Continue</Button>
                  </div>
                </>
              )}
              {show && !showBank && (
                <>
                  <input
                    type='number'
                    min='1'
                    max='10'
                    className='w-[40%] p-2'
                    value={accountNumber}
                    onChange={(e) => setAccountNumber(e.target.value)}
                  />

                  <div className='flex justify-center space-x-5'>
                    <Button onClick={() => setShow(false)}>Cancel</Button>
                    <Button
                      onClick={() => {
                        setShow(true);
                        setShowBank(true);
                      }}
                    >
                      Continue
                    </Button>
                  </div>
                </>
              )}

              {showBank && (
                <div className='space-y-2'>
                  <h1 className='text-white'>
                    Account Name: {bankDetail?.name}
                  </h1>
                  <h1 className='text-white'>
                    Account Number: {accountNumber}
                  </h1>
                  <h1 className='text-white'>Destination Bank: {bank}</h1>
                  <h1 className='text-white'>Amount: {amount}</h1>

                  <div className='grid grid-cols-2 gap-5'>
                    {banks.map((bank, index) => (
                      <div className='my-3' key={index}>
                        <Button
                          onClick={(e) => {
                            e.preventDefault();
                            setBank(bank);
                          }}
                        >
                          {bank}
                        </Button>
                      </div>
                    ))}
                  </div>
                  <div className='flex justify-center gap-5'>
                    <Button
                      onClick={() => {
                        setShowBank(false);
                      }}
                    >
                      Cancel
                    </Button>
                    <Button onClick={submitFormHandler}>Confirm</Button>
                  </div>
                </div>
              )}
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

export default Transfer;

const banks = ['UBA', 'Access Bank', 'GTB', 'Opay'];
