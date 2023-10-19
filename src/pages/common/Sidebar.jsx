import ProfileDropDown from "@components/dropdown/ProfileDropDown";
import {
  Avatar,
  AvatarFallback,
  AvatarImage,
} from "@components/ui/avatar"
import { Button } from '@components/ui/button';
import { Separator } from "@components/ui/separator";
import fetchUserData from '@hooks/queries/fetchUserData'
import { DotsHorizontalIcon } from "@radix-ui/react-icons";
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
    <div className='text-white bg-primary w-72'>
      <div className='h-[10vh]'>
        JobScout
      </div>
      <div className='h-[90vh] flex flex-col items-center justify-between'>
        <div className='flex flex-col items-end w-full gap-4 px-10 py-4'>
          {menuItems.map((data, index) => (
            <Link to={data.path} key={index} className='mr-auto'>{data.name}</Link>
          ))}
        </div>
        <Separator className='mt-auto border border-gray-600'/>
        <div className="flex flex-row items-center gap-2 px-2 py-4 justify-evenly">
          <Avatar>
            <AvatarImage src="https://github.com/shadcn.png" alt="@shadcn" />
            <AvatarFallback>CN</AvatarFallback>
          </Avatar>
          <div className='text-xs'>
            <h1>{data?.email}</h1>
            <div>{data?.firstname} {data?.lastname}</div>
          </div>
          <ProfileDropDown data={data}/>
        </div>
      </div>
    </div>
  )
}

export default Sidebar