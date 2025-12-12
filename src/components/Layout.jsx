import { Link, NavLink, Outlet, useNavigate } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";
import {
  AppBar,
  Toolbar,
  Typography,
  Button,
  Box,
} from "@mui/material";

function Layout() {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  return (
    <div>
      <AppBar position="static">
        <Toolbar>
          <Typography variant="h6" component={Link} to="/" style={{ textDecoration: 'none', color: 'inherit' }}>
            Invoice System
          </Typography>

          {user && (
            <Box style={{ marginLeft: 20 }}>
              <NavLink to="/invoices" style={{ marginRight: 12, textDecoration: 'none', color: 'inherit' }}>Invoices</NavLink>
              <NavLink to="/users" style={{ textDecoration: 'none', color: 'inherit' }}>Users</NavLink>
            </Box>
          )}

          <Box style={{ marginLeft: 'auto' }}>
            {user ? (
              <>
                <Typography component="span" style={{ marginRight: 12 }}>{user.name} ({user.role})</Typography>
                <Button variant="contained" size="small" onClick={handleLogout}>Logout</Button>
              </>
            ) : (
              <Button component={Link} to="/login" variant="contained" size="small">Login</Button>
            )}
          </Box>
        </Toolbar>
      </AppBar>

      <div style={{ padding: 16 }}>
        <Outlet />
      </div>
    </div>
  );
}

export default Layout;
