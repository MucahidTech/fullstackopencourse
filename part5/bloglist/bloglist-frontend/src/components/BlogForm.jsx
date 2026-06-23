import Blog from "./Blog";

const BlogForm = ({ sortedBloges, user, handleLike, removeBlog }) => {
  return (
    <>
      <h2>Blogs</h2>

      {sortedBloges.map((blog) => (
        <Blog
          key={blog.id}
          blog={blog}
          updateBlog={handleLike}
          userId={user?.username}
          deleteBlog={removeBlog}
        />
      ))}
    </>
  );
};

export default BlogForm;
