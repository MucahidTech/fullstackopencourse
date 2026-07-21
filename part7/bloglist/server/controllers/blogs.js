const jwt = require("jsonwebtoken");
const blogsRouter = require("express").Router();
const Blog = require("../models/blog");
const Comment = require("../models/comment");
const User = require("../models/user");

const { userExtractor } = require("../utils/middleware");

blogsRouter.get("/", async (request, response) => {
  const blogs = await Blog.find({})
    .populate("user", { username: 1, name: 1 })
    .populate("comments", { content: 1 });
  response.json(blogs);
});

blogsRouter.get("/:id", async (request, response) => {
  const blog = await Blog.findById(request.params.id).populate("comments", {
    content: 1,
  });
  if (blog) {
    response.json(blog);
  } else {
    response.status(404).end();
  }
});

blogsRouter.post("/", userExtractor, async (request, response) => {
  const user = request.user;
  if (!user) {
    return response.status(400).json({ error: "userId missing or not valid" });
  }
  const blog = new Blog({
    ...request.body,
    likes: request.body.likes || 0,
    user: user._id,
  });

  const savedBlog = await blog.save();
  user.blogs = user.blogs.concat(savedBlog._id);
  await user.save();
  const populatedBlog = await Blog.findById(savedBlog._id).populate("user", {
    username: 1,
    name: 1,
  });

  response.status(201).json(populatedBlog);
});

blogsRouter.put("/:id", async (request, response) => {
  const { title, author, url, likes } = request.body;

  const updatedBlog = await Blog.findByIdAndUpdate(
    request.params.id,
    { title, author, url, likes },
    { new: true, runValidators: true }
  );
  if (updatedBlog) {
    response.json(updatedBlog);
  } else {
    response.status(404).end();
  }
});

blogsRouter.delete("/:id", userExtractor, async (request, response) => {
  const user = request.user;

  const blog = await Blog.findById(request.params.id);
  if (!blog) {
    return response
      .status(404)
      .json({ error: "blog not found or has already been removed" });
  }

  if (!user) {
    return response.status(400).json({ error: "userId missing or not valid" });
  }

  if (blog.user.toString() !== user.id.toString()) {
    return response.status(403).json({
      error: "only the creator can delete this blog",
    });
  }

  await Blog.findByIdAndDelete(request.params.id);
  return response.status(204).end();
});

blogsRouter.get("/:id/comments", async (request, response, next) => {
  const blog = await Blog.findById(request.params.id).populate("comments");

  if (!blog) {
    return response.status(404).json({ error: "blog not found" });
  }

  response.json(blog.comments);
});

blogsRouter.post("/:id/comments", async (request, response) => {
  const blog = await Blog.findById(request.params.id);

  if (!blog) {
    return response.status(400).json({ error: "blog not found" });
  }

  const { content } = request.body;

  const comment = new Comment({
    ...request.body,
    blog: blog._id,
  });

  const savedComment = await comment.save();
  blog.comments = blog.comments.concat(savedComment._id);
  await blog.save();
  const populatedComment = await Comment.findById(savedComment._id).populate(
    "blog",
    {
      title: 1,
      author: 1,
    }
  );

  response.status(201).json(populatedComment);
});

module.exports = blogsRouter;
