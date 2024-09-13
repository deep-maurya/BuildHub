import React, { useEffect, useState } from 'react';
import { Layout } from '../../Components/Panel/Layout';
import { Loading } from '../../Components/Utils/Loading';
import schedule from '../../../public/schedule.png';
import Cookies from 'js-cookie';
import { AxioPost } from '../../utils/AxiosUtils';
import { useParams } from 'react-router-dom';
import { SessionDetails } from '../Components/SessionDetails';
import { Link } from 'react-router-dom';

export const SessionsPageInstructor = () => {
  const { session_id } = useParams(); // session_id will be undefined if not present
  const [sessions, setSessions] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadSessions = async () => {
      const authToken = Cookies.get('instructor_token');
      if (authToken && session_id === undefined) { // Check for undefined instead of null
        try {
          const response = await AxioPost('instructor/sessions');
          // Sorting sessions based on startTime in ascending order
          response?.data?.session.sort((a, b) => new Date(a.startTime) - new Date(b.startTime));
          setSessions(response.data.session);
        } catch (error) {
          console.error('Error loading sessions:', error); // Properly log errors for debugging
        } finally {
          setLoading(false); // Ensure loading state is updated in both success and error cases
        }
      } else {
        setLoading(false);
      }
    };
    loadSessions();
  }, [session_id]); // Include session_id in dependency array

  return (
    <Layout For='instructor'>
      {loading && <Loading />}
      {!loading && session_id === undefined && ( // Check for undefined instead of null
        <>
          {sessions.length > 0 ? (
            <ul>
              {sessions.map((session) => (
                <li className='bg-white mb-4 rounded-md p-5' key={session._id}>
                  <div className="flex items-center justify-between">
                    <div className="">
                      <span className="bg-blue-100 text-bold text-blue-800 text-xs me-2 px-2.5 py-0.5 rounded">{session.course_id.title}</span>
                      <span className="bg-gray-100 text-bold text-gray-800 text-xs me-2 px-2.5 py-0.5 rounded">{session.batch_id.name}</span>
                      <h3 className='font-black text-neutral-500 text-2xl'>{session.title}</h3>
                      <div className="flex gap-5 font-medium text-neutral-500">
                        <p> <small>Date:</small> {new Date(session.startTime).toLocaleDateString('en-GB')}</p>
                        <p> <small>Start Time:</small>  {new Date(session.startTime).toLocaleTimeString()}</p>
                        <p> <small>End Time:</small>  {new Date(session.endTime).toLocaleTimeString()}</p>
                      </div>
                    </div>
                    <Link to={`/instructor/session/${session._id}`} className="rounded-md bg-violet-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-violet-700 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-600">
                      More Details
                    </Link>
                  </div>
                </li>
              ))}
            </ul>
          ) : (
            <div className="flex flex-col items-center pb-10 rounded-s-xl p-5 py-9 bg-white">
              <img className="w-24 h-24 mt-10 mb-3 mb-5" src={schedule} alt="No sessions available" />
              <h1 className='mb-10 font-black text-center text-neutral-500 text-3xl'>No Sessions are Available Here</h1>
            </div>
          )}
        </>
      )}
      {!loading && session_id !== undefined && <SessionDetails session_id={session_id}/>}
    </Layout>
  );
};
