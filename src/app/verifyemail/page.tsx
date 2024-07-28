'use client'
import React from 'react'
import axios from 'axios';
import { useRouter } from 'next/router';
import Link from 'next/link';
import toast from 'react-hot-toast';

const page = () => {

    // const router = useRouter();

    const [token, setToken] = React.useState("");
    const [verified, setVerified] = React.useState(false);
    const [error, setError] = React.useState("");

    const verifyUserEmail = async () => {
        try {
            const response:any = await axios.post(`/api/users/verifyemail`, { token });
                setVerified(true);
                setError("");
                console.log("Email verified successfully!", response.data);


        } catch (error) {
            console.log("Email verification failed!", error);
            setError("Email verification failed!");
            toast.error("Email verification failed!");
        }
    }

    React.useEffect(() => {
        setError("");
        const urlToken = window.location.search.split("=")[1];
        setToken(urlToken || "");

        // better way to get query params
        // const {query} = router;
        // if(query.token){
        //     setToken(query.token as string);
        // }

    }, []);

    React.useEffect(() => {
        setError("");
        if(token.length > 0){
            verifyUserEmail();
        }
    }, [token]);

  return (
    <div
    className='flex flex-col items-center justify-center min-h-screen py-2'
    >
        <h1
        className='text-6xl font-bold m-10'
        >
            Verify Email
        </h1>
        <div className='flex flex-col w-full justify-center items-center gap-5'>
            <div className='w-full flex justify-center items-center'>
                {
                    token.length > 0 ? 
                        <button
                        className='bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-6 rounded-md'
                        >
                            Verified!!
                        </button> : 
                        <div
                        className='text-red-100 rounded-md w-1/2 p-5 bg-red-400/[0.5] flex justify-center items-center '
                        >
                            {"No token found!"}
                        </div>
                    
                }
            </div>
            <div>
                {
                    verified && (
                        <div>
                            Email verified successfully! 
                            <Link 
                            href="/login"
                            className='text-blue-500'
                            >{" Login"}</Link>
                        </div>
                    )
                }
                {
                    error.length > 0 && (
                        <div 
                        className='text-red-500'
                        >
                            {error}
                        </div>
                    )
                }
            </div>
        </div>
    </div>
  )
}

export default page