const { test, describe } = require("node:test");
const assert = require("node:assert");
const listHelper = require("../../utils/list_helper");

describe("Author with most blogs", () => {
  test("should return null when list is empty", () => {
    const result = listHelper.mostBlogs([]);
    assert.deepStrictEqual(result, null);
  });

  test("should return the blog author when list has one blog", () => {
    const result = listHelper.mostBlogs(listHelper.oneBlog);
    assert.deepStrictEqual(result, {
      author: "Edsger W. Dijkstra",
      blogs: 1,
    });
  });

  test("should return the author with most blogs from a larger list", () => {
    const result = listHelper.mostBlogs(listHelper.blogs);
    assert.deepStrictEqual(result, {
      author: "Robert C. Martin",
      blogs: 3,
    });
  });
});
