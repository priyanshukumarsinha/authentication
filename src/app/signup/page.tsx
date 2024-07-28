'use client'

import React, { useEffect } from 'react'
import axios from 'axios';
import toast from 'react-hot-toast';
import { useRouter } from 'next/navigation';
import Link from 'next/link';

const page = () => {

  const router = useRouter();

  const [user, setUser] = React.useState({
    email: "",
    username : "",
    password: "",
  });

  const [buttonDisabled, setButtonDisabled] = React.useState(true);

  const [loading, setLoading] = React.useState(false);

  const onSignup = async () => {
    try {
      setButtonDisabled(true);
      setLoading(true);
      const response = await axios.post(`/api/users/signup`, user);

      console.log("Signup Success!", response.data);

      router.push("/login");



    } catch (error) {
      console.log("Signup Failed!", error);
      toast.error("Signup Failed!");
    }
  }

  useEffect(() => {
    if (user.email.length>0 && user.username.length>0 && user.password.length>0) {
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
        Signup
      </h1>
      <div className='flex flex-col w-full justify-center items-center gap-5'>
        <input
        className='outline-none bg-gray-500/[0.1]  py-2 px-4 rounded-md w-1/3 focus:bg-gray-500/[0.2] text-gray-300'
        id="username"
        type="text"
        placeholder="Username"
        onChange={(e) => setUser({...user, username: e.target.value})}
        autoFocus
        />

        <input
        className='outline-none bg-gray-500/[0.1]  py-2 px-4 rounded-md w-1/3 focus:bg-gray-500/[0.2] text-gray-300'
        id="email"
        type="email"
        placeholder="Email"
        onChange={(e) => setUser({...user, email: e.target.value})}
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
        onClick={onSignup}
        disabled={buttonDisabled}
        >
          {
            loading ? "Loading..." : "Signup"
          }
        </button>

        <p className='text-gray-400 text-sm m-10'>
          Already have an account? <Link href="/login" className='text-blue-500'>Login</Link>
        </p>

      </div>
    </div>
  )
}

export default page