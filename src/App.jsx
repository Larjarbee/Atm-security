import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import { collection, getDocs, doc, updateDoc } from '@firebase/firestore';
import { useState, useEffect, lazy, Suspense, useRef } from 'react';
import { db } from './store/firebase-config';
import img from './assets/img.jpg'
import { useSelector } from 'react-redux';

const Home = lazy(() => import('./components/Home'))
const Balance = lazy(() => import('./components/Balance'))
const Withdraw = lazy(() => import('./components/Withdraw'))
const Deposit = lazy(() => import('./components/Deposit'))
const Authpage = lazy(() => import('./auth/Auth'))
const Login = lazy(() => import('./auth/Login'))

function App() {
  const [customer, setCustomer] = useState([]);
  const [loading, setLoading] = useState(false);

  const amount = useSelector((state) => state.auth.enteredWithdrawalAmount)
  const amountDeposit = useSelector((state) => state.auth.enteredDepositAmount)
  console.log(amount)

  const month = new Date().toLocaleString('en-US', { month: 'long' });
  const day = new Date().toLocaleString('en-US', { day: '2-digit' });
  const year = new Date().getFullYear();


  const customersCollection = collection(db, 'customers');

  useEffect(() => {
    setLoading(true)
    const fetchCustomer = async () => {
      const data = await getDocs(customersCollection);
      setCustomer(data.docs.map((doc) => ({ ...doc.data(), id: doc.id })));
    };
    setLoading(false)
    fetchCustomer();
  }, []);

  const updateAmount = async (id, balance) => {
    const customerDoc = doc(db, 'customers', id);
    const newAmount = { balance: balance - +amount };
    await updateDoc(customerDoc, newAmount)
  }
  const updateAmountDeposit = async (id, balance) => {
    const customerDoc = doc(db, 'customers', id);
    const newAmount = { balance: balance + +amountDeposit };
    await updateDoc(customerDoc, newAmount)
  }

  const router = createBrowserRouter([
    {
      path: '/home/:id',
      element: <Home customer={customer} loading={loading} />,
    },
    {
      path: '/balance',
      element: <Balance />,
    },
    {
      path: '/withdraw',
      element: <Withdraw updateAmount={updateAmount} customer={customer} />,
    },
    {
      path: '/deposit',
      element: <Deposit updateAmountDeposit={updateAmountDeposit} customer={customer} />,
    },
    {
      path: '/auth',
      element: <Authpage />,
    },
    {
      path: '/*',
      element: <Login />,
    },
  ]);
  return (
    <div>
      <Suspense fallback={<p>Loading...</p>}>
        <div className='mt-1 flex justify-around'>
          <div className='flex items-center'>
            <div><img src={img} alt='img' width={80} /></div>
            <div className='text-white font-bold text-2xl'>
              <h1>NACOMES</h1>
              <h1>BANK</h1>
            </div>
          </div>
          <div className='expense-date'>
            <div className='expense-date__month'>{month}</div>
            <div className='expense-date__year'>{year}</div>
            <div className='expense-date__day'>{day}</div>
          </div>
        </div>
        <RouterProvider router={router} />
      </Suspense>
    </div>
  );
}

export default App;
