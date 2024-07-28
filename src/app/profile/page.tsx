'use client'

import { useRouter } from 'next/navigation'
import React from 'react'
import toast from 'react-hot-toast';
import axios from 'axios';

const page = () => {
  const router = useRouter();
  const [data, setData]:any = React.useState("nothing");
  const [loading, setLoading] = React.useState(false);

  const getUserData = async () => {
    try {
      const response = await axios.get('/api/users/me');
      console.log("User data", response.data.data);
      setData(response.data.data);
      toast.success("User data fetched successfully");

    } catch (error) {
      toast.error("Error fetching user data");
      console.log("Error fetching user data", error);
    }
  }

  const logout = async() => {
    try {
      const response = await axios.get('/api/users/logout');
      console.log("Logout success", response);
      toast.success("Logout success");
      router.push('/login');
    } catch (error:any) {
      console.log("Error logging out", error.message);
      toast.error("Error logging out");
    }
  }

  React.useEffect(() => {
    getUserData();
  }, []);

  return (
    <header
    className='flex flex-col min-h-screen'
    >
      <nav
      className='flex w-full justify-between items-center p-5 px-[100px] bg-gray-700/[0.1]'
      >
        <div>
          <h1
          className='text-2xl font-bold'
          onClick={() => router.push('/login')}
          >
            Auth
          </h1>
        </div>
        <div>
          {/* <ul className='flex gap-8 justify-center items-center'>
            <li>
              <button
              onClick={getUserData}
              >
                Get User Data
              </button>
            </li>
            <li>
              <button
              onClick={logout}
              >
                Logout
              </button>
            </li>
            <li>
              <p>
                {data}
              </p>
            </li>
          </ul> */}
        </div>
        <div>
          <button
          onClick={logout}
          className='bg-transparent border hover:bg-white/[0.8] hover:border-transparent hover:text-black text-white px-5 py-2 rounded-sm '
          >
            Logout
          </button>
        </div>
      </nav>
      <main
      className='flex flex-col px-[100px] py-10 flex-1'
      >
        <div
        className='flex flex-col gap-4'
        >
          <p>
            Username: {data.username}
          </p>
          <p>
            Email: {data.email}
          </p>
          <p>
            ID : {data._id}
          </p>
          <p>
            isVerified : {data.isVerified ? "Yes" : "No"}
          </p>
        </div>
      </main>

    </header>
  )
}

export default page