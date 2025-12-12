import { useEffect, useState } from 'react'
import api from '../api/client'
import UserFilters from '../components/UserFilters'
import UserForm from '../components/UserForm'
import UserTable from '../components/UserTable'
import { Box, Typography } from '@mui/material'

function UserDashboard() {
  const [users, setUsers] = useState([])
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [role, setRole] = useState('USER')
  const [searchText, setSearchText] = useState('')
  const [filterRole, setFilterRole] = useState('')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')

  useEffect(() => { loadUsers() }, [])

  async function loadUsers() {
    try {
      setLoading(true)
      setError('')
      const params = {}
      if (searchText) params.search = searchText
      if (filterRole) params.role = filterRole
      const { data } = await api.get('/users', { params })
      setUsers(data.users || [])
    } catch (err) {
      const message = err?.response?.data?.message || 'Failed to load users'
      setError(message)
    } finally { setLoading(false) }
  }

  const handleCreate = async (event) => {
    event.preventDefault()
    if (!name || !email || !password || !role) {
      setError('Name, email, password and role are required.')
      return
    }

    try {
      setError('')
      await api.post('/users', { name, email, password, role })
      setName('')
      setEmail('')
      setPassword('')
      setRole('USER')
      await loadUsers()
    } catch (err) {
      const message = err?.response?.data?.message || 'Failed to create user.'
      setError(message)
    }
  }

  const handleDelete = async (id) => {
    if (!window.confirm('Are you sure you want to delete this user?')) return
    try {
      setError('')
      const { data } = await api.delete('/users', { data: { ids: [id] } })
      if (data.deletedCount === 0) { setError('You do not have permission to delete this user.'); return }
      await loadUsers()
    } catch (err) {
      const message = err?.response?.data?.message || 'Failed to delete user.'
      setError(message)
    }
  }

  const handleUpdateRole = async (id) => {
    const input = prompt('Enter new role (ADMIN, UNIT_MANAGER, USER)')
    if (!input) return
    const newRole = input.trim().toUpperCase().replace(/\s+/g, '_')
    if (!['ADMIN', 'UNIT_MANAGER', 'USER'].includes(newRole)) { setError('Invalid role. Use ADMIN, UNIT_MANAGER, or USER.'); return }
    try { setError(''); await api.patch(`/users/${id}`, { role: newRole }); await loadUsers() } catch (err) { const message = err?.response?.data?.message || 'Failed to update role.'; setError(message) }
  }

  return (
    <Box sx={{ display: 'flex', justifyContent: 'center', minHeight: '100vh', width: '100%' }}>
      <Box sx={{ maxWidth: 1200, width: '100%', p: 2 }}>
        <Typography variant="h4" sx={{ mb: 2 }}>User Dashboard</Typography>
        {error && <Box sx={{ color: '#d32f2f', backgroundColor: '#fde7e9', p: 1, borderRadius: 1, mb: 2 }}>{error}</Box>}

      <UserFilters searchText={searchText} onSearchTextChange={setSearchText} filterRole={filterRole} onFilterRoleChange={setFilterRole} onApply={loadUsers} />

      <Box sx={{ mt: 2 }}>
        <UserForm name={name} onNameChange={setName} email={email} onEmailChange={setEmail} password={password} onPasswordChange={setPassword} role={role} onRoleChange={setRole} onSubmit={handleCreate} />
      </Box>

        <UserTable users={users} loading={loading} error={error} onChangeRole={handleUpdateRole} onDelete={handleDelete} />
      </Box>
    </Box>
  )
}

export default UserDashboard
