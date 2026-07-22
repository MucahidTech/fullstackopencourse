import { Link } from "react-router-dom";
import { AppBar, Toolbar, Button, Typography, Box } from "@mui/material";
import { useUser, useUserControls } from "../stores/userStore";
import { useNotifyControls } from "../stores/notifiyStore";
import { useNavigate } from "react-router-dom";

const Navbar = () => {
  const user = useUser();
  const { logout } = useUserControls();
  const { show } = useNotifyControls();
  const navigate = useNavigate();

  const handleLogOut = () => {
    logout();
    navigate("/");
    show("Logged out");
  };

  return (
    <AppBar position="static">
      <Toolbar>
        <Typography variant="h6" sx={{ flexGrow: 0 }}>
          Blog App
        </Typography>

        <Box sx={{ flexGrow: 1 }} />

        <Button color="inherit" component={Link} to="/">
          Blogs
        </Button>
        {!user ? (
          <Button color="inherit" component={Link} to="/login">
            login
          </Button>
        ) : (
          <>
            <Button color="inherit" component={Link} to="/users">
              users
            </Button>
            <Button color="inherit" component={Link} to="/create">
              new blog
            </Button>
            <Button
              color="inherit"
              component={Link}
              to="/"
              onClick={handleLogOut}
            >
              logout
            </Button>
          </>
        )}
      </Toolbar>
    </AppBar>
  );
};

export default Navbar;
