import { useSearchContext } from '@context/SearchContextProvider';
import React from 'react'

const PaginationBtn = ({ data, page, query, location, assignment}) => {

  const { setPageParams } = useSearchContext();

  const handleChangePage = (e) => {
    e.preventDefault();
    const { value } = e.target
    setPageParams((prev) => ({...prev, page: value, query: query, location: location, assignment: assignment}))
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
      <button onClick={handlePreviousPage} className="join-item btn btn-sm btn-primary">«</button>
      <select onChange={handleChangePage} className='w-24 select select-sm select-bordered' value={page == null ? '' : page}>
        {[...Array(data?.meta?.total_pages)].map((_, index) => (
          <option key={index} value={index + 1}>
            Page {index + 1}
          </option>
        ))}
      </select>
      <button onClick={handleNextPage} className="join-item btn btn-sm btn-primary">»</button>
    </div>
  )
}

export default PaginationBtn