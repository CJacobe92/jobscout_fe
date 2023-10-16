import { Button } from '@components/ui/button';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger } from '@components/ui/dropdown-menu';
import fetchAssign from '@hooks/mutations/fetchAssign';
import { DotsHorizontalIcon, HandIcon } from '@radix-ui/react-icons';
import { Plus } from 'lucide-react';
import React, { useState, useEffect, useRef } from 'react';

const UnassignedActionsBtn = ({job}) => {
  const {mutate: assign} = fetchAssign()

  const handleAssign = () => {
    const jobId = job.id
    assign({jobId})
  }

  return (   
    <DropdownMenu >
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" className="w-4 h-4 p-0">
              <span className="sr-only">Open menu</span>
              <DotsHorizontalIcon className="w-4 h-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuLabel className='text-xs'>Actions</DropdownMenuLabel>
            <DropdownMenuSeparator className='px-2 bg-gray-300'/>
            <DropdownMenuItem onClick={handleAssign} className='flex flex-row justify-center gap-2 text-xs cursor-pointer'>
            <Plus size={'1rem'}/> Grab job order
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
  );
};

export default UnassignedActionsBtn;
