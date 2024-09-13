import React, { useEffect, useState } from 'react';
import noaccess from '../../../public/website.png';
import { Loading } from '../../Components/Utils/Loading';
import { AxioGet } from '../../utils/AxiosUtils'; // Assuming AxioPut is configured for PUT requests
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css'; // Import Quill styles

export const SessionDetails = (props) => {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [sessionData, setSessionData] = useState(null);
  const [notes, setNotes] = useState(''); // State to handle notes
  const [activeTab, setActiveTab] = useState('notes'); // State to manage active tab
  const [isEditing, setIsEditing] = useState(false); // State to manage edit mode
  const session_id = props.session_id;

  useEffect(() => {
    setError('');
    const loadSessionDetails = async () => {
      try {
        const session_data = await AxioGet(`instructor/session/${session_id}`);
        const { status } = session_data.data;
        if (status) {
          setSessionData(session_data.data);
        } else {
          setError(session_data.data.message);
        }
      } catch (error) {
        setError('Something went wrong, try again later.');
      } finally {
        setLoading(false);
      }
    };
    loadSessionDetails();
  }, [session_id]);

  const handleNotesChange = (value) => {
    setNotes(value);
  };

  const handleTabChange = (tab) => {
    setActiveTab(tab);
  };

  const handleEditToggle = () => {
    setIsEditing(!isEditing);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setSessionData({ ...sessionData, [name]: value });
  };

  const handleSaveChanges = async () => {
    try {
      const response = await AxioGet(`instructor/session/${session_id}`, {
        title: sessionData.title,
        startTime: sessionData.startTime,
        endTime: sessionData.endTime,
      });
      if (response.data.status) {
        setIsEditing(false);
        alert('Session details updated successfully');
      } else {
        setError('Failed to update session details');
      }
    } catch (error) {
      setError('Something went wrong, unable to save changes.');
    }
  };

  if (loading) {
    return <Loading />;
  }

  return (
    <>
      {error && (
        <div className="flex flex-col items-center pb-10 rounded-s-xl p-5 py-9 bg-white">
          <img className="w-24 h-24 mt-10 mb-3 mb-5" src={noaccess} alt="No access" />
          <h1 className="mb-10 font-medium text-center text-neutral-500 text-xl">{error}</h1>
        </div>
      )}
      {sessionData && (
        <>
        <div className="p-5 bg-white ">
          <div className="flex border-b-4 border-gray-200  justify-between mb-4 items-center pb-4">
            <h2 className="text-2xl font-black">{isEditing ? 'Edit Session' : sessionData.title}</h2>
            <button 
              onClick={handleEditToggle} 
              className="bg-violet-500 font-bold text-white py-1 px-4 rounded-md"
            >
              {isEditing ? 'Cancel' : 'Edit'}
            </button>
          </div>

          {isEditing ? (
            <>
              <div className="mb-4">
                <label className="block text-gray-700">Title</label>
                <input 
                  type="text" 
                  name="title" 
                  value={sessionData.title} 
                  onChange={handleInputChange} 
                  className="border font-bold rounded-md p-2 w-full"
                />
              </div>
              <div className="mb-4">
                <label className="block  text-gray-700">Start Time</label>
                <input 
                  type="datetime-local" 
                  name="startTime" 
                  value={sessionData.startTime} 
                  onChange={handleInputChange} 
                  className="border font-bold rounded-md p-2 w-full"
                />
              </div>
              <div className="mb-4">
                <label className="block  text-gray-700">End Time</label>
                <input 
                  type="datetime-local" 
                  name="endTime" 
                  value={sessionData.endTime} 
                  onChange={handleInputChange} 
                  className="border font-bold rounded-md p-2 w-full"
                />
              </div>
              <button 
                onClick={handleSaveChanges} 
                className="bg-violet-500 text-white py-2 px-4 font-bold rounded-md"
              >
                Save Changes
              </button>
            </>
          ) : (
            <>
              <div className="flex mb-5 gap-5">
                <p><strong>Course :</strong> {sessionData.course}</p>
                <p><strong>Batch :</strong> {sessionData.batch.name}</p>
              </div>
              <p><strong>Start Time:</strong> {sessionData.startTime}</p>
              <p><strong>End Time:</strong> {sessionData.endTime}</p>
            </>
          )}
          </div>
          <div className="mt-5 p-5 bg-white">
          {/* Tabs Navigation */}
          <div className="border-b-4 border-gray-200">
            <nav className="flex -mb-px space-x-8">
            <button
                className={`py-4 px-1 text-sm font-bold ${activeTab === 'video' ? 'border-b-2 border-indigo-500 text-indigo-600' : 'text-gray-500 hover:text-gray-700'}`}
                onClick={() => handleTabChange('video')}
              >
                Video
              </button>
              <button
                className={`py-4 px-1 text-sm font-bold ${activeTab === 'notes' ? 'border-b-2 border-indigo-500 text-indigo-600' : 'text-gray-500 hover:text-gray-700'}`}
                onClick={() => handleTabChange('notes')}
              >
                Notes
              </button>
              <button
                className={`py-4 px-1 text-sm font-bold ${activeTab === 'attendance' ? 'border-b-2 border-indigo-500 text-indigo-600' : 'text-gray-500 hover:text-gray-700'}`}
                onClick={() => handleTabChange('attendance')}
              >
                Attendance
              </button>
            </nav>
          </div>

          {/* Tab Content */}
          <div className="mt-5">
            {activeTab === 'notes' && (
              <div>
                <ReactQuill 
                  value={notes} 
                  onChange={handleNotesChange} 
                  theme="snow"
                  placeholder="Add your notes here..."
                />
              </div>
            )}

            {activeTab === 'attendance' && (
              <div>
                <h3 className="text-xl font-semibold mb-2">Attendance</h3>
                <p>Attendance details will be displayed here.</p>
                {/* You can replace the above line with actual attendance content or component */}
              </div>
            )}

            {activeTab === 'video' && (
              <div className='bg-blue-100 rounded-md px-5 py-3'>
                <p className='font-bold'>Videos Help Student to Revise the Session again whenever required</p>
              </div>
            )}
          </div>
        </div>
        </>
      )}
    </>
  );
};
