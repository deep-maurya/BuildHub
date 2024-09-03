// src/App.jsx
import React, { useEffect, useState } from 'react';
import logo from '/logo.png';
import { HomeIcon, SettingsIcon, UserIcon, FileTextIcon } from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';
import Cookies from 'js-cookie';
import { AxioPost } from '../../utils/AxiosUtils';

export const Layout = (props) => {
  const [template_color, set_Template_color] = useState(props.color);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [authStatus, setAuth] = useState(false);
  const [authUser, setAuthUser] = useState(null); // Initialize as null
  const navigate = useNavigate();

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  // Define menu items for each role
  const menuItems = {
    admin: [
      { name: 'Dashboard', icon: <HomeIcon />, path: '/admin/dashboard' },
      { name: 'Batch', icon: <SettingsIcon />, path: '/admin/batch' },
      { name: 'Manage Users', icon: <UserIcon />, path: '/admin/users' },
    ],
    instructor: [
      { name: 'Instructor Home', icon: <HomeIcon />, path: '/instructor/home' },
      { name: 'Courses', icon: <FileTextIcon />, path: '/instructor/courses' },
      { name: 'Profile', icon: <UserIcon />, path: '/instructor/profile' },
    ],
    student: [
      { name: 'Dashboard', icon: <HomeIcon />, path: '/dashboard' },
      { name: 'Lectures', icon: <FileTextIcon />, path: '/session' },
      { name: 'Profile', icon: <UserIcon />, path: '/profile' },
    ],
  };

  // Function to check if the link is active
  const isActive = (path) => `${window.location.pathname}` === path;
  //console.log(window.location.pathname.split('/'))

  // Select menu items based on the role
  const items = menuItems[props.For] || [];

  useEffect(() => {
    const checkAuth = async () => {
      const authToken = Cookies.get((props.For=='student')?'auth_token':'admin_token');
      console.log(authToken)
      if (authToken) {
        try {
          const response = await AxioPost((props.For=='student')?'token_verify':'token_verify_admin', {});
          console.log(response)
          setAuthUser(response.data.user); // Set user data from response
          //console.log(props.For,response.data.user.role)
          if(props.For===response.data.user.role){
            setAuth(true);
          } else {
            navigate('/');
          }
        } catch (error) {
          console.error('Error verifying token:', error);
          setAuth(false); // Set auth status to false on error
          navigate('/'); // Redirect on error
        }
      } else {
        setAuth(false);
        navigate('/');
        //console.log("No auth token, redirecting to login");
      }
    };

    checkAuth();
  }, [navigate]);

  return (
    <>
    {authUser && (<div className="flex h-screen overflow-hidden">
      <aside
        style={{ padding: '0px' }}
        className={`fixed inset-y-0 left-0 bg-white z-30 w-64 text-violet-600 p-4 transform ${
          isSidebarOpen ? 'translate-x-0' : '-translate-x-full'
        } transition-transform duration-300 ease-in-out lg:translate-x-0 lg:relative lg:w-64`}
      >
        <img className="p-3 self-center ml-auto mr-auto" width={'75%'} src={logo} alt="Logo" />
        <hr />
        <div className="flex flex-col content-between">
          <nav className="p-0">
            <ul style={{ padding: '0px' }}>
              {items.map((item) => (
                <li key={item.path}>
                  <Link
                    to={item.path}
                    className={`flex font-bold gap-4 rounded-none p-4 pl-5 hover:bg-violet-100 rounded block ${
                      isActive(item.path) ? `bg-violet-100 border-l-4 border-l-violet-600` : ''
                    }`}
                  >
                    {item.icon} {item.name}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>
        </div>
      </aside>

      {/* Overlay for mobile when sidebar is open */}
      {isSidebarOpen && (
        <div
          className="fixed inset-0 bg-black opacity-50 z-20 lg:hidden"
          onClick={toggleSidebar}
        ></div>
      )}

      <div className="flex flex-1">
        <div className="flex-1 flex flex-col">
          {/* Header */}
          <header className="bg-white shadow p-4 flex items-center justify-between">
            {/* Toggle Button for Mobile */}
            <div className="flex">
              <button className="text-gray-800 lg:hidden" onClick={toggleSidebar}>
                <svg
                  className="w-6 h-6"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M4 6h16M4 12h16m-7 6h7"
                  />
                </svg>
              </button>
              <h1 className="text-xl ml-3 font-bold"></h1>
            </div>

            <div className="flex items-center space-x-4">
              <input
                type="text"
                placeholder="Search..."
                className="border rounded p-2"
              />
              
              {authUser && <span className="font-bold">Deepak</span>}
              <button className={`bg-blue-500 text-white p-2 rounded`}>
                Log Out
              </button>
            </div>
          </header>


          {/* <nav className="flex px-5 py-3 text-gray-700 border border-gray-200 bg-gray-50" aria-label="Breadcrumb">
            <ol className="inline-flex items-center space-x-1 md:space-x-2 rtl:space-x-reverse">
              <li className="inline-flex items-center">
                <a href="#" className="inline-flex items-center text-sm font-medium text-gray-700">
                  <svg className="w-3 h-3 me-2.5" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 20 20">
                    <path d="m19.707 9.293-2-2-7-7a1 1 0 0 0-1.414 0l-7 7-2 2a1 1 0 0 0 1.414 1.414L2 10.414V18a2 2 0 0 0 2 2h3a1 1 0 0 0 1-1v-4a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1v4a1 1 0 0 0 1 1h3a2 2 0 0 0 2-2v-7.586l.293.293a1 1 0 0 0 1.414-1.414Z"/>
                  </svg>
                  Home
                </a>
              </li>
              <li>
                <div className="flex items-center">
                  <svg className="rtl:rotate-180 block w-3 h-3 mx-1 text-gray-400 " aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 6 10">
                    <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m1 9 4-4-4-4"/>
                  </svg>
                  <a href="#" className="ms-1 text-sm font-medium text-gray-700  md:ms-2">Templates</a>
                </div>
              </li>
              <li aria-current="page">
                <div className="flex items-center">
                  <svg className="rtl:rotate-180  w-3 h-3 mx-1 text-gray-400" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 6 10">
                    <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m1 9 4-4-4-4"/>
                  </svg>
                  <span className="ms-1 text-sm font-medium text-gray-500 md:ms-2 dark:text-gray-400">Flowbite</span>
                </div>
              </li>
            </ol>
          </nav> */}


          {/* Main Content */}
          <main className="flex-1 p-4 bg-gray-100 overflow-auto">
            {props.children}
          </main>
        </div>
      </div>
    </div>)}
    </>
  );
};
