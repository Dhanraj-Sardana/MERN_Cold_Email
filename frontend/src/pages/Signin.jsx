import { useForm } from "react-hook-form"
import Label from "../components/label";
import Button from "../components/button";
import Input from "../components/input";
import Card from "../components/card";
import axios from 'axios';
import { useState } from "react";
import { replace, useNavigate } from "react-router-dom";

export default function Signin() {
  const { register, handleSubmit, formState: { errors } } = useForm();
  const [exists, setExists] = useState(false);
  const [errorFlag, setErrorFlag] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const navigate = useNavigate();
  const formHandle = async (data) => {
    try {
      setErrorFlag(false);
      setExists(false);
      const res = await axios.post('http://localhost:3000/auth/signin', data, {
        headers: { 'Content-Type': 'application/json' },
        withCredentials: true
      })


      if (res.status === 200) {
        setErrorFlag(false);
         const pending = localStorage.getItem('pendingCampaign');
                if (pending) {
        const campaignData = JSON.parse(pending);
        await axios.post('http://localhost:3000/api/campaigns', campaignData, {
          withCredentials: true,
        });
        localStorage.removeItem('pendingCampaign');
      }
        
        navigate('/dashboard', { replace: true })
      } 
    } catch (error) {
      if(error.status===409){
        
        
        setExists(true);
      }
      else{
      setErrorFlag(true);
      
      
      setErrorMessage(error.message);
      }
    }
  }
  const handleLogin = () => {
    navigate('/login')
  }
  return (
    <>
      {errorFlag ? (<div className="flex justify-center items-center h-112">
        <div className="text-4xl font-bold text-teal-700 ">{errorMessage} </div> </div>) : (<div className="flex h-140 flex-col items-center justify-center ">

          <Card className="w-1/2 mt-18">

            <form action="" onSubmit={handleSubmit(formHandle)} className=" p-10 pt-5 flex flex-col gap-6 ">
              <h1 className="self-center text-4xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-[#30cfd0] to-[#1eaa87] tracking-wide  animate-pulse">
                Sign In
              </h1>
              <div className="flex flex-col">
                <Label>Name</Label>
                <Input
                  placeholder='Enter your Name'
                  {...register('name', { required: 'Name is required' })}
                />
                {errors?.name && <span className="text-red-500 self-center mt-2 animate-pulse ">{errors.name.message}</span>}
              </div>

              <div className="flex flex-col">
                <Label>Password</Label>
                <Input
                  type='password'
                  {...register('password', { required: 'Password is required', minLength: { value: 8, message: "Password must have atleast 8 characters" } })}
                  placeholder='Enter your Password'
                />
                {!errors?.name && errors?.password && <span className="text-red-500 animate-pulse self-center mt-2">{errors.password.message}</span>}
              </div>
              <div className="flex flex-col">
                <Label>Email</Label>
                <Input
                  type='email'
                  {...register('email', { required: 'Email is required' })}
                  placeholder='Enter your Email'
                />
                {!errors?.name && !errors?.password && errors?.email && <span className="text-red-500 animate-pulse self-center mt-2">{errors?.email?.message}</span>}
              </div>

              <Button type='submit'>Sign-Up</Button>
              <p className="self-center  text-xl font-bold">or</p>
              <Button onClick={handleLogin} >LogIn</Button>
              {exists&& <div className="self-center">User with this email already exists </div> }
            </form>
          </Card>
        </div>)}
    </>
  )
}
