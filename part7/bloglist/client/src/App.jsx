import Notification from "./components/Notification";
import ErrorBoundary from "./components/ErrorBoundary";
import "./index.css";

import { Routes, Route, Link, useNavigate } from "react-router-dom";
import {
  Container,
  AppBar,
  Toolbar,
  Button,
  Typography,
  Box,
} from "@mui/material";

import LoginForm from "./components/LoginForm";
import BlogForm from "./components/BlogForm";
import AddBlogForm from "./components/AddBlogForm";
import Blog from "./components/Blog";
import Users from "./components/Users";
import SingleUser from "./components/UserView";

import { useNotifyControls } from "./stores/notifiyStore";
import { useUser, useUserControls } from "./stores/userStore";

const App = () => {
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
    <Container>
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
      <ErrorBoundary>
        <Notification />

        <Routes>
          <Route path="/blogs/:id" element={<Blog />} />
          <Route path="/" element={<BlogForm />} />
          <Route path="/users" element={<Users />} />
          <Route path="/users/:id" element={<SingleUser />} />
          <Route path="/create" element={<AddBlogForm />} />
          <Route path="/login" element={<LoginForm />} />
          <Route path="*" element={<h2>404 - Page not found</h2>} />
        </Routes>
      </ErrorBoundary>
    </Container>
  );
};

export default App;
