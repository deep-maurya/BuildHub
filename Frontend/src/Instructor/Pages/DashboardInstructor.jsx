import React, { useEffect, useState } from 'react'
import { Layout } from '../../Components/Panel/Layout'
import Calendar from '../../Components/Utils/Calender'
import { Loading } from '../../Components/Utils/Loading';
import { AxioGet, AxioPost } from '../../utils/AxiosUtils';
import Cookies from 'js-cookie';
import { TodaySession } from '../Components/TodaySession';

export const DashboardInstructor = () => {
  const [sessions, setSessions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState('dashboard');
  const handleTabChange = (tab) => {
    setActiveTab(tab);
  };
  useEffect(() => {
    const loadSessions = async () => {
      const authToken = Cookies.get('instructor_token');
      if (authToken) {
        try {
          const response = await AxioPost('instructor/sessions');
          setSessions(response.data.session);
          setLoading(false);
        } catch (error) {
          //console.error('Error fetching sessions:', error);
          setLoading(false);
        }
      } else {
        //console.log('No auth token, redirecting to login');
        setLoading(false);
      }
    };

    loadSessions();
  }, []);
  return (
    <Layout For={"instructor"}>
      <div className="mb-4 font-bold  border-b border-gray-200">
        <ul className="flex flex-wrap text-sm bg-violet-100 font-bold text-center" role="tablist">
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
          
        </ul>
      </div>
      <div className='mb-5' id="default-styled-tab-content">
        <div
          className={`rounded-lg  ${activeTab === 'schedule' ? '' : 'hidden'}`}
          id="styled-profile"
          role="tabpanel"
          aria-labelledby="profile-tab"
        >
          <h1 className='text-3xl mb-3 border-l-violet-500 font-black'>Your Schedule</h1>
          {loading &&  <Loading/>}
          {!loading && <Calendar sessions={sessions}/>}
        </div>
        <div
          className={` rounded-lg ${activeTab === 'dashboard' ? '' : 'hidden'}`}
          id="styled-dashboard"
          role="tabpanel"
          aria-labelledby="dashboard-tab"
        >
          <h1 className='text-3xl mb-3 border-l-violet-500 font-black'>Today Schedule</h1>
          {/* <TodaySchedule/> */}
          <TodaySession sessions={sessions} />
        </div>
      </div>
      
    </Layout>
  )
}
