import React, { useRef, useState } from 'react'
import { Button } from "@components/ui/button"
import { DotsHorizontalIcon, ExitIcon, PersonIcon } from '@radix-ui/react-icons'
import { Link, useNavigate } from 'react-router-dom'
import AccountInfoInput from '@components/inputs/AccountInfoInput'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuShortcut,
  DropdownMenuTrigger,
} from "@components/ui/dropdown-menu"

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@components/ui/dialog"

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@components/ui/card"

import { Input } from "@components/ui/input"
import { Label } from "@components/ui/label"
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@components/ui/tabs"

const ProfileDropDown = ({data}) => {

  const navigate = useNavigate();
  
  const handleLogout = () => {
    navigate('/signin')
  }
  
  return (
    <>
      <DropdownMenu>
        <DropdownMenuTrigger className='mx-2'><DotsHorizontalIcon /></DropdownMenuTrigger>
        <DropdownMenuContent className='absolute left-0 right-0 bottom-5'>
          <DropdownMenuLabel>Settings</DropdownMenuLabel>
          <DropdownMenuSeparator />
            <DropdownMenuItem>
              <Link to='/t/profile'>Profile</Link>
              <DropdownMenuShortcut><PersonIcon /></DropdownMenuShortcut>
            </DropdownMenuItem>
          <DropdownMenuSeparator />
          <DropdownMenuItem onClick={handleLogout}>
            <span>Logout</span>
            <DropdownMenuShortcut><ExitIcon /></DropdownMenuShortcut>
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </>
  )

}

export default ProfileDropDown