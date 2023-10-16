import { useSearchContext } from "@context/SearchContextProvider";
import { MagnifyingGlassIcon, ResetIcon } from "@radix-ui/react-icons";
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
    <div className="border border-gray-300 shadow-md rounded-md" >
      <form className="p-4 w-full flex flex-row items-center gap-2" onSubmit={handleFind}>
        <input 
          className="border border-gray-300 input-sm w-[20rem] outline-none"
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
            <Button variant="outline" className="ml-auto">
              Columns <ChevronDownIcon className="ml-2 h-4 w-4" />
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
                    className="capitalize"
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
      <table className="table table-zebra table-sm">
        <thead>
          {table.getHeaderGroups().map((headerGroup) => (
            <tr key={headerGroup.id}>
              {headerGroup.headers.map((header) => (
                <th key={header.id}>
                  {header.isPlaceholder
                    ? null
                    : flexRender(
                        header.column.columnDef.header,
                        header.getContext()
                      )}
                </th>
              ))}
            </tr>
          ))}
        </thead>
        <tbody>
          {table.getRowModel().rows?.length ?
            (
              table.getRowModel().rows.map((row) => (
                <tr
                  key={row.id}
                  data-state={row.getIsSelected() && "selected"}
                >
                  {row.getVisibleCells().map((cell) => (
                    <td key={cell.id}>
                      {flexRender(cell.column.columnDef.cell, cell.getContext())}
                    </td>
                  ))}
                </tr>
              ))
            ) :
            (
              <tr>
                <td colSpan={columns.length} className="h-24 text-center">
                  No results.
                </td>
              </tr>
            )
          }
        </tbody>
      </table>
    </div>
  );
};
