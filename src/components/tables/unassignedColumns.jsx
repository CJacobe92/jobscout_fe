import UnassignedActionsBtn from '@components/buttons/UnassignedActionsBtn';
import ActionsBtn from '@components/buttons/UnassignedActionsBtn';
import { CaretSortIcon, DotsHorizontalIcon } from '@radix-ui/react-icons'
import { createColumnHelper } from '@tanstack/react-table'
import React, { useState } from 'react'

const columnHelper = createColumnHelper();

const unassignedColumns = [
    columnHelper.accessor('job_name', {
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
    columnHelper.accessor('job_location', {
      cell: info => info.getValue(),
      header: ({column}) => {
        return (
          <button onClick={() => column.toggleSorting(column.getIsSorted() === "asc")} className='flex flex-row'>
            Location
            <CaretSortIcon className="w-4 h-4 ml-2 lowercase" />
          </button>
        )
      },
    }),
    columnHelper.accessor('job_salary', {
      cell: info => info.getValue(),
      header: ({column}) => {
        return (
          <button onClick={() => column.toggleSorting(column.getIsSorted() === "asc")} className='flex flex-row'>
            Salary
            <CaretSortIcon className="w-4 h-4 ml-2 lowercase" />
          </button>
        )
      },
    }),
    columnHelper.accessor('job_currency', {
      cell: info => info.getValue(),
      header: ({column}) => {
        return (
          <button onClick={() => column.toggleSorting(column.getIsSorted() === "asc")} className='flex flex-row'>
            Currency
            <CaretSortIcon className="w-4 h-4 ml-2 lowercase" />
          </button>
        )
      },
    }),
    columnHelper.accessor('job_type', {
      cell: info => info.getValue(),
      header: ({column}) => {
        return (
          <button onClick={() => column.toggleSorting(column.getIsSorted() === "asc")} className='flex flex-row'>
            Type
            <CaretSortIcon className="w-4 h-4 ml-2 lowercase" />
          </button>
        )
      },
    }),
    columnHelper.accessor('job_headcount', {
      cell: info => info.getValue(),
      header: ({column}) => {
        return (
          <button onClick={() => column.toggleSorting(column.getIsSorted() === "asc")} className='flex flex-row'>
            Headcount
            <CaretSortIcon className="w-4 h-4 ml-2 lowercase" />
          </button>
        )
      },
    }),
    columnHelper.accessor('job_status', {
      cell: info => info.getValue(),
      header: ({column}) => {
        return (
          <button onClick={() => column.toggleSorting(column.getIsSorted() === "asc")} className='flex flex-row'>
            Status
            <CaretSortIcon className="w-4 h-4 ml-2 lowercase" />
          </button>
        )
      },
    }),
    columnHelper.accessor('Actions', {
      cell: (info) => {

        const job = info.row.original

       return(
        <UnassignedActionsBtn job={job}/>
       )
      },
     
    }),
  ]

export default unassignedColumns