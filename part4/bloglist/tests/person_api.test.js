const { test, describe, after, beforeEach } = require("node:test");
const assert = require("node:assert");
const mongoose = require("mongoose");
const supertest = require("supertest");
const app = require("../app");
const helper = require("./test_helper");
const Blog = require("../models/blog");

const api = supertest(app);

describe("Testing blogs API", () => {
  beforeEach(async () => {
    await Blog.deleteMany({});
    await Blog.insertMany(helper.initialBlogs);
  });

  test("blogs are returned as json", async () => {
    await api
      .get("/api/blogs")
      .expect(200)
      .expect("Content-Type", /application\/json/);
  });

  test("all blogs are returned", async () => {
    const response = await api.get("/api/blogs");

    assert.strictEqual(response.body.length, 2);
  });

  test("unique identifier is named 'id' not '_id'", async () => {
    const response = await api.get("/api/blogs");
    const blog = response.body[0];

    assert.ok(blog.id);
    assert.strictEqual(blog._id, undefined);
  });

  describe("addition of a new blog", () => {
    test("a valid blog can be added", async () => {
      const newBlog = {
        title: "Test Blog",
        author: "Tester",
        url: "http://test.com",
        likes: 5,
      };

      await api.post("/api/blogs").send(newBlog).expect(201);
      const blogsAtEnd = await helper.blogsInDb();
      assert.strictEqual(blogsAtEnd.length, helper.initialBlogs.length + 1);

      const contents = blogsAtEnd.map((n) => n.title);
      assert(contents.includes("Test Blog"));
    });

    test("likes defaults to 0 when missing from request", async () => {
      const newBlog = {
        title: "No Likes In This Blog",
        author: "Tester",
        url: "http://test.com/nolikes",
      };

      const response = await api.post("/api/blogs").send(newBlog).expect(201);

      assert.strictEqual(response.body.likes, 0);
    });

    test("request will be rejected when missing url property", async () => {
      const newBlog = {
        title: "No URL",
        author: "Tester",
      };

      await api.post("/api/blogs").send(newBlog).expect(400);
    });

    test("request will be rejected when missing title property", async () => {
      const newBlog = {
        author: "Tester",
        url: "http://test.com/noTitle",
      };

      await api.post("/api/blogs").send(newBlog).expect(400);
    });
  });

  describe("deletion of a blog", () => {
    test("succeeds with status code 204 if id is valid", async () => {
      const blogsAtStart = await helper.blogsInDb();
      const blogToDelete = blogsAtStart[0];

      await api.delete(`/api/blogs/${blogToDelete.id}`).expect(204);

      const blogsAtEnd = await helper.blogsInDb();

      const ids = blogsAtEnd.map((n) => n.id);
      assert(!ids.includes(blogToDelete.id));

      assert.strictEqual(blogsAtEnd.length, helper.initialBlogs.length - 1);
    });
  });

  describe("updating a blog", () => {
    test("should update likes of a blog post", async () => {
      const blogsAtStart = await api.get("/api/blogs");
      const blogToUpdate = blogsAtStart.body[0];

      const response = await api
        .put(`/api/blogs/${blogToUpdate.id}`)
        .send({ likes: 20 })
        .expect(200);

      assert.strictEqual(response.body.likes, 20);

      const blogsAtEnd = await api.get("/api/blogs");
      const updatedBlogInDb = blogsAtEnd.body.find(
        (blog) => blog.id === blogToUpdate.id,
      );
      assert.strictEqual(updatedBlogInDb.likes, 20);
    });

    test("should return 404 when blog does not exist", async () => {
      const nonExistentId = "507f1f77bcf86cd799439011";
      await api
        .put(`/api/blogs/${nonExistentId}`)
        .send({ likes: 5 })
        .expect(404);
    });
  });

  after(async () => {
    await mongoose.connection.close();
  });
});
