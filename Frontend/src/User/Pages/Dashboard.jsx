import React, { useEffect, useState } from 'react';
import { Layout } from '../../Components/Panel/Layout';
import Calender from '../../Components/Utils/Calender';
import { TodaySchedule } from '../Components/TodaySchedule';
import { Loading } from '../../Components/Utils/Loading';
import { AxioGet } from '../../utils/AxiosUtils';

export const Dashboard = () => {
  const [activeTab, setActiveTab] = useState('schedule');
  const [loading,setLoading] = useState(true)
  const [sessions,setSessions] = useState([])
  const handleTabChange = (tab) => {
    setActiveTab(tab);
  };
  useEffect(() => {
    const get_sessions = async () => {
      try {
        const response = await AxioGet(`user/sessions`);
        console.log(response.data); // Displaying the response data
        setLoading(false);
        setSessions(response.data.sessions)
        //setUserData(response.data);
      } catch (error) {
        console.error('Error fetching user data:', error);
        setLoading(false);
      }
    };

    get_sessions();
  }, []);
  return (
    <Layout For='student'>
      <div className="mb-4 font-bold  border-b border-gray-200">
        <ul className="flex flex-wrap text-sm bg-violet-100 font-bold text-center" role="tablist">
          <li className="me-2" role="presentation">
            <button
              className={`inline-block p-4 border-b-2 rounded-t-lg ${
                activeTab === 'schedule' ? 'text-purple-600 border-purple-600' : 'text-gray-500 border-transparent hover:text-gray-600 hover:border-gray-300'
              }`}
              onClick={() => handleTabChange('schedule')}
              type="button"
              role="tab"
              aria-controls="schedule"
              aria-selected={activeTab === 'schedule'}
            >
              Sprint Plan
            </button>
          </li>
          <li className="me-2" role="presentation">
            <button
              className={`inline-block p-4 border-b-2 rounded-t-lg ${
                activeTab === 'dashboard' ? 'text-purple-600 border-purple-600' : 'text-gray-500 border-transparent hover:text-gray-600 hover:border-gray-300'
              }`}
              onClick={() => handleTabChange('dashboard')}
              type="button"
              role="tab"
              aria-controls="dashboard"
              aria-selected={activeTab === 'dashboard'}
            >
              Today Schedule
            </button>
          </li>
        </ul>
      </div>
      <div className='mb-5' id="default-styled-tab-content">
        <div
          className={`rounded-lg bg-gray-50 ${activeTab === 'schedule' ? '' : 'hidden'}`}
          id="styled-profile"
          role="tabpanel"
          aria-labelledby="profile-tab"
        >
          {loading && <Loading/>}
          {!loading && <Calender sessions={sessions}/>}
        </div>
        <div
          className={` rounded-lg bg-gray-50 dark:bg-gray-800 ${activeTab === 'dashboard' ? '' : 'hidden'}`}
          id="styled-dashboard"
          role="tabpanel"
          aria-labelledby="dashboard-tab"
        >
          <TodaySchedule/>
        </div>
      </div>
      
    </Layout>
  );
};
