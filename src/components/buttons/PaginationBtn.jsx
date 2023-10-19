import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
  CommandSeparator,
  CommandShortcut,
} from "@components/ui/command"
import { Input } from "@components/ui/input";
import { ScrollArea } from '@components/ui/scroll-area';
import { Select, SelectContent, SelectGroup, SelectItem, SelectLabel, SelectTrigger, SelectValue } from '@components/ui/select';
import { useSearchContext } from '@context/SearchContextProvider';
import { DoubleArrowLeftIcon, DoubleArrowRightIcon } from '@radix-ui/react-icons';
import React from 'react'

const PaginationBtn = ({ data, page, query, location, assignment}) => {

  const { setPageParams, pageParams } = useSearchContext();

  const handleChangePage = (page) => {
    setPageParams((prev) => ({...prev, page: page, query: query, location: location, assignment: assignment}))
  }

  const handleNextPage = (e) => {
    e.preventDefault();
    const parsedPage = parseInt(page)
    
    if(parsedPage < data?.meta.total_pages) {
      const newPageValue = parsedPage + 1
      setPageParams((prev) => ({...prev, page: newPageValue, query: query, location: location, assignment: assignment}))
    }   
  } 

  const handlePreviousPage = (e) => {
    e.preventDefault();

    if (page > 1) {
      const newPageValue = parseInt(page) - 1
      setPageParams((prev) => ({...prev, page: newPageValue, query: query, location: location, assignment: assignment}))
    }
  } 

  return (
    <div className="flex flex-row items-center justify-center gap-2 py-2">
      <button onClick={handlePreviousPage} className="join-item btn btn-sm btn-primary"><DoubleArrowLeftIcon /></button>
      <Select onValueChange={handleChangePage}>
        <SelectTrigger className="w-[120px] text-xs">
          <SelectValue placeholder={`Page ${page ? page: ''}`}/>
        </SelectTrigger>
        <SelectContent className="w-[120px] text-xs">
          <SelectGroup className="w-[120px]">
            <ScrollArea className='h-[60vh]'>
              <SelectLabel>Go to</SelectLabel>
              {[...Array(data?.meta?.total_pages)].map((_, index) => (
                <SelectItem key={index} value={index + 1} className='text-sm'>
                  Page {index + 1}
                </SelectItem>
              ))}
            </ScrollArea>
          </SelectGroup>
        </SelectContent>
      </Select>
      <button onClick={handleNextPage} className="join-item btn btn-sm btn-primary"><DoubleArrowRightIcon /></button>
    </div>
  )
}

export default PaginationBtn