import { Card, TextField, Button, MenuItem } from "@mui/material";

function UserFilters({ searchText, onSearchTextChange, filterRole, onFilterRoleChange, onApply }) {
  return (
    <Card style={{ padding: 12, marginBottom: 12 }}>
      <h3 style={{ margin: '0 0 12px 0' }}>Filters</h3>

      <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap' }}>
        <TextField label="Search by name or email" size="small" value={searchText} onChange={(e) => onSearchTextChange(e.target.value)} />

        <TextField select label="Role" value={filterRole} onChange={(e) => onFilterRoleChange(e.target.value)} size="small">
          <MenuItem value="">All Roles</MenuItem>
          <MenuItem value="ADMIN">Admin</MenuItem>
          <MenuItem value="UNIT_MANAGER">Unit Manager</MenuItem>
          <MenuItem value="USER">User</MenuItem>
        </TextField>

        <Button variant="contained" onClick={onApply}>Apply</Button>
      </div>
    </Card>
  );
}

export default UserFilters;
