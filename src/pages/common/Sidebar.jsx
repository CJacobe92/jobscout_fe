import fetchUserData from '@hooks/queries/fetchUserData'
import { userType } from '@services/storage';
import React from 'react'
import { Link } from 'react-router-dom';

const Sidebar = () => {

  const {data} = fetchUserData();
  const role = userType.get();

  const ownerItems =  [
    {
      name: 'Dashboard',
      path: `/t/dashboard`,
    },
    {
      name: 'Assigned',
      path: `/t/assigned`,
    },
    {
      name: 'Unassigned',
      path: `/t/unassigned`,
    },    
    {
      name: 'Clients',
      path: `/t/clients`,
    },
    {
      name: 'Employees',
      path: `/t/employees`,
    }
  ]

  const renderMenuItems = () => {
    switch(role) {
      case 'owner':
        return ownerItems
      default: 
        return []
    }
  }

  const menuItems = renderMenuItems();

  return (
    <div className='w-52'>
      <div className='h-[10vh]'>
        JobScout
      </div>
      <div className='h-[90vh]'>
        <div className='flex flex-col items-end w-full px-10 py-4 border border-black space-y-2 h-full'>
          {menuItems.map((data, index) => (
            <Link to={data.path} key={index} className='mr-auto'>{data.name}</Link>
          ))}
          </div>
      </div>
    </div>
  )
}

export default Sidebar