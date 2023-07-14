import { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import '../App.css';
import Button from '../components/Button';
import Card from '../components/Card';

const Login = () => {
  const navigate = useNavigate();
  const [showUI, setShowUI] = useState(true);

  let faceio;
  useEffect(() => {
    faceio = new faceIO('fioa94f4');
  }, [faceio]);

  const handleLogIn = async () => {
    setShowUI(false);
    try {
      let response = await faceio.authenticate({
        locale: 'auto',
      });
      console.log(response);
      console.log(` Unique Facial ID: ${response.facialId}
          PayLoad: ${response.payload.email}
          `);
      localStorage.setItem('imageId', response.facialId);
      navigate(`/home/${response.facialId}`);
      document.location.reload();
    } catch (error) {
      document.location.reload();
      console.log(error);
    }
  };
  return (
    <>
      {showUI && (
        <Card>
          <div className='background py-10 text-white text-center'>
            <h1 className=' text-2xl mb-5'>Face Authentication</h1>
            <Button onClick={handleLogIn}>
              <span class='material-symbols-outlined'>
                familiar_face_and_zone
              </span>
            </Button>

            <div className=' mt-10 space-y-3'>
              <div className='flex space-x-2 px-5 items-center'>
                <div className='w-[48%] h-1 bg-white' /> <h2>or</h2>
                <div className='w-[48%] h-1 bg-white' />
              </div>
              <Button>
                <Link to='/auth'>Register</Link>
              </Button>
            </div>
          </div>
        </Card>
      )}
    </>
  );
};

export default Login;
