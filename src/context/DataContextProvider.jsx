import { plan } from '@services/storage'
import React, { createContext, useContext, useReducer } from 'react'

const subscription =  plan.get();

const initialState = {
  company_name: '',
  company_address: '',
  company_email: '',
  license: '',
  firstname: '',
  lastname: '',
  contact_number: '',
  subscription: subscription
}

const reducer = (state, action) => {
  switch(action.type){
    case 'updateAction':
      return {...state, ...action.payload}
  }
}

export const DataContext = createContext(null)

const DataContextProvider = ({children}) => {

  const [state, dispatch] = useReducer(reducer, initialState)


  const updateAction = (value) => {
    dispatch({type: 'updateAction', payload: value})
  }
  const value = {
    state,
    updateAction
  }

  return (
    <DataContext.Provider value={value}>
      {children}
    </DataContext.Provider>
  )
}

export const useDataContext = () => {
  const context = useContext(DataContext)

  if (!context) {
    throw new Error("useDataContext must be used within DataContextProvider");
  }
  return context;
}

export default DataContextProvider
