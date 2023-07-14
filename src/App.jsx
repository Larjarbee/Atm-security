import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import { lazy, Suspense } from 'react';
import img from './assets/img.jpg';
import LoadingSpinner from './components/Loading';

const Home = lazy(() => import('./components/Home'));
const Balance = lazy(() => import('./components/Balance'));
const Withdraw = lazy(() => import('./components/Withdraw'));
const Transfer = lazy(() => import('./components/Transfer'));
const Deposit = lazy(() => import('./components/Deposit'));
const Authpage = lazy(() => import('./auth/Auth'));
const Login = lazy(() => import('./auth/Login'));

function App() {
  const month = new Date().toLocaleString('en-US', { month: 'long' });
  const day = new Date().toLocaleString('en-US', { day: '2-digit' });
  const year = new Date().getFullYear();

  const router = createBrowserRouter([
    {
      path: '/home/:id',
      element: <Home />,
    },
    {
      path: '/balance',
      element: <Balance />,
    },
    {
      path: '/withdraw',
      element: <Withdraw />,
    },
    {
      path: '/transfer',
      element: <Transfer />,
    },
    {
      path: '/deposit',
      element: <Deposit />,
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
      <Suspense fallback={<div className='centered'><LoadingSpinner /></div>}>
        <div className='mt-1 flex justify-around'>
          <div className='flex items-center'>
            <div>
              <img src={img} alt='img' width={80} />
            </div>
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
