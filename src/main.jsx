import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { BrowserRouter } from 'react-router-dom'
import {
  QueryClient,
  QueryClientProvider
} from '@tanstack/react-query'
import { Provider } from 'react-redux'
import store from './store/store.js'
import { Toaster } from "react-hot-toast";
import { setCredentials } from './store/authSlice.js'

const queryClient = new QueryClient()

// Restore auth data from localStorage
const user = JSON.parse(localStorage.getItem('user'))
const accessToken = localStorage.getItem('accessToken')
const refreshToken = localStorage.getItem('refreshToken')

if (user && accessToken && refreshToken) {
  store.dispatch(
    setCredentials({
      user,
      accessToken,
      refreshToken,
    })
  )
}

createRoot(document.getElementById('root')).render(
  <Provider store={store}>
    <QueryClientProvider client={queryClient}>
      <BrowserRouter>
        <App />
      </BrowserRouter>

      <Toaster position="top-right" reverseOrder={false} />
    </QueryClientProvider>
  </Provider>
)