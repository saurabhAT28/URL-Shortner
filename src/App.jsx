import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import './App.css'
import AppLayout from './layouts/AppLayout'
import LandingPage from './pages/LandingPage'
import Dashboard from './pages/Dashboard'
import Auth from './pages/Auth'
import RedirectLink from './pages/RedirectLink'
import Link from './pages/Link'
import UrlProvider from './Context'
import RequireAuth from './components/RequireAuth'


const router = createBrowserRouter([
  {
    element: <AppLayout />,
    children: [
      {
        path: '/',
        element: <LandingPage />
      },
      {
        path: '/dashboard',
        element: <RequireAuth> <Dashboard /> </RequireAuth>
      },
      {
        path: '/auth',
        element:  <Auth />  
      },
      {
        path: '/link/:id',
        element: <RequireAuth> <Link /> </RequireAuth>
      },
      {
        path: '/:id',
        element: <RedirectLink />
      }
    ]
  }
])



function App() {
  return <UrlProvider> <RouterProvider router={router} /></UrlProvider>
}

export default App
