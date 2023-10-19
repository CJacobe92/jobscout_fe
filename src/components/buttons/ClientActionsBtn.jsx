import { Button } from '@components/ui/button';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger } from '@components/ui/dropdown-menu';
import fetchAssign from '@hooks/mutations/fetchAssign';
import { DotsHorizontalIcon, HandIcon } from '@radix-ui/react-icons';
import { Plus } from 'lucide-react';
import React, { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';

const ClientActionsBtn = ({client}) => {

  console.log(client)

  return (
      <DropdownMenu className='rounded-md'>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" className="w-8 h-2 p-0">
          <span className="sr-only">Open menu</span>
          <DotsHorizontalIcon className="w-4 h-4" />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        <DropdownMenuLabel className='text-xs'>Actions</DropdownMenuLabel>
        <DropdownMenuSeparator className='px-2 bg-gray-300'/>
        <DropdownMenuItem className='p-0 text-xs'>
          <Link to={`/t/clients/${client?.id}`} className='w-full p-2'>View client</Link>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default ClientActionsBtn 
