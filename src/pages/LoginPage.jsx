import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useAuth } from '../contexts/AuthContext'
import api from '../api/client'
import { Card, TextField, Button, Box, Typography } from '@mui/material'

function LoginPage() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)
  const { login } = useAuth()
  const navigate = useNavigate()

  const handleSubmit = async (event) => {
    event.preventDefault()
    setError('')
    setLoading(true)

    try {
      const timezoneOffsetMinutes = new Date().getTimezoneOffset()

      const { data } = await api.post('/auth/login', { email, password, timezoneOffsetMinutes })
      login(data.user, null)
      navigate('/invoices')
    } catch (err) {
      const message = err?.response?.data?.message || 'Login failed'
      setError(message)
    } finally {
      setLoading(false)
    }
  }

  return (
    <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh', width: '100vw', position: 'fixed', top: 0, left: 0 }}>
      <div style={{ width: '100%', maxWidth: 400, padding: 16, border: '1px solid #eee', borderRadius: 6, boxSizing: 'border-box' }}>
        <Typography variant="h5" style={{ marginBottom: 12 }}>Login</Typography>
        <form onSubmit={handleSubmit}>
          <TextField label="Email" type="email" value={email} onChange={(e) => setEmail(e.target.value)} fullWidth size="small" required style={{ marginBottom: 12 }} />
          <TextField label="Password" type="password" value={password} onChange={(e) => setPassword(e.target.value)} fullWidth size="small" required style={{ marginBottom: 12 }} />
          {error && <Typography color="error" style={{ marginBottom: 12 }}>{error}</Typography>}
          <Button type="submit" variant="contained" fullWidth disabled={loading}>{loading ? 'Logging in...' : 'Login'}</Button>
        </form>
      </div>
    </div>
  )
}

export default LoginPage
