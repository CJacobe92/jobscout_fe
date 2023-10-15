import { CaretSortIcon } from '@radix-ui/react-icons'
import { createColumnHelper } from '@tanstack/react-table'
import React from 'react'

const columnHelper = createColumnHelper();

const jobsColumns = [
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
            Salary
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
  ]

export default jobsColumns