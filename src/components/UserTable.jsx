import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Button, Chip, CircularProgress, Alert } from "@mui/material";

function UserTable({ users, loading, error, onChangeRole, onDelete }) {
  return (
    <div style={{ width: '100%', marginTop: 20 }}>
      <h3 style={{ marginBottom: 12 }}>Users</h3>

      {error && <Alert severity="error" sx={{ mb: 2 }}>{error}</Alert>}

      {loading ? (
        <div style={{ textAlign: 'center', padding: 20 }}>
          <CircularProgress />
          <p>Loading users...</p>
        </div>
      ) : users.length === 0 ? (
        <Alert severity="info">No users found.</Alert>
      ) : (
        <TableContainer component={Paper}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>User ID</TableCell>
                <TableCell>Name</TableCell>
                <TableCell>Email</TableCell>
                <TableCell>Role</TableCell>
                <TableCell align="center">Actions</TableCell>
              </TableRow>
            </TableHead>

            <TableBody>
              {users.map((user) => (
                <TableRow key={user._id}>
                  <TableCell><code>{user.userId || 'N/A'}</code></TableCell>
                  <TableCell><strong>{user.name}</strong></TableCell>
                  <TableCell>{user.email}</TableCell>
                  <TableCell>
                    <Chip label={user.role?.toLowerCase().replace('_', ' ') || 'N/A'} size="small" sx={{ textTransform: 'capitalize' }} />
                  </TableCell>
                  <TableCell align="center">
                    <Button variant="contained" size="small" style={{ marginRight: 8 }} onClick={() => onChangeRole(user._id)}>Change Role</Button>
                    <Button variant="contained" color="error" size="small" onClick={() => onDelete(user._id)}>Delete</Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      )}
    </div>
  );
}

export default UserTable;
