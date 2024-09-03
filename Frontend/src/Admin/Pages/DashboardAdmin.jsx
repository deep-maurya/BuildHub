import React, { useState } from 'react';
import { Layout } from '../../Components/Panel/Layout';
import Calender from '../../Components/Utils/Calender';

export const DashboardAdmin = () => {
  // State to keep track of the active tab
  const [activeTab, setActiveTab] = useState('profile');

  // Function to handle tab change
  const handleTabChange = (tab) => {
    setActiveTab(tab);
  };
  const sessions = [
    {
      title: 'Math',
      startTime: '2024-09-01T10:00:00', // ISO format time
      endTime: '2024-09-01T11:30:00',
    },{
      title: 'Math',
      startTime: '2024-09-01T11:00:00', // ISO format time
      endTime: '2024-09-01T12:00:00',
    }
  ];
  

  return (
    <Layout For='admin'>
      <div className="mb-4 font-bold  border-b border-gray-200">
        <ul className="flex flex-wrap text-sm bg-violet-100 font-bold text-center" role="tablist">
          <li className="me-2" role="presentation">
            <button
              className={`inline-block p-4 border-b-2 rounded-t-lg ${
                activeTab === 'profile' ? 'text-purple-600 border-purple-600' : 'text-gray-500 border-transparent hover:text-gray-600 hover:border-gray-300'
              }`}
              onClick={() => handleTabChange('profile')}
              type="button"
              role="tab"
              aria-controls="profile"
              aria-selected={activeTab === 'profile'}
            >
              Profile
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
              Dashboard
            </button>
          </li>
          <li className="me-2" role="presentation">
            <button
              className={`inline-block p-4 border-b-2 rounded-t-lg ${
                activeTab === 'settings' ? 'text-purple-600 border-purple-600' : 'text-gray-500 border-transparent hover:text-gray-600 hover:border-gray-300'
              }`}
              onClick={() => handleTabChange('settings')}
              type="button"
              role="tab"
              aria-controls="settings"
              aria-selected={activeTab === 'settings'}
            >
              Settings
            </button>
          </li>
          <li role="presentation">
            <button
              className={`inline-block p-4 border-b-2 rounded-t-lg ${
                activeTab === 'contacts' ? 'text-purple-600 border-purple-600' : 'text-gray-500 border-transparent hover:text-gray-600 hover:border-gray-300'
              }`}
              onClick={() => handleTabChange('contacts')}
              type="button"
              role="tab"
              aria-controls="contacts"
              aria-selected={activeTab === 'contacts'}
            >
              Contacts
            </button>
          </li>
        </ul>
      </div>
      <div className='mb-5' id="default-styled-tab-content">
        <div
          className={`p-4 rounded-lg bg-gray-50 dark:bg-gray-800 ${activeTab === 'profile' ? '' : 'hidden'}`}
          id="styled-profile"
          role="tabpanel"
          aria-labelledby="profile-tab"
        >
          <Calender sessions={sessions}/>
        </div>
        <div
          className={`p-4 rounded-lg bg-gray-50 dark:bg-gray-800 ${activeTab === 'dashboard' ? '' : 'hidden'}`}
          id="styled-dashboard"
          role="tabpanel"
          aria-labelledby="dashboard-tab"
        >
          <p className="text-sm text-gray-500 dark:text-gray-400">
            This is some placeholder content the <strong className="font-medium text-gray-800 dark:text-white">Dashboard tab's associated content</strong>. Clicking another tab will toggle the visibility of this one for the next. The tab JavaScript swaps classes to control the content visibility and styling.
          </p>
        </div>
        <div
          className={`p-4 rounded-lg bg-gray-50 dark:bg-gray-800 ${activeTab === 'settings' ? '' : 'hidden'}`}
          id="styled-settings"
          role="tabpanel"
          aria-labelledby="settings-tab"
        >
          <p className="text-sm text-gray-500 dark:text-gray-400">
            This is some placeholder content the <strong className="font-medium text-gray-800 dark:text-white">Settings tab's associated content</strong>. Clicking another tab will toggle the visibility of this one for the next. The tab JavaScript swaps classes to control the content visibility and styling.
          </p>
        </div>
        <div
          className={`p-4 rounded-lg bg-gray-50 dark:bg-gray-800 ${activeTab === 'contacts' ? '' : 'hidden'}`}
          id="styled-contacts"
          role="tabpanel"
          aria-labelledby="contacts-tab"
        >
          <p className="text-sm text-gray-500 dark:text-gray-400">
            This is some placeholder content the <strong className="font-medium text-gray-800 dark:text-white">Contacts tab's associated content</strong>. Clicking another tab will toggle the visibility of this one for the next. The tab JavaScript swaps classes to control the content visibility and styling.
          </p>
        </div>
      </div>
      
    </Layout>
  );
};
