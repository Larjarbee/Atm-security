import { useEffect, useRef } from 'react';
import '../App.css';
import Button from '../components/Button';
import { db } from '../store/firebase-config';
import { addDoc, collection } from '@firebase/firestore';

const Auth = () => {
  const firstnameRef = useRef(null);
  const othernameRef = useRef(null);
  const addressRef = useRef(null);
  const numberRef = useRef(null);

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
          // whoami: 123456, // Dummy ID linked to this particular user
          email: '',
        },
      })
      .then((userInfo) => {
        // alert(
        //   `User Successfully Enrolled! Details:
        //    Unique Facial ID: ${userInfo.facialId}
        //    Enrollment Date: ${userInfo.timestamp}
        //    Gender: ${userInfo.details.gender}
        //    Age Approximation: ${userInfo.details.age}`
        // );
        console.log(userInfo);

        addDoc(customersCollection, {
          imageId: userInfo.facialId,
          firstname: enteredFirstname,
          othername: enteredOthername,
          address: enteredAddress,
          phone_number: enteredNumber,
        });
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
      <h1 className=' text-2xl mb-10 text-white text-center'>Registration</h1>

      <form onSubmit={handleSignUp} className='space-y-5 my-5'>
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
    </section>
  );
};

export default Auth;
