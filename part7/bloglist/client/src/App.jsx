import { useEffect } from "react";
import { Routes, Route, Link, useNavigate } from "react-router-dom";
import { Container } from "@mui/material";

import Notification from "./components/Notification";
import ErrorBoundary from "./components/ErrorBoundary";
import "./index.css";
import Navbar from "./components/Navbar";
import LoginForm from "./components/LoginForm";
import BlogForm from "./components/BlogForm";
import AddBlogForm from "./components/AddBlogForm";
import Blog from "./components/Blog";
import Users from "./components/Users";
import SingleUser from "./components/UserView";

import { useBlogsControls } from "./stores/blogsStore";
import "./index.css";

const App = () => {
  const { initialize } = useBlogsControls();

  useEffect(() => {
    initialize();
  }, [initialize]);

  return (
    <Container>
      <Navbar />
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
