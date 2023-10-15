import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { BrowserRouter } from 'react-router-dom'
import DataContextProvider from '@context/DataContextProvider.jsx'
import SearchContextProvider from '@context/SearchContextProvider.jsx'

const queryClient = new QueryClient()

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <BrowserRouter>
      <QueryClientProvider client={queryClient}>
        <DataContextProvider>
          <SearchContextProvider>
            <App />
          </SearchContextProvider>
        </DataContextProvider>
      </QueryClientProvider>
    </BrowserRouter>
  </React.StrictMode>,
)
