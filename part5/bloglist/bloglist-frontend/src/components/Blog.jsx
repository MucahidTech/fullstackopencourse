import { useNavigate } from "react-router-dom";

const Blog = ({ blog, updateBlog, userId, deleteBlog }) => {
  const navigate = useNavigate();

  if (!blog) {
    return null;
  }

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
        navigate("/");
      } catch (error) {
        console.error("Error deleting blog:", error);
      }
    }
  };

  return (
    <div className="blogStyle">
      <h2>
        <span data-testid="blog-author">{blog.author}: </span>
        <span data-testid="blog-title">{blog.title}</span>
      </h2>
      <div data-testid="blog-details">
        <p data-testid="blog-url">{blog.url}</p>
        <p>
          Likes: <span data-testid="blog-likes">{blog.likes}</span>
          {userId && <button onClick={handleAddLike}>like</button>}
        </p>
        <p>Added by {blog.user?.name || "Unknown author"}</p>
        {userId === blog.user?.username && (
          <button data-testid="blog-remove" onClick={handleDelete}>
            remove
          </button>
        )}
      </div>
    </div>
  );
};

export default Blog;
