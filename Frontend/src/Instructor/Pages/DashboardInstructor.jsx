import React, { useEffect, useState } from 'react'
import { Layout } from '../../Components/Panel/Layout'
import Calendar from '../../Components/Utils/Calender'
import { Loading } from '../../Components/Utils/Loading';
import { AxioGet, AxioPost } from '../../utils/AxiosUtils';
import Cookies from 'js-cookie';

export const DashboardInstructor = () => {
  const [sessions, setSessions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedSession, setSelectedSession] = useState(null);

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
      <h1 className='text-3xl mb-3 border-l-violet-500 font-black'>Your Schedule</h1>
      {loading &&  <Loading/>}
      {!loading && <Calendar sessions={sessions}/>}
    </Layout>
  )
}
