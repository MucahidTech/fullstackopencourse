import { useState, useEffect } from "react";
import Notification from "./components/Notification";
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

import blogService from "./services/blogs";
import loginService from "./services/login";
import LoginForm from "./components/LoginForm";
import BlogForm from "./components/BlogForm";
import AddBlogForm from "./components/AddBlogForm";
import Togglable from "./components/Togglable";
import Blog from "./components/Blog";

const App = () => {
  const [blogs, setBlogs] = useState([]);
  const [user, setUser] = useState(null);
  const [notification, setNotification] = useState(null);

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const showNotification = (text, type = "") => {
    setNotification({ text, type });
    setTimeout(() => setNotification(null), 5000);
  };

  const navigate = useNavigate();

  const handleLogin = async (event) => {
    event.preventDefault();

    try {
      const user = await loginService.login({ username, password });
      window.localStorage.setItem("loggedBlogappUser", JSON.stringify(user));
      blogService.setToken(user.token);
      setUser(user);
      setUsername("");
      setPassword("");
      showNotification(`Login Successful`);
      navigate("/");
    } catch {
      showNotification(`Wrong username or password`, "error");
    }
  };

  const handleLogOut = () => {
    window.localStorage.removeItem("loggedBlogappUser");
    setUser(null);
    navigate("/");
  };

  const addBlog = async (newBlog) => {
    try {
      const returnedBlog = await blogService.create(newBlog);
      setBlogs(blogs.concat(returnedBlog));

      showNotification(
        `A new blog "${newBlog.title}" by "${newBlog.author}" added`,
      );
    } catch {
      showNotification("Invalid blog data", "error");
    }
  };

  const handleLike = async (id, updatedBlog) => {
    try {
      const returnedBlog = await blogService.update(id, updatedBlog);
      const existingBlog = blogs.find((b) => b.id === id);
      const mergedBlog = { ...returnedBlog, user: existingBlog.user };

      setBlogs(blogs.map((blog) => (blog.id === id ? mergedBlog : blog)));
      showNotification(`Liked '${mergedBlog.title}'`);
    } catch (error) {
      showNotification(`Error liking blog: ${error}`, "error");
    }
  };

  const removeBlog = async (id) => {
    try {
      await blogService.remove(id);
      setBlogs(blogs.filter((blog) => blog.id !== id));
      showNotification(`Blog  has been deleted`);
    } catch (error) {
      showNotification(`Error deleting blog: ${error}`, "error");
    }
  };

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem("loggedBlogappUser");
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON);
      setUser(user);
      blogService.setToken(user.token);
    }
  }, []);

  useEffect(() => {
    blogService.getAll().then((blogs) => setBlogs(blogs));
  }, []);

  const sortedBloges = [...blogs].sort((a, b) => b.likes - a.likes);

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
              <Button color="inherit" component={Link} to="/create">
                new blog
              </Button>
              <Button
                color="inherit"
                component={Link}
                to="/notes"
                onClick={handleLogOut}
              >
                logout
              </Button>
            </>
          )}
        </Toolbar>
      </AppBar>

      <Notification message={notification} />

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
        <Route path="/create" element={<AddBlogForm createBlog={addBlog} />} />
        <Route
          path="/login"
          element={
            <LoginForm
              username={username}
              password={password}
              handleUsernameChange={({ target }) => setUsername(target.value)}
              handlePasswordChange={({ target }) => setPassword(target.value)}
              handleSubmit={handleLogin}
            />
          }
        />
      </Routes>
    </Container>
  );
};

export default App;
