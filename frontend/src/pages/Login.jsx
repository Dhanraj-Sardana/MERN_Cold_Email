import { useForm } from "react-hook-form"
import Label from "../components/label";
import Button from "../components/button";
import Input from "../components/input";
import Card from "../components/card";
import axios from 'axios'
import { useNavigate } from "react-router-dom";
import { useState } from "react";
export default function Login() {
    const { register, handleSubmit, formState: { errors } } = useForm();
    const [flag, setFlag] = useState(false);
    const [notFoundFlag, setNotFoundFlag] = useState(false);
    const [errorFlag, setErrorFlag] = useState(false);
    const [errorMessage, setErrorMessage] = useState('');
    const navigate = useNavigate();
    const handleSignin = () => {
        navigate('/signin', { replace: true });
    }
    const formHandle = async (data) => {
        try {
            setFlag(false);
            setNotFoundFlag(false);
            const res = await axios.post('http://localhost:3000/auth/login', data, {
                headers: { 'Content-Type': 'application/json' },
                withCredentials: true
            });
            if (res.status == 200) {
                const pending = localStorage.getItem('pendingCampaign');
                if (pending) {
        const campaignData = JSON.parse(pending);
        await axios.post('http://localhost:3000/api/campaigns', campaignData, {
          withCredentials: true,
        });
        localStorage.removeItem('pendingCampaign');
      }
      
                navigate('/dashboard',{replace:true})
            }

        } catch (error) {
            if (error.status === 401) setFlag(true);
            else if (error.status === 404) setNotFoundFlag(true);
            else {
                setErrorFlag(true);
                setErrorMessage(error.message);
            }
        }
    }
    return (
        <>
            {errorFlag ? <div className="flex justify-center items-center h-112">
                <div className="text-4xl font-bold text-teal-700 ">{errorMessage} </div> </div> :
                <div className="flex h-120 flex-col items-center justify-center ">

                    <Card className="w-1/2 mt-18">
                        <form action="" onSubmit={handleSubmit(formHandle)} className=" p-10  flex flex-col gap-6 ">
                            <h1 className="self-center text-4xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-[#30cfd0] to-[#1eaa87] tracking-wide  animate-pulse">
                                Log In
                            </h1>

                            <div className="flex flex-col">
                                <Label>Password</Label>
                                <Input
                                    type='password'
                                    placeholder='Enter your Password'
                                    {...register('password', { required: 'Password is required', minLength: { value: 8, message: 'Password must have atleast 8 characters' } })}
                                />
                                {errors?.password && <span className="text-red-500 animate-pulse self-center mt-2">{errors?.password?.message} </span>}
                            </div>
                            <div className="flex flex-col">
                                <Label>Email</Label>
                                <Input
                                    type='email'
                                    {...register('email', { required: 'Email is required' })}
                                    placeholder='Enter your Email'
                                />
                                {!errors?.password && errors.email && <span className="text-red-500 animate-pulse self-center mt-2">{errors?.email?.message}</span>}
                            </div>

                            <Button type='submit'>Login</Button>
                            {flag && <div className="self-center">Wrong Password</div>}
                            {notFoundFlag && <>
                                <div className="self-center">No user found with this email ! Please Sign-Up to proceed </div>
                                <Button onClick={handleSignin}>Sign-In</Button>
                            </>}
                        </form>
                    </Card>
                </div>
            }
        </>
    )
}
