import { useEffect, useState } from 'react';
import '../App.css';
import Button from '../components/Button';

const Auth = () => {
  const [name, setName] = useState('');
  const [address, setAddress] = useState('');
  const [number, setNumber] = useState('');

  let faceio;
  useEffect(() => {
    faceio = new faceIO('fioad7a7');
  }, [faceio]);

  const handleSignUp = async (e) => {
    e.preventDefault();

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

        fetch(
          'https://atm-project-e9197-default-rtdb.firebaseio.com/customers.json',
          {
            method: 'POST',
            body: JSON.stringify({
              customers: {
                id: userInfo.facialId,
                fullname: name,
                address: address,
                phone_number: number,
              },
            }),
          }
        );
      })
      .catch((errCode) => {
        document.location.reload();
        console.log(errCode);
      });

    setName(''), setAddress(''), setNumber('');
  };

  return (
    <section className='w-1/3 mx-auto p-10 '>
      <h1 className=' text-2xl mb-10 text-white text-center'>Registration</h1>

      <form onSubmit={handleSignUp} className='space-y-5 my-5'>
        <div>
          <label htmlFor='fullname' className='text-white'>
            Fullname:
          </label>
          <br />
          <input
            name='fullname'
            type='text'
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder='Enter Fullname'
            className='p-2 w-full'
          />
        </div>
        <div>
          <label htmlFor='address' className='text-white'>
            Address:
          </label>
          <br />
          <input
            name='address'
            type='text'
            value={address}
            onChange={(e) => setAddress(e.target.value)}
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
            name='number'
            type='number'
            value={number}
            onChange={(e) => setNumber(e.target.value)}
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
