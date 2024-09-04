import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

import Swal from 'sweetalert2'
import { AlertCircle, ArrowRight, X } from 'lucide-react'
import { AxioPost } from '../../utils/AxiosUtils';

export const Login = () => {
    const [email, setEmail] = useState('');
    const [is_disable, set_disable] = useState(false);
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const navigate = useNavigate();
    const handle_login = async (e) => {
        set_disable(true);
        e.preventDefault();
        try {
            const response =await AxioPost('instructor/login',{email,password})
            setError(response.data.message)
            if(response.data.status===1){
                setError('')
                Swal.fire({
                    position: "center",
                    icon: "success",
                    title: "Login Successfull",
                    showConfirmButton: false,
                    timer: 1500
                  });
                setTimeout(()=>{
                    navigate('/instructor/dashboard');
                },1500)
                
            }
            console.log(response.data);
        } catch (err) {
            setError("Try Again Later")
            if (err.response) {
                setError(err.response.data.message)
                console.error('Error response:', err.response.data);
            } else if (err.request) {
                console.error('Error request:', err.request);
            } else {
                console.error('Error:', err.message);
            }
            
        } finally {
            set_disable(false);
        }
    }
    return (
        
        <>
        <section>
        <div className="flex items-center justify-center px-4 py-10 sm:px-6 sm:py-16 lg:px-8 lg:py-24">
        <div className="xl:mx-auto xl:w-full xl:max-w-sm w-full md:mx-auto md:w-1/2 2xl:max-w-md">
          <div className="mb-2 flex justify-center">
            {/* We can Place logo Here */}
          </div>
          <h2 className="text-center mb-5 text-2xl font-bold leading-tight text-black">
            <div className="mb-2">INSTRUCTOR LOGIN </div><hr/>
          </h2>
          {error && <div className="rounded-md mb-5 border-l-4 border-yellow-500 bg-yellow-100 p-4">
            <div className="flex items-center space-x-4">
            <div>
                <AlertCircle className="h-6 w-6 text-yellow-600" />
            </div>
            <div>
                <p className="text-sm font-medium text-yellow-600">
                {error}
                </p>
            </div>
            </div>
        </div>}
          <div className="border rounded-md p-5">
          <form onSubmit={handle_login} method='post'>
            <div className="space-y-5">
              <div>
                <label htmlFor="" className="text-base font-medium text-gray-900">
                  Email ID
                </label>
                <div className="mt-2">
                  <input
                    className="flex h-10 w-full rounded-md border border-gray-300 bg-transparent px-3 py-2 text-sm placeholder:text-gray-400 focus:outline-none focus:ring-1 focus:ring-gray-400 focus:ring-offset-1 disabled:cursor-not-allowed disabled:opacity-50"
                    type="email"
                    placeholder="Email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                  ></input>
                </div>
              </div>
              <div>
                <div className="flex items-center justify-between">
                  <label htmlFor="" className="text-base font-medium text-gray-900">
                    Password
                  </label>
                  <Link to={'/forget_password'} title="" className="text-sm font-semibold text-black hover:underline">
                    Forgot password?
                  </Link>
                </div>
                <div className="mt-2">
                  <input
                    className="flex h-10 w-full rounded-md border border-gray-300 bg-transparent px-3 py-2 text-sm placeholder:text-gray-400 focus:outline-none focus:ring-1 focus:ring-gray-400 focus:ring-offset-1 disabled:cursor-not-allowed disabled:opacity-50"
                    type="password"
                    placeholder="Password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                    minLength={8}
                  ></input>
                </div>
              </div>
              <div>
                <button
                  type="submit"
                  className={`inline-flex w-full items-center justify-center rounded-md ${is_disable?'bg-stone-500':'bg-stone-900'} px-3.5 py-2.5 font-semibold leading-7 text-white ${is_disable?'':'hover:bg-black/80'}`}
                >
                  {is_disable?(
                    <>Loading....</>
                  ):(
                    <>Get started <ArrowRight className="ml-2" size={16} /></>
                  )}
                  
                </button>
              </div>
            </div>
          </form>
          </div>
        </div>
      </div>
    </section>
        </>
    )
}
