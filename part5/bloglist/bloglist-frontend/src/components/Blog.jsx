import { useState } from "react";

const Blog = ({ blog, updateBlog, userId, deleteBlog }) => {
  const [showDetails, setShowDetails] = useState(false);

  const handleAddLike = async () => {
    const updatedBlog = {
      user: blog.user.id,
      likes: blog.likes + 1,
      author: blog.author,
      title: blog.title,
      url: blog.url,
    };

    try {
      await updateBlog(blog.id, updatedBlog);
    } catch (error) {
      console.error("Error liking blog:", error);
    }
  };

  const handleDelete = async () => {
    if (confirm(`Are you sure you want to delete blog titled ${blog.title}?`)) {
      try {
        await deleteBlog(blog.id);
      } catch (error) {
        console.error("Error deleting blog:", error);
      }
    }
  };

  return (
    <div className="blogStyle">
      <div>
        <span data-testid="blog-title">{blog.title}</span>
        <span data-testid="blog-author">{blog.author}</span>
        <button onClick={() => setShowDetails(!showDetails)}>
          {showDetails ? "hide" : "view"}
        </button>
      </div>
      {showDetails && (
        <div data-testid="blog-details">
          <p data-testid="blog-url">{blog.url}</p>
          <p>
            Likes: <span data-testid="blog-likes">{blog.likes}</span>
            <button onClick={handleAddLike}>like</button>
          </p>
          <p>{blog.user?.name || "Unknown author"}</p>
          {userId === blog.user?.username && (
            <button onClick={handleDelete}>remove</button>
          )}
        </div>
      )}
    </div>
  );
};

export default Blog;
