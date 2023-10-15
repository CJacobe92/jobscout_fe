import React, { createContext, useContext } from 'react';
import { useSearchParams } from 'react-router-dom';

export const SearchContext = createContext(null);

export const SearchContextProvider = ({ children }) => {
  
  const [searchParams, setSearchParams] = useSearchParams();
  const [pageParams, setPageParams] = useSearchParams();

  const value = { 
    searchParams, 
    setSearchParams, 
    pageParams, 
    setPageParams 
  };

  return (
    <SearchContext.Provider value={value}>
      {children}
    </SearchContext.Provider>
  );
};


export const useSearchContext = () => {
  const context = useContext(SearchContext)

  if (!context) {
    throw new Error("useSearchContext must be within SearchContextProvider");
  }
  return context;
}


export default SearchContextProvider;
