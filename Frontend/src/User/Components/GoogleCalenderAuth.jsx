import React, { useEffect } from 'react'
import { useSearchParams } from 'react-router-dom';
import { AxioGet } from '../../utils/AxiosUtils';
import Swal from 'sweetalert2';

export const GoogleCalenderAuth = () => {
    const [searchParams] = useSearchParams();
    const code = searchParams.get('code')
    const handle_calender = async() =>{
        try {
            window.open('http://localhost:9090/user/auth', '_blank');
          } catch (error) {
            console.log(error)
            Swal.fire({
                position: "center",
                icon: "warning",
                text: "Google Calender Authentication not working, Try After some time",
                showConfirmButton: false,
                timer: 1500
            });
          }
      }
    useEffect(()=>{
        if(code){
            const google_Auth_callback = async()=>{
                try {
                    const response = await AxioGet('user/oauth2callback',{code})
                    if(response.data.status===1){
                        Swal.fire({
                            position: "center",
                            icon: 'success',
                            text: "Google Calender Authentication Successfull",
                            showConfirmButton: false,
                            timer: 1500
                        });
                    } else {
                        Swal.fire({
                            position: "center",
                            icon: 'error',
                            text: "Google Calender Authentication not working, Try After some time",
                            showConfirmButton: false,
                            timer: 1500
                        });
                    }
                } catch (error) {
                    Swal.fire({
                        position: "center",
                        icon: 'error',
                        text: "Google Calender Authentication not working, Try After some time",
                        showConfirmButton: false,
                        timer: 1500
                    });
                }
                
            }
            google_Auth_callback();
        }
      },[code])
  return (
    <div className="w-full p-4 mb-5 text-center bg-white border rounded-lg shadow sm:p-8">
    <div className="mx-auto max-w-7xl mb-5">
        <div className="mx-auto max-w-2xl text-center">
            <h3 className="mt-3 text-lg font-bold leading-tight text-black  lg:mt-5">
                Stay Connected with <span className="border-b-8 border-violet-500">Google Calendar</span>
            </h3>
            <p className="mt-3 mb-3">
                Connect your Google Calendar to keep track of all your sessions and appointments. 
                Ensure you never miss an update and manage your schedule efficiently.
            </p>

            <button
                onClick={handle_calender}
                className="mt-8 rounded-md bg-violet-500 px-4 py-2 text-sm font-semibold text-white shadow-sm hover:bg-violet-600 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-violet-500"
            >
                Connect with Google Calendar
            </button>
        </div>
    </div>
</div>


  )
}
