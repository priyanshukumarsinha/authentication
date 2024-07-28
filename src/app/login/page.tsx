'use client'

import React, { useEffect } from 'react'
import Link from 'next/link';
import axios from 'axios';
import { useRouter } from 'next/navigation';
import toast from 'react-hot-toast';

const page = () => {
  const [user, setUser] = React.useState({
    emailorUsername: "",
    password: "",
  });

  const router = useRouter();

  const [buttonDisabled, setButtonDisabled] = React.useState(true);

  const [loading, setLoading] = React.useState(false);

  const onLogin = async () => {
    try {
      setButtonDisabled(true);
      setLoading(true);
      const response = await axios.post(`/api/users/login`, user);

      console.log("Login Success!", response.data);

      router.push("/profile");



    } catch (error) {
      console.log("Login Failed!", error);
      toast.error("Login Failed!");
      setButtonDisabled(true);
      setLoading(false);
    }
  }

  useEffect(() => {
    if (user.emailorUsername.length>0 && user.password.length>0) {
      setButtonDisabled(false);
    } else {
      setButtonDisabled(true);
    }
  }, [user]);


  return (
    <div
    className='flex flex-col items-center justify-center min-h-screen py-2'
    >
      <h1
      className='text-6xl font-bold m-10'
      >
        Login
      </h1>

      <div className='flex flex-col w-full justify-center items-center gap-5'>
        <input
        className='outline-none bg-gray-500/[0.1]  py-2 px-4 rounded-md w-1/3 focus:bg-gray-500/[0.2] text-gray-300'
        id="emailorUsername"
        type="text"
        placeholder="Username or Email"
        onChange={(e) => setUser({...user, emailorUsername: e.target.value})}
        autoFocus
        />

        <input
        className='outline-none bg-gray-500/[0.1]  py-2 px-4 rounded-md w-1/3 focus:bg-gray-500/[0.2] text-gray-300'
        id="password"
        type="password"
        placeholder="Password"
        onChange={(e) => setUser({...user, password: e.target.value})}
        />

        <button
        className={`bg-blue-500 text-white py-2 px-4 rounded-md w-1/3 ${buttonDisabled ? 'bg-gray-600 cursor-not-allowed text-white/[0.3]' :  'bg-blue-300 cursor-pointer'} ${loading ? 'cursor-wait' : ''}`}
        onClick={onLogin}
        disabled={buttonDisabled}
        >
          {
            loading ? "Loading..." : "Signup"
          }
        </button>

        <p className='text-gray-400 text-sm m-10 mb-0 w-1/3 text-right'>
          <Link href="/login" className='text-gray-500 underline'>Fogot Password?</Link>
        </p>

        <p className='text-gray-400 text-sm m-10'>
          Don't have an account? <Link href="/signup" className='text-blue-500'>Signup</Link>
        </p>

      </div>
    </div>
  )
}

export default page