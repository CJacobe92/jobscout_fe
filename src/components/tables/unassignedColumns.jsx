import UnassignedActionsBtn from '@components/buttons/UnassignedActionsBtn';
import ActionsBtn from '@components/buttons/UnassignedActionsBtn';
import { CaretSortIcon, DotsHorizontalIcon } from '@radix-ui/react-icons'
import { createColumnHelper } from '@tanstack/react-table'
import React, { useState } from 'react'

const columnHelper = createColumnHelper();

const unassignedColumns = [
    columnHelper.accessor('title', {
      cell: info => info.getValue(),
      header: ({column}) => {
        return (
          <button onClick={() => column.toggleSorting(column.getIsSorted() === "asc")} className='flex flex-row'>
            {column.id?.charAt(0).toUpperCase() + column.id?.slice(1)}
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
            {column.id?.charAt(0).toUpperCase() + column.id?.slice(1)}
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
            {column.id?.charAt(0).toUpperCase() + column.id?.slice(1)}
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
            {column.id?.charAt(0).toUpperCase() + column.id?.slice(1)}
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
            {column.id?.charAt(0).toUpperCase() + column.id?.slice(1)}
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
            {column.id?.charAt(0).toUpperCase() + column.id?.slice(1)}
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
            {column.id?.charAt(0).toUpperCase() + column.id?.slice(1)}
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
            {column.id?.charAt(0).toUpperCase() + column.id?.slice(1)}
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