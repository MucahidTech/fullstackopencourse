import { useState } from "react";

const Blog = ({ blog, updateBlog }) => {
  const [showDetails, setShowDetails] = useState(false);
  const [likesNum, setLikesNum] = useState(blog.likes);

  const handleAddLike = async () => {
    setLikesNum(likesNum + 1);
    const updatedBlog = {
      user: blog.user?.id || blog.user,
      likes: blog.likes + 1,
      author: blog.author,
      title: blog.title,
      url: blog.url,
    };

    try {
      const returnedBlog = await updateBlog(blog.id, updatedBlog);
    } catch (error) {
      console.error("Error liking blog:", error);
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
            Likes: {likesNum} <button onClick={handleAddLike}>Like</button>
          </p>
          <p>{blog.user?.name || "Unknown author"}</p>
        </div>
      )}
    </div>
  );
};

export default Blog;
