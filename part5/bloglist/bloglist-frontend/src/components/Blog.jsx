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
        {blog.title} {blog.author}
        <button onClick={() => setShowDetails(!showDetails)}>
          {showDetails ? "hide" : "view"}
        </button>
      </div>
      {showDetails && (
        <div>
          <p>{blog.url}</p>
          <p>
            Likes: {blog.likes} <button onClick={handleAddLike}>Like</button>
          </p>
          <p>{blog.user?.name || blog.author || "Unknown User"}</p>
          {userId === blog.user.username && (
            <button onClick={handleDelete}>remove</button>
          )}
        </div>
      )}
    </div>
  );
};

export default Blog;
