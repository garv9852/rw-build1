import React, { useContext, useEffect, useState } from 'react'
import Router from 'next/router';
import Dialog from '../components/elements/Dialog';
import Link from 'next/link';
import {useForm,SubmitHandler} from "react-hook-form"
import Loading from "../components/elements/Loading"
import AuthContext from '../Authentication/AuthContext';
interface IformInput{
    email:string;
    password:string;
}

function Login(){
    const {user}=useContext(AuthContext);
    useEffect(()=>{
        const check=()=>{
            if(user) 
            {
                Router.push("./");
            }
        }
        check();
    },[user])
    return(
        <>
        {
            user==null && <LoginMain/>
        }
        </>
    )
}
export default Login;

function LoginMain() {
  const {register,handleSubmit,formState:{errors}}=useForm<IformInput>();
  const [loading,setLoading]=useState(false);
  const [error,setError]=useState("");
  const authent=useContext(AuthContext);
  const handleSignUp:SubmitHandler<IformInput> = async (data) => {
    try{
      setLoading(true);
      const log=await authent.login(data.email,data.password)
      console.log(log)
    }
    catch(err)
    {
      console.log(err);
      setError("Client Side error occured, Try again later");
    }
    setLoading(false);
  }
  return (
    <div>
      <div className="relative min-h-screen bg-white-200 flex justify-center items-center">
        {/* <div className="absolute w-60 h-60 rounded-xl bg-red-500 -top-5 -left-16 z-0 transform rotate-45 hidden md:block"></div> */}
        {/* <div className="absolute w-48 h-48 rounded-xl bg-red-500 bottom-6 right-6 transform rotate-12 hidden md:block"></div> */}
        <Dialog>
          <form onSubmit={handleSubmit(handleSignUp)}>
              <div>
                <h1 className="text-3xl font-bold text-center mb-4">Log In</h1>
                <p className="text-center text-sm mb-8 font-semibold text-gray-700 tracking-wide">Log in to get exclusive Discounts and new collection</p>
              </div>
              <div className="space-y-4">
                <div className=' text-red-600'>{error}</div>

                <input 
                  {...register('email',{required:"The Email Field is required",pattern: {
                    value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                    message: "Invalid email address"
                  }})}
                  type="text" 
                  placeholder="Email Address" 
                  className="block text-sm py-3 px-4 rounded-lg w-full border outline-none" />
                <input 
                  {...register('password',{required:"The password Field is required"})}
                  type="password" 
                  placeholder="Password" 
                  minLength={8}
                  className="block text-sm py-3 px-4 rounded-lg w-full border outline-none" />
              </div>
              <div className='flex flex-col p-3'>
                {errors.email && (
                    <span className='text-red-500'>{errors.email.message}</span>
                )}
                {errors.password && (
                    <span className='text-red-500'>{errors.password.message}</span>
                )}
              </div>
              <div className="text-center mt-3">
                <input type="submit" value="Log In"className="transtion duration-300 focus:bg-red-700 py-3 px-10 text-xl text-white bg-red-500 rounded-2xl"/>
                <p className="mt-4 text-sm">Don't Have An Account? <Link href="/signin"className="underline">Sign In</Link></p>
              </div>
          </form>
        </Dialog>
        {/* <div className="w-40 h-40 absolute bg-red-500 rounded-full top-0 right-12 hidden md:block"></div> */}
        {/* <div className="w-20 h-40 absolute bg-red-500 rounded-full bottom-20 left-10 transform rotate-45 hidden md:block"></div> */}
      </div>
      <Loading visible={loading}/>
    </div>
  )
}