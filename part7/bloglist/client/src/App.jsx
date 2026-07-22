import { useEffect, useMemo } from "react";

import Notification from "./components/Notification";
import ErrorBoundary from "./components/ErrorBoundary";
import "./index.css";

import { Routes, Route, Link, useNavigate, useMatch } from "react-router-dom";
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
import { useBlogs, useBlogsControls } from "./stores/blogsStore";
import { useUser, useUserControls } from "./stores/userStore";

const App = () => {
  const blogs = useBlogs();
  const user = useUser();
  const { logout } = useUserControls();
  const { show } = useNotifyControls();
  const { initialize, add, like, remove } = useBlogsControls();

  const navigate = useNavigate();

  const handleLogOut = () => {
    logout();
    navigate("/");
    show("Logged out");
  };

  const handleLike = async (id) => {
    try {
      await like(id);
      show(`Liked blog`);
    } catch (error) {
      show(`Error liking blog: ${error}`, "error");
    }
  };

  const removeBlog = async (id) => {
    try {
      await remove(id);
      show(`Blog has been deleted`);
    } catch (error) {
      show(`Error deleting blog: ${error}`, "error");
    }
  };

  useEffect(() => {
    initialize();
  }, [initialize]);

  const sortedBloges = useMemo(() => {
    return [...blogs].sort((a, b) => b.likes - a.likes);
  }, [blogs]);

  const padding = {
    padding: 5,
  };
  const match = useMatch("/blogs/:id");

  const blog = match ? blogs.find((blog) => blog.id === match.params.id) : null;

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
          <Route
            path="/blogs/:id"
            element={
              <Blog
                blog={blog}
                userId={user?.username}
                updateBlog={handleLike}
                deleteBlog={removeBlog}
              />
            }
          />
          <Route path="/" element={<BlogForm sortedBloges={sortedBloges} />} />
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
