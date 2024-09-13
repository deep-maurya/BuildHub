import { LibraryBig } from 'lucide-react';
import React from 'react'
import schedule from '../../../public/schedule.png'
import moment from 'moment-timezone';

export const TodaySession = ({sessions}) => {
  const today = moment().tz('Asia/Kolkata').format('YYYY-MM-DD');
  const todaysSessions = sessions.filter((session) => {
    const sessionDate = session.startTime.slice(0, 10); // Extract date part from startTime
    return sessionDate === today;
  });
  console.log(todaysSessions)

  return (
    <>
    {todaysSessions.length > 0 ? (
        <ul>
          {todaysSessions.map((session) => (
            <li className='bg-white mb-4 rounded-md p-5' key={session._id}>
              <span className="bg-blue-100 text-bold text-blue-800 text-xs  me-2 px-2.5 py-0.5 rounded">{session.course_id.title}</span>
              <span className="bg-gray-100 text-bold text-gray-800 text-xs  me-2 px-2.5 py-0.5 rounded">{session.batch_id.name}</span>
              <h3 className='font-black text-neutral-500 text-2xl'>{session.title}</h3>
              <div className="flex gap-5 font-medium text-neutral-500">
              <p> <small>Start Time:</small> {new Date(session.startTime).toLocaleTimeString()}</p>
              <p> <small>End Time:</small> {new Date(session.endTime).toLocaleTimeString()}</p>
              </div>
            </li>
          ))}
        </ul>
      ) : (
        <div className="flex flex-col items-center pb-10 rounded-s-xl p-5 py-9 bg-white">
            <img className="w-24 h-24 mt-10 mb-3 mb-5" src={schedule} alt="Bonnie image"/>
            <h1 className='mb-10 font-black text-center text-neutral-500 text-3xl'>Looks like there is no schedule for Today</h1>
        </div>

      )}
    </>
  )
}
