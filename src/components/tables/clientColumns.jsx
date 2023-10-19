import AssignedActionsBtn from '@components/buttons/AssignedActionsBtn';
import ClientActionsBtn from '@components/buttons/ClientActionsBtn';
import ActionsBtn from '@components/buttons/UnassignedActionsBtn';
import { CaretSortIcon, DotsHorizontalIcon } from '@radix-ui/react-icons'
import { createColumnHelper } from '@tanstack/react-table'
import React, { useState } from 'react'

const columnHelper = createColumnHelper();

const clientColumns = [
    columnHelper.accessor('company', {
      cell: info => info.getValue(),
      header: ({column}) => {
        return (
          <button onClick={() => column.toggleSorting(column.getIsSorted() === "asc")} className='flex flex-row'>
            Company
            <CaretSortIcon className="w-4 h-4 ml-2 lowercase" />
          </button>
        )
      },
    }),
    columnHelper.accessor('contact', {
      cell: info => info.getValue(),
      header: ({column}) => {
        return (
          <button onClick={() => column.toggleSorting(column.getIsSorted() === "asc")} className='flex flex-row'>
            Principal
            <CaretSortIcon className="w-4 h-4 ml-2 lowercase" />
          </button>
        )
      },
    }),
    columnHelper.accessor('designation', {
      cell: info => info.getValue(),
      header: ({column}) => {
        return (
          <button onClick={() => column.toggleSorting(column.getIsSorted() === "asc")} className='flex flex-row'>
            Title
            <CaretSortIcon className="w-4 h-4 ml-2 lowercase" />
          </button>
        )
      },
    }),
    columnHelper.accessor('email', {
      cell: info => info.getValue(),
      header: ({column}) => {
        return (
          <button onClick={() => column.toggleSorting(column.getIsSorted() === "asc")} className='flex flex-row'>
            Email
            <CaretSortIcon className="w-4 h-4 ml-2 lowercase" />
          </button>
        )
      },
    }),
    columnHelper.accessor('phone', {
      cell: info => info.getValue(),
      header: ({column}) => {
        return (
          <button onClick={() => column.toggleSorting(column.getIsSorted() === "asc")} className='flex flex-row'>
            Phone
            <CaretSortIcon className="w-4 h-4 ml-2 lowercase" />
          </button>
        )
      },
    }),
    columnHelper.accessor('address', {
      cell: info => info.getValue(),
      header: ({column}) => {
        return (
          <button onClick={() => column.toggleSorting(column.getIsSorted() === "asc")} className='flex flex-row'>
            Address
            <CaretSortIcon className="w-4 h-4 ml-2 lowercase" />
          </button>
        )
      },
    }),
    columnHelper.accessor('Actions', {
      cell: (info) => {

        const client = info.row.original

       return(
        <ClientActionsBtn client={client}/>
       )
      },
     
    }),
  ]

export default clientColumns