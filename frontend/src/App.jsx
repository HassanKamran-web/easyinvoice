import React, { lazy, Suspense } from 'react'
import { Route, Routes } from 'react-router-dom'
import { Toaster } from 'react-hot-toast'
import { AuthProvider } from './Context/AuthContext'
import Landing from './pages/Landing'
import Login from './pages/Login'
import Register from './pages/Register'
import ProtectedRouteWrapper from './ProtectedWrappers/ProtectedRouteWrapper'
import LoadingRouteWrapper from './ProtectedWrappers/LoadingRouteWrapper'
import LoadingScreen from './components/LoadingScreen'
const Dashboard = lazy(() => import('./pages/Dashboard'))
const CreateInvoice = lazy(() => import('./pages/CreateInvoice'))
const ShareInvoice = lazy(() => import('./pages/ShareInvoice'))


const App = () => {
  return (
    <>
      <Toaster />
      <AuthProvider>
        <Suspense fallback={<LoadingScreen />}>
          <Routes>
            <Route path='*' element={<div className="text-center py-20 text-indigo-700 text-2xl">404 Not Found</div>} />
            
            <Route path='/' element={
              <LoadingRouteWrapper>
                <Landing />
              </LoadingRouteWrapper>
            } />

            <Route path='/login' element={<Login />} />
            <Route path='/register' element={<Register />} />

            <Route path='/dashboard' element={
              <ProtectedRouteWrapper>
                <Dashboard />
              </ProtectedRouteWrapper>
            } />

            <Route path='/createinvoice' element={
              <ProtectedRouteWrapper>
                <CreateInvoice />
              </ProtectedRouteWrapper>
            } />

            <Route path='/invoice/:id' element={<ShareInvoice />} />
          </Routes>
        </Suspense>
      </AuthProvider>
    </>
  )
}

export default App