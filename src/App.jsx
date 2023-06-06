import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import Home from './components/Home';
import Authpage from './auth/Auth';
import Login from './auth/Login';
import Balance from './components/Balance';
import Withdraw from './components/Withdraw';
import Deposit from './components/Deposit';

function App() {
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
      <RouterProvider router={router} />
    </div>
  );
}

export default App;
