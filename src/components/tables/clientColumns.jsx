import AssignedActionsBtn from '@components/buttons/AssignedActionsBtn';
import ActionsBtn from '@components/buttons/UnassignedActionsBtn';
import { CaretSortIcon, DotsHorizontalIcon } from '@radix-ui/react-icons'
import { createColumnHelper } from '@tanstack/react-table'
import React, { useState } from 'react'

const columnHelper = createColumnHelper();

const clientColumns = [
    columnHelper.accessor('company_name', {
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
    columnHelper.accessor('company_poc_name', {
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
    columnHelper.accessor('company_poc_title', {
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
    columnHelper.accessor('company_email', {
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
    columnHelper.accessor('company_phone', {
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
    columnHelper.accessor('company_address', {
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

        const job = info.row.original

       return(
        <AssignedActionsBtn job={job}/>
       )
      },
     
    }),
  ]

export default clientColumns