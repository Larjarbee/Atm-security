import { useEffect, useRef, useState } from 'react';
import '../App.css';
import Button from '../components/Button';
import { db } from '../store/firebase-config';
import { addDoc, collection } from '@firebase/firestore';
import { Link } from 'react-router-dom';

const Auth = () => {
  const firstnameRef = useRef(null);
  const othernameRef = useRef(null);
  const addressRef = useRef(null);
  const numberRef = useRef(null);
  const [show, setShow] = useState(false);

  const customersCollection = collection(db, 'customers');

  let faceio;
  useEffect(() => {
    faceio = new faceIO('fioa94f4');
  }, [faceio]);

  const handleSignUp = async (e) => {
    e.preventDefault();

    const enteredFirstname = firstnameRef.current.value;
    const enteredOthername = othernameRef.current.value;
    const enteredAddress = addressRef.current.value;
    const enteredNumber = numberRef.current.value;

    faceio
      .enroll({
        locale: 'auto',
        payload: {
          email: '',
        },
      })
      .then((userInfo) => {
        console.log(userInfo);

        addDoc(customersCollection, {
          imageId: userInfo.facialId,
          firstname: enteredFirstname,
          othername: enteredOthername,
          address: enteredAddress,
          phone_number: enteredNumber,
          balance: 0,
        });
        setShow(true);
      })
      .catch((errCode) => {
        document.location.reload();
        console.log(errCode);
      });

    firstnameRef.current.value = '';
    othernameRef.current.value = '';
    addressRef.current.value = '';
    numberRef.current.value = '';
  };

  return (
    <section className='w-1/3 mx-auto p-10 '>
      {!show && (
        <>
          <h1 className=' text-2xl mb-5 text-white text-center'>
            Register New Customer
          </h1>

          <form onSubmit={handleSignUp} className='space-y-5 bg-[#1d267d] p-10'>
            <div>
              <label htmlFor='firstname' className='text-white'>
                Firstname:
              </label>
              <br />
              <input
                ref={firstnameRef}
                name='firstname'
                type='text'
                placeholder='Enter Firstname'
                className='p-2 w-full'
              />
            </div>
            <div>
              <label htmlFor='Othername' className='text-white'>
                Othername:
              </label>
              <br />
              <input
                ref={othernameRef}
                name='Othername'
                type='text'
                placeholder='Enter Othername'
                className='p-2 w-full'
              />
            </div>
            <div>
              <label htmlFor='address' className='text-white'>
                Address:
              </label>
              <br />
              <input
                ref={addressRef}
                name='address'
                type='text'
                placeholder='Enter Address'
                className='p-2 w-full'
              />
            </div>
            <div>
              <label htmlFor='number' className='text-white'>
                Phone number:
              </label>
              <br />
              <input
                ref={numberRef}
                name='number'
                type='number'
                placeholder='Enter Phone number'
                className='p-2 w-full'
              />
            </div>
            <Button>Register</Button>
          </form>
        </>
      )}

      {show && (
        <div className='text-center backgrounds w-2/3 mx-auto rounded-lg p-5'>
          <h3 className='mb-5 text-white'>Registration Successful?</h3>

          <div>
            <Button>
              <Link to='/login'>Use ATM</Link>
            </Button>
            <Button
              onClick={() => {
                setShow(false);
                document.location.reload();
              }}
            >
              Cancel
            </Button>
          </div>
        </div>
      )}
    </section>
  );
};

export default Auth;
