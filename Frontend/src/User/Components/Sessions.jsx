import React, { useEffect, useState } from 'react';
import Cookies from 'js-cookie';
import { AxioGet } from '../../utils/AxiosUtils';
import { CalendarCheck, User2Icon } from 'lucide-react';
import { Link, useParams } from 'react-router-dom';
import { SessionDetails } from './SessionDetails';
import { Loading } from '../../Components/Utils/Loading';

export const Session = () => {
  const { session_id } = useParams();
  const [sessions, setSessions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedSession, setSelectedSession] = useState(null);

  useEffect(() => {
    const loadSessions = async () => {
      const authToken = Cookies.get('auth_token');
      if (authToken) {
        try {
          const response = await AxioGet('user/sessions');
          setSessions(response.data.sessions); // Assuming sessions is an array
          setLoading(false);
        } catch (error) {
          console.error('Error fetching sessions:', error);
          setLoading(false);
        }
      } else {
        console.log('No auth token, redirecting to login');
        setLoading(false);
      }
    };

    loadSessions();
  }, []);

  useEffect(() => {
    if (session_id && sessions.length > 0) {
      const foundSession = sessions.find(session => session._id === session_id);
      setSelectedSession(foundSession);
    }
  }, [session_id, sessions]);

  return (
    <>
      {loading ? (
        <Loading/>
      ) : (
        <>
          {session_id ? (
            <SessionDetails/>
          ) : (
            <div className="mb-4 border border-gray-100 bg-white">
              {sessions.length > 0 ? (
                <ol className="">
                  {sessions.map((session) => (
                    <li key={session._id} className="border-b hover:bg-violet-100 transition border-gray-200 p-3 last:border-none">
                      <div className="flex justify-between items-center">
                        <Link to={`/session/${session._id}`} className="block p-3 ">
                          <h3 className="text-2xl font-extrabold  mb-2">
                            {session.title || 'Session Title'}
                          </h3>
                          <div style={{ fontSize: "12px" }} className="flex font-extrabold gap-5">
                            <div className="flex items-center gap-2">
                              <CalendarCheck className="text-violet-600" />
                              <span className=" font-medium text-gray-600">
                                {session.startTime || 'Session Date'}
                              </span>
                            </div>
                            <div className="flex items-center gap-2">
                              <User2Icon className="text-violet-600" />
                              <span className=" font-medium text-600">
                                {session.course?.instructor?.name || 'Session Instructor'}
                              </span>
                            </div>
                          </div>
                        </Link>
                        <button className='mr-5 rounded-lg px-4 text-green-600 font-bold py-2 bg-green-100'>Present</button>
                      </div>
                    </li>
                  ))}
                </ol>
              ) : (
                <p className="text-gray-600">No sessions available.</p>
              )}
            </div>
          )}
        </>
      )}
    </>
  );
};
