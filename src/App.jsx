import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom'
import { AuthProvider, useAuth } from './contexts/AuthContext'
import Layout from './components/Layout'
import LoginPage from './pages/LoginPage'
import InvoiceDashboard from './pages/InvoiceDashboard'
import UserDashboard from './pages/UserDashboard'

function PrivateRoute({ children }) {
  const { user, loading } = useAuth()

  if (loading) {
    return <div className="page-container"><p>Loading...</p></div>
  }

  if (!user) {
    return <Navigate to="/login" replace />
  }

  return children
}

function AppRoutes() {
  return (
    <Routes>
      <Route path="/login" element={<LoginPage />} />
      <Route
        path="/"
        element={(
          <PrivateRoute>
            <Layout />
          </PrivateRoute>
        )}
      >
        <Route index element={<Navigate to="/invoices" replace />} />
        <Route path="invoices" element={<InvoiceDashboard />} />
        <Route path="users" element={<UserDashboard />} />
      </Route>
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  )
}

function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <AppRoutes />
      </BrowserRouter>
    </AuthProvider>
  )
}

export default App
