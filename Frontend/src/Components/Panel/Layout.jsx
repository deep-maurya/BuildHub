// src/App.jsx
import React, { useEffect, useState } from 'react';
import logo from '/logo.png';
import { HomeIcon, SettingsIcon, UserIcon, FileTextIcon } from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';
import Cookies from 'js-cookie';
import { AxioGet, AxioPost } from '../../utils/AxiosUtils';
import Swal from 'sweetalert2';
import { menuItems } from './Menu';

export const Layout = (props) => {
  const [template_color, set_Template_color] = useState(props.color);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [authStatus, setAuth] = useState(false);
  const [authUser, setAuthUser] = useState(null); // Initialize as null
  const navigate = useNavigate();

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  const handleLogout =async () => {
    Swal.fire({
      title: "Are you sure?",
      text: "You want to logout",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, Logout"
    }).then(async(result) => {
      if (result.isConfirmed) {
        try {
          const logout = await  AxioGet('logout');
        } catch (error) {
        }
        setTimeout(() => {
          navigate("/login")
        }, 100);
        Swal.fire({
          title: "Logout!",
          text: "Logout Successfull",
          icon: "success",
          timer: 1500
        });
      }
    });
  }
  // Define menu items for each role
  


  const isActive = (path) => `${window.location.pathname}` === path;
  const items = menuItems[props.For] || [];

  useEffect(() => {
    const checkAuth = async () => {
      //console.log("kk")
      const token_select = ((props.For=='student')?'auth_token':(((props.For=='admin')?'admin_token':((props.For=='instructor')?'instructor_token':"NA"))))
      const authToken = Cookies.get(token_select);
      //console.log(authToken)
      if (authToken) {
        try {
          const response = await AxioPost((props.For=='student')?'token_verify':(((props.For=='admin')?'token_verify_admin':((props.For=='instructor')?'token_verify_instructor':"NA"))));
          //console.log(response)
          setAuthUser(response.data.user);
          console.log(response.data.user)
          if(props.For===response.data.user.role){
            setAuth(true);
          } else {
            navigate('/');
          }
        } catch (error) {
          console.error('Error verifying token:', error);
          setAuth(false);
          navigate('/'); 
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
              {authUser && <span className="font-bold">{authUser.name}</span>}
              <button onClick={handleLogout} className={`bg-blue-500 text-white p-2 rounded`}>
                Logout
              </button>
            </div>
          </header>
          <main className="flex-1 p-4 bg-gray-100 overflow-auto">
            {props.children}
          </main>
        </div>
      </div>
    </div>)}
    </>
  );
};
