import AssignedActionsBtn from '@components/buttons/AssignedActionsBtn';
import ActionsBtn from '@components/buttons/UnassignedActionsBtn';
import { CaretSortIcon, DotsHorizontalIcon } from '@radix-ui/react-icons'
import { createColumnHelper } from '@tanstack/react-table'
import React, { useState } from 'react'

const columnHelper = createColumnHelper();

const assignedColumns = [
    columnHelper.accessor('title', {
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
    columnHelper.accessor('location', {
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
    columnHelper.accessor('salary', {
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
    columnHelper.accessor('currency', {
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
    columnHelper.accessor('category', {
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
    columnHelper.accessor('headcount', {
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
    columnHelper.accessor('status', {
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
        <AssignedActionsBtn job={job}/>
       )
      },
     
    }),
  ]

export default assignedColumns