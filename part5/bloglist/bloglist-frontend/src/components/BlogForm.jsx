import { Link } from "react-router-dom";

const BlogForm = ({ sortedBloges }) => {
  return (
    <>
      <h2>Blogs</h2>

      {sortedBloges.map((blog) => (
        <li key={blog.id}>
          <Link to={`/blogs/${blog.id}`}>
            {blog.title} by {blog.author}
          </Link>
        </li>
      ))}
    </>
  );
};

export default BlogForm;
