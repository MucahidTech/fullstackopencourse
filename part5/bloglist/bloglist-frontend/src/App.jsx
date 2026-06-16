import { useState, useEffect } from "react";
import Notification from "./components/Notification";
import "./index.css";

import Blog from "./components/Blog";
import blogService from "./services/blogs";
import loginService from "./services/login";
import LoginForm from "./components/LoginForm";
import Togglable from "./components/Togglable";

const App = () => {
  const [notification, setNotification] = useState(null);

  const [blogs, setBlogs] = useState([]);

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [user, setUser] = useState(null);

  const [title, setTitle] = useState("");
  const [author, setAuthor] = useState("");
  const [url, setURL] = useState("");

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

  const addForm = () => {
    return (
      <>
        <h2>Create New Blog</h2>
        <form onSubmit={handleCreate}>
          <div>
            <label>
              Title
              <input
                type="text"
                value={title}
                onChange={({ target }) => setTitle(target.value)}
              />
            </label>
          </div>
          <div>
            <label>
              Author
              <input
                type="text"
                value={author}
                onChange={({ target }) => setAuthor(target.value)}
              />
            </label>
          </div>
          <div>
            <label>
              URI
              <input
                type="text"
                value={url}
                onChange={({ target }) => setURL(target.value)}
              />
            </label>
          </div>

          <button type="submit">Create</button>
        </form>
      </>
    );
  };

  const blogForm = () => {
    return (
      <>
        <h2>blogs</h2>
        <p>
          {user.name} logged in <button onClick={handleLogOut}>logout</button>
        </p>
        <Togglable buttonLabel="Create New Blog">{addForm()}</Togglable>
        {blogs.map((blog) => (
          <Blog key={blog.id} blog={blog} />
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
