import React, { useEffect, useState } from 'react';
import { Loading } from './Loading';
import { AxioGet } from '../../utils/AxiosUtils';
import { GoogleCalenderAuth } from '../../User/Components/GoogleCalenderAuth';


export const ProfileUpdate = (props) => {
  const [loading, setLoading] = useState(true);
  const [userData, setUserData] = useState(null);

  useEffect(() => {
    const updateData = async () => {
      let endpoint = '';
      switch (props.For) {
        case 'student':
          endpoint = 'user'
          break;
        case 'instructor':
          endpoint = 'instructor'
        default:
          break;
      }
      try {
        const response = await AxioGet(`${endpoint}/`);
        console.log(response.data); // Displaying the response data
        setLoading(false);
        setUserData(response.data);
      } catch (error) {
        console.error('Error fetching user data:', error);
        setLoading(false);
      }
    };

    updateData();
  }, []);

  if (loading) {
    return <Loading />;
  }

  if (!userData) {
    return <div>Error loading user data</div>;
  }

  return (
    <>{userData.tokens.length === 0 && props.for==='student' && <GoogleCalenderAuth />}
    <>
    <h1 className='text-3xl font-black'>Profile</h1>
    <div className="p-6 font-semibold max-w-md mt-3 bg-white space-y-4">
      <div className="mt-4">
        <label className="block text-sm font-semibold text-gray-700">Name</label>
        <div className="mt-1 p-2 border border-gray-300 rounded-md">{userData.name}</div>
      </div>

      <div className="mt-4">
        <label className="block text-sm  text-gray-700">Email</label>
        <div className="mt-1 p-2 border border-gray-300 rounded-md">{userData.email}</div>
      </div>

      <div className="mt-4">
        <label className="block text-sm text-gray-700">Mobile</label>
        <div className="mt-1 p-2 border border-gray-300 rounded-md">{userData.mobile}</div>
      </div>

      <div className="mt-4">
        <label className="block text-sm text-gray-700">Role</label>
        <div className="mt-1 p-2 border border-gray-300 rounded-md">{userData.role}</div>
      </div>
    </div>
    </>
    </>
  );
};
