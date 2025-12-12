import { Card, TextField, Button, MenuItem } from "@mui/material";

function UserForm({ name, onNameChange, email, onEmailChange, password, onPasswordChange, role, onRoleChange, onSubmit }) {
  return (
    <Card style={{ maxWidth: 600, margin: '0 auto', padding: 12 }}>
      <h3 style={{ marginBottom: 12 }}>Create New User</h3>

      <form onSubmit={onSubmit} style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
        <TextField label="Name" size="small" value={name} onChange={(e) => onNameChange(e.target.value)} required />

        <TextField label="Email" type="email" size="small" value={email} onChange={(e) => onEmailChange(e.target.value)} required />

        <TextField label="Password" type="password" size="small" value={password} onChange={(e) => onPasswordChange(e.target.value)} required />

        <TextField select label="Role" value={role} onChange={(e) => onRoleChange(e.target.value)} size="small" required>
          <MenuItem value="">Select a role</MenuItem>
          <MenuItem value="USER">User</MenuItem>
          <MenuItem value="UNIT_MANAGER">Unit Manager</MenuItem>
          <MenuItem value="ADMIN">Administrator</MenuItem>
        </TextField>

        <Button type="submit" variant="contained">Add User</Button>
      </form>
    </Card>
  );
}

export default UserForm;
