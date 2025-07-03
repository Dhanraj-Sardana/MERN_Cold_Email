import { Link } from 'react-router-dom';
import { useLocation,useNavigate } from 'react-router-dom';
import Button from './button';
import { useState } from 'react';
import { useEffect } from 'react';
import axios from 'axios'
export default function NavBar() {
  const location=useLocation();
  const [islooged,setIsLogged]=useState(false);
  const navigate=useNavigate();
  const checkLog= async ()=>{
try {
  const res=await axios.get('http://localhost:3000/auth/check',{ withCredentials: true });
 
   setIsLogged(true)
} catch (error) {
  setIsLogged(false);
  console.log(error);
}
  }

  useEffect(()=>{

checkLog();
  },[location.pathname]);

  const handleCampaign=()=>{
     
    navigate('/',{replace:true});
   
  }
  const handleSignin=()=>{

    navigate('/signin',{replace:true});
  }

  const handleLogout=()=>{
navigate('/logout',{replace:true});
  }
  return (
    <>
      <div className="flex relative items-center justify-center pt-5">
        <Link to='/dashboard'>
        <img
          src="/Home_LOGO.png"
          className="w-25 transition-transform duration-700 ease-in-out hover:rotate-[360deg]"
          alt="Home logo"
        />
        </Link>
        <div>
          <h1 className="text-3xl font-bold text-[#2b3a4b]">COLDCONNECT</h1>
          <p className="text-[#4ccbc4] pl-6">CONNECT . CONVERT</p>
        </div>
        {location.pathname==='/dashboard'&& (
        <div className='absolute right-10 -translate-y-1/2'>
        <Button onClick={handleCampaign}>Add Campaign</Button>
        </div>
        )}
        {
           location.pathname==='/' && ( islooged ? <div className='absolute right-10 -translate-y-6'> <Button onClick={handleLogout} > Logout</Button> </div> : <div className='absolute right-10 -translate-y-6'> <Button onClick={handleSignin} >SignIn</Button></div>)
        }
      </div>

      
    </>
  );
}
