import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

import { AlertCircle, ArrowRight, CheckCircle } from 'lucide-react'
import Swal from "sweetalert2";
import { AxioPost } from "../../utils/AxiosUtils";
import { BackgroundBackdrop } from "../../Components/HomePage/BackgroundBackdrop";

export const Register = () => {
  const [otpBox, setOtpBox] = useState(false);
  const [userDetails, setUserDetails] = useState({
    name: "",
    email: "",
    mobile: "",
    password: "",
  });
  const [otp, setOtp] = useState("");
  const [error, setError] = useState("");
  const [OTPerror, setOTPError] = useState("");
  const [alertColor,setAlertColor] = useState("danger");
  const navigate = useNavigate();
  const handleInputChange = (e) => {
    //console.log("k")
    setUserDetails({
      ...userDetails,
      [e.target.name]: e.target.value,
    });
  };
  const [is_disable, set_disable] = useState(false);

  const handleRegister = async (e) => {
    e.preventDefault();
    set_disable(true);
    try {
      const response = await AxioPost("user/register", userDetails);
      //console.log(response);
      if (response.data.status === 1) {
        setOtpBox(true);
        setError('');
      } else {
        setError(response.data.message);
      }
    } catch (error) {
      setError("An error occurred during registration.");
      console.error(error.response.data.message);
    } finally {
      set_disable(false);
    }
  };

  const handleOtpSubmit = async (e) => {
    e.preventDefault();
    set_disable(true);
    try {
      const response = await AxioPost("user/register_otp_verify", { otp: otp });
      console.log(response);
      if (response.data.status === 1) {
        setAlertColor("success")
        setOTPError('');
        Swal.fire({
          position: "center",
          icon: "success",
          title: "You're successfully registered with us.",
          showConfirmButton: false,
          timer: 2500
        });
        setTimeout(() => {
          navigate("/login");
        }, 2500);
      } else {
        setOTPError(response.data.message);
        set_disable(false);
      }
    } catch (error) {
        setOTPError("An error occurred during OTP verification.");
        // console.error(error);
        set_disable(false);
    } 
  };

  return (
    <>
    <section>
    <div className="flex items-center justify-center px-4 py-10 sm:px-6 sm:py-16 lg:px-8 lg:py-24">
      <BackgroundBackdrop/>
        <div className=" xl:mx-auto xl:w-full xl:max-w-sm w-full md:mx-auto md:w-1/2 2xl:max-w-md">
          <div className="mb-2 flex justify-center">
            {/* We can Place logo Here */}
          </div>
          {!otpBox && (
            <>
            <h2 className="text-center text-2xl font-bold leading-tight text-black">
            Sign up to create account
          </h2>
          <p className="mt-2 mb-5 text-center text-sm text-gray-600 ">
            Already have an account?{' '}
            <Link
              to={'/login'}
              title=""
              className="font-semibold text-black transition-all duration-200 hover:underline"
            >
              Sign In
            </Link>
          </p>
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
          <div className="border bg-white rounded-md p-5">
            <form onSubmit={(e)=>{handleRegister(e)}} method="post">
              <div className="space-y-5">
                <div>
                  <label htmlFor="name" className="text-base font-medium text-gray-900">
                    Full Name
                  </label>
                  <div className="mt-2">
                    <input
                      className="flex h-10 w-full rounded-md border border-gray-300 bg-transparent px-3 py-2 text-sm placeholder:text-gray-400 focus:outline-none focus:ring-1 focus:ring-gray-400 focus:ring-offset-1 disabled:cursor-not-allowed disabled:opacity-50"
                      type="text"
                      placeholder="Full Name"
                      name="name"
                      value={userDetails.name}
                      onChange={handleInputChange}
                      required={true}
                    ></input>
                  </div>
                </div>
                <div>
                  <label htmlFor="email" className="text-base font-medium text-gray-900">
                    Email ID
                  </label>
                  <div className="mt-2">
                    <input
                      className="flex h-10 w-full rounded-md border border-gray-300 bg-transparent px-3 py-2 text-sm placeholder:text-gray-400 focus:outline-none focus:ring-1 focus:ring-gray-400 focus:ring-offset-1 disabled:cursor-not-allowed disabled:opacity-50"
                      type="email"
                      placeholder="Email"
                      name="email"
                      value={userDetails.email}
                      onChange={handleInputChange}
                      required={true}
                    ></input>
                  </div>
                </div>
                <div>
                  <label htmlFor="email" className="text-base font-medium text-gray-900">
                    Mobile Number
                  </label>
                  <div className="mt-2">
                    <input
                      className="flex h-10 w-full rounded-md border border-gray-300 bg-transparent px-3 py-2 text-sm placeholder:text-gray-400 focus:outline-none focus:ring-1 focus:ring-gray-400 focus:ring-offset-1 disabled:cursor-not-allowed disabled:opacity-50"
                      type="number"
                      placeholder="Mobile Number"
                      name="mobile"
                      pattern="[5-9]{1}[0-9]{9}"
                      value={userDetails.mobile}
                      onChange={handleInputChange}
                      required={true}
                    ></input>
                  </div>
                </div>
                <div>
                  <div className="flex items-center justify-between">
                    <label htmlFor="password" className="text-base font-medium text-gray-900">
                      Password
                    </label>
                  </div>
                  <div className="mt-2">
                    <input
                      className="flex h-10 w-full rounded-md border border-gray-300 bg-transparent px-3 py-2 text-sm placeholder:text-gray-400 focus:outline-none focus:ring-1 focus:ring-gray-400 focus:ring-offset-1 disabled:cursor-not-allowed disabled:opacity-50"
                      type="password"
                      placeholder="Password"
                      name="password"
                      value={userDetails.password}
                      onChange={handleInputChange}
                      required={true}
                      minLength={8}
                    ></input>
                  </div>
                </div>
                <div>
                  <button
                    type="submit"
                    disabled={is_disable}
                    className={`inline-flex w-full items-center justify-center rounded-md ${is_disable?'bg-stone-500':'bg-stone-900'} px-3.5 py-2.5 font-semibold leading-7 text-white ${is_disable?'':'hover:bg-black/80'}`}
                  >
                    Create Account <ArrowRight className="ml-2" size={16} />
                  </button>
                </div>
              </div>
            </form>
          </div>
            </>
          )}{otpBox && (
            <>
            <h2 className="text-center text-2xl font-bold leading-tight text-black">
            Sign up to create account
          </h2>
          
          <div className="mt-5 mb-5 rounded-md border-l-4 border-green-500 bg-green-100 p-4">
            <div className="flex items-center  space-x-4">
              <div>
                <CheckCircle className="h-6 w-6 text-green-600" />
              </div>
              <div>
                <p className="text-sm font-medium text-green-600">
                  OTP sent successfully on your Email..
                </p>
              </div>
            </div>
          </div>

          {OTPerror && <div className="rounded-md mb-5 border-l-4 border-yellow-500 bg-yellow-100 p-4">
            <div className="flex items-center space-x-4">
            <div>
                <AlertCircle className="h-6 w-6 text-yellow-600" />
            </div>
            <div>
                <p className="text-sm font-medium text-yellow-600">
                {OTPerror}
                </p>
            </div>
            </div>
        </div>}
            <div className="border rounded-md p-5">
              <form onSubmit={(e)=>{handleOtpSubmit(e)}} method="post">
                <div className="space-y-5">
                  <div>
                    <label htmlFor="name" className="text-base font-medium text-gray-900">
                      Enter OTP
                    </label>
                    <div className="mt-2">
                      <input
                        className="flex h-10 w-full rounded-md border border-gray-300 bg-transparent px-3 py-2 text-sm placeholder:text-gray-400 focus:outline-none focus:ring-1 focus:ring-gray-400 focus:ring-offset-1 disabled:cursor-not-allowed disabled:opacity-50"
                        type="text"
                        placeholder="Enter 6 Digit OTP Here"
                        id="name"
                        style={{textAlign:"center"}}
                        pattern="[0-9]{6}"
                        value={otp}
                        onChange={(e) => setOtp(e.target.value)}
                        required={true}
                      ></input>
                    </div>
                  </div>
                  <div>
                    <button
                      type="submit"
                      disabled={is_disable}
                      className={`inline-flex w-full items-center justify-center rounded-md ${is_disable?'bg-stone-500':'bg-stone-900'} px-3.5 py-2.5 font-semibold leading-7 text-white ${is_disable?'':'hover:bg-black/80'}`}
                    >
                      Verify OTP <ArrowRight className="ml-2" size={16} />
                    </button>
                  </div>
                </div>
              </form>
            </div>
            </>
          )}
        </div>
      </div>
    </section>

     
    </>
  );
};
