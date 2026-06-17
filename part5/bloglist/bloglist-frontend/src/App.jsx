import { useState, useEffect } from "react";
import Notification from "./components/Notification";
import "./index.css";

import Blog from "./components/Blog";
import blogService from "./services/blogs";
import loginService from "./services/login";
import LoginForm from "./components/LoginForm";
import AddBlogForm from "./components/AddBlogForm";
import Togglable from "./components/Togglable";

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
    } catch {
      showNotification(`Wrong username or password`, "error");
    }
  };

  const handleLogOut = (event) => {
    window.localStorage.removeItem("loggedBlogappUser");
    setUser(null);
  };

  const handleCreate = async (event) => {
    event.preventDefault();

    const newBlog = {
      title,
      author,
      url,
    };

    try {
      const returnedBlog = await blogService.create(newBlog);
      setBlogs(blogs.concat(returnedBlog));
      showNotification(`A new blog"${title}" by "${author}" added`);
      setTitle("");
      setAuthor("");
      setURL("");
    } catch {
      showNotification(`wrong format`, "error");
    }
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
      showNotification("Error liking blog", "error");
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

  const blogForm = () => {
    return (
      <>
        <h2>blogs</h2>
        <p>
          {user.name} logged in <button onClick={handleLogOut}>logout</button>
        </p>
        <Togglable buttonLabel="Create New Blog">
          <AddBlogForm createBlog={addBlog} />
        </Togglable>
        {blogs.map((blog) => (
          <Blog key={blog.id} blog={blog} updateBlog={handleLike} />
        ))}
      </>
    );
  };

  return (
    <div>
      <Notification message={notification} />
      {!user && (
        <LoginForm
          username={username}
          password={password}
          handleUsernameChange={({ target }) => setUsername(target.value)}
          handlePasswordChange={({ target }) => setPassword(target.value)}
          handleSubmit={handleLogin}
        />
      )}
      {user && <div>{blogForm()}</div>}
    </div>
  );
};

export default App;
