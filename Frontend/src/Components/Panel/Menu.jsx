import { FileTextIcon, HomeIcon, SettingsIcon, UserIcon } from "lucide-react";

export const  menuItems = {
    admin: [
      { name: 'Dashboard', icon: <HomeIcon />, path: '/admin/dashboard' },
      { name: 'Batch', icon: <SettingsIcon />, path: '/admin/batch' },
      { name: 'Manage Users', icon: <UserIcon />, path: '/admin/users' },
    ],
    instructor: [
      { name: 'Dashboard', icon: <HomeIcon />, path: '/instructor/dashboard' },
      { name: 'Courses', icon: <FileTextIcon />, path: '/instructor/course' },
      { name: 'Sessions', icon: <UserIcon />, path: '/instructor/session' },
      { name: 'Profile', icon: <UserIcon />, path: '/instructor/profile' },
      
    ],
    student: [
      { name: 'Dashboard', icon: <HomeIcon />, path: '/dashboard' },
      { name: 'Lectures', icon: <FileTextIcon />, path: '/session' },
      { name: 'Profile', icon: <UserIcon />, path: '/profile' },
    ],
  };