import { Button } from "@components/ui/button";
import { DropdownMenu, DropdownMenuCheckboxItem, DropdownMenuContent, DropdownMenuTrigger } from "@components/ui/dropdown-menu";
import { Input } from "@components/ui/input";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@components/ui/table";
import { useSearchContext } from "@context/SearchContextProvider";
import { ChevronDownIcon, MagnifyingGlassIcon, ResetIcon } from "@radix-ui/react-icons";
import { flexRender, getCoreRowModel, getFilteredRowModel, getSortedRowModel, useReactTable } from "@tanstack/react-table";
import { useState } from "react";

export const DataTable = ({data, columns, query, location}) => {

  const initialQuery = {
    query: query,
    location: location
  }

  const { setSearchParams } = useSearchContext();

  const [input, setInput] = useState(initialQuery);
  const [sorting, setSorting] = useState([]);
  const [columnFilters, setColumnFilters] = useState([]);
  const [columnVisibility, setColumnVisibility] = useState({})
  const [rowSelection, setRowSelection] = useState({})
  
  const table = useReactTable({
    data, 
    columns,
    getCoreRowModel: getCoreRowModel(),
    onSortingChange: setSorting,
    getSortedRowModel: getSortedRowModel(),
    onColumnFiltersChange: setColumnFilters,
    getFilteredRowModel: getFilteredRowModel(),
    onColumnVisibilityChange: setColumnVisibility,
    onRowSelectionChange: setRowSelection,
    state: {
      sorting,
      columnFilters,
      columnVisibility,
      rowSelection,
    },
  });

  const handleChange = (e) => {
    const { name, value } = e.target
    setInput({...input, [name]: value})
  }

  const handleFind = (e) => {
    e.preventDefault();
    setSearchParams((prev) => ({...prev, query: input.query, location: input.location}))
  }
  
  const handleReset = () => {
    setSearchParams((prev) => ({...prev, query: '', location: ''}))
    setInput({ ...input, query: '' })
  }

  return (
    <div className="border border-gray-300 rounded-md shadow-md" >
      <div className="flex flex-row items-center justify-between px-4 py-2">
        <form className="flex flex-row items-center w-full gap-2" onSubmit={handleFind}>
          <Input
            className="border border-gray-300 w-[20rem] outline-none rounded-none"
            placeholder="Enter keywords..."
            name='query'
            onChange={handleChange}
            value={input.query}
            type="text" 
          />
          {query == null || query == '' ? <button type="submit"><MagnifyingGlassIcon style={{fontSize: '2rem'}}/></button> :
            <button onClick={handleReset} type='reset'><ResetIcon style={{fontSize: '2rem'}}/></button>
          }
          
        </form>
        <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant='outline' className="ml-auto" size='sm'>
                Columns <ChevronDownIcon className="w-4 h-2 ml-2" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              {table
                .getAllColumns()
                .filter((column) => column.getCanHide())
                .map((column) => {
                  return (
                    <DropdownMenuCheckboxItem
                      key={column.id}
                      className="text-xs capitalize"
                      checked={column.getIsVisible()}
                      onCheckedChange={(value) =>
                        column.toggleVisibility(!!value)
                      }
                    >
                      {column.id}
                    </DropdownMenuCheckboxItem>
                  )
                })}
            </DropdownMenuContent>
          </DropdownMenu>
      </div>
      <Table>
        <TableHeader>
          {table.getHeaderGroups().map((headerGroup) => (
            <TableRow key={headerGroup.id}>
              {headerGroup.headers.map((header) => (
                <TableHead key={header.id}>
                  {header.isPlaceholder
                    ? null
                    : flexRender(
                        header.column.columnDef.header,
                        header.getContext()
                      )}
                </TableHead>
              ))}
            </TableRow>
          ))}
        </TableHeader>
        <TableBody>
          {table.getRowModel().rows?.length ?
            (
              table.getRowModel().rows.map((row) => (
                <TableRow
                  key={row.id}
                  data-state={row.getIsSelected() && "selected"}
                  className='text-xs'
                >
                  {row.getVisibleCells().map((cell) => (
                    <TableCell key={cell.id} className='py-3'>
                      {flexRender(cell.column.columnDef.cell, cell.getContext())}
                    </TableCell>
                  ))}
                </TableRow>
              ))
            ) :
            (
              <TableRow>
                <td colSpan={columns.length} className="h-24 text-center">
                  No results.
                </td>
              </TableRow>
            )
          }
        </TableBody>
      </Table>
    </div>
  );
};
