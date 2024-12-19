import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.tsx'
import './index.css'
import { QueryClientProvider, QueryClient } from '@tanstack/react-query';
import { UserProvider } from './components/context/UserContext.tsx';

const queryClient = new QueryClient();

// const API_URL = import.meta.env.VITE_URL;

// console.log("API URL: ",API_URL);

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <QueryClientProvider client={queryClient} >
      <UserProvider>
        <App />
      </UserProvider>
    </QueryClientProvider>
  </React.StrictMode>,
)
