import { useState } from "react";

const Blog = ({ blog }) => {
  const [showDetails, setShowDetails] = useState(false);

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
          <p>Likes: {blog.likes}</p>
          <p>{blog.user?.name || "Unknown author"}</p>
        </div>
      )}
    </div>
  );
};

export default Blog;
