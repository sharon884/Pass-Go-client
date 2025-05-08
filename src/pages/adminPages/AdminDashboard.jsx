import React from 'react'
import SideBar from '../../components/generalComponents/SideBar';
import UserList from '../../components/AdminComponents/userList';
import HostList from '../../components/AdminComponents/HostList';

function AdminDashboard() {
  return (
    <div>
      
    <SideBar/>
    <UserList/>
    <HostList/>

    </div>
  )
}

export default AdminDashboard
