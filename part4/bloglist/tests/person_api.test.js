const { test, describe, after } = require("node:test");
const assert = require("node:assert");
const mongoose = require("mongoose");
const supertest = require("supertest");
const app = require("../app");

const api = supertest(app);

describe("Testing blogs API", () => {
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

  test.only("unique identifier is named 'id' not '_id'", async () => {
    const newBlog = {
      title: "Test Blog",
      author: "Tester",
      url: "http://test.com",
      likes: 5,
    };

    await api.post("/api/blogs").send(newBlog).expect(201);

    const response = await api.get("/api/blogs");
    const blog = response.body[2];

    assert.ok(blog.id);
    assert.strictEqual(blog._id, undefined);
  });

  after(async () => {
    await mongoose.connection.close();
  });
});
