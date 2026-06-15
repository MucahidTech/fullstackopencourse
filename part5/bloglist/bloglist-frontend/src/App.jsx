import { useState, useEffect } from "react";
import Notification from "./components/Notification";
import "./index.css";

import Blog from "./components/Blog";
import blogService from "./services/blogs";
import loginService from "./services/login";

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
      showNotification(`wrong credentials`, "error");
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
      setTitle("");
      setAuthor("");
      setURL("");
      showNotification(`Blog created`);
    } catch {
      showNotification(`wrong credentials`, "error");
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

  const loginForm = () => {
    return (
      <>
        <h2>Log in to application</h2>
        <form onSubmit={handleLogin}>
          <div>
            <label>
              username
              <input
                type="text"
                value={username}
                onChange={({ target }) => setUsername(target.value)}
              />
            </label>
          </div>
          <div>
            <label>
              password
              <input
                type="password"
                value={password}
                onChange={({ target }) => setPassword(target.value)}
              />
            </label>
          </div>
          <button type="submit">login</button>
        </form>
      </>
    );
  };

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
        {addForm()} <br />
        {blogs.map((blog) => (
          <Blog key={blog.id} blog={blog} />
        ))}
      </>
    );
  };

  return (
    <div>
      <Notification message={notification} />
      {!user && loginForm()}
      {user && <div>{blogForm()}</div>}
    </div>
  );
};

export default App;
