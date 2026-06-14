const Blog = require("../models/blog");
const User = require("../models/user");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const initialBlogs = [
  {
    _id: "5a422a851b54a676234d17f7",
    title: "React patterns",
    author: "Michael Chan",
    url: "https://reactpatterns.com/",
    likes: 7,
    __v: 0,
  },
  {
    _id: "5a422aa71b54a676234d17f8",
    title: "Go To Statement Considered Harmful",
    author: "Edsger W. Dijkstra",
    url: "http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html",
    likes: 5,
    __v: 0,
  },
];

const blogsInDb = async () => {
  const blogs = await Blog.find({});
  return blogs.map((blog) => blog.toJSON());
};

const usersInDb = async () => {
  const users = await User.find({});
  return users.map((u) => u.toJSON());
};

const getTokenForUser = async (username, password) => {
  const response = await require("supertest")(require("../app"))
    .post("/api/login")
    .send({ username, password });
  return response.body.token;
};

const createTestUser = async () => {
  await User.deleteMany({});
  const passwordHash = await bcrypt.hash("testpass", 10);
  const user = new User({
    username: "testuser",
    name: "Test User",
    passwordHash,
  });
  await user.save();
  return user;
};

module.exports = {
  initialBlogs,
  blogsInDb,
  usersInDb,
  getTokenForUser,
  createTestUser,
};
