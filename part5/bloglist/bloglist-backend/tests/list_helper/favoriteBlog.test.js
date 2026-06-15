const { test, describe } = require("node:test");
const assert = require("node:assert");
const listHelper = require("../../utils/list_helper");

describe("Favorite blog", () => {
  test("should return 'no blogs' when list is empty", () => {
    const result = listHelper.favoriteBlog([]);
    assert.deepStrictEqual(result, "no blogs");
  });
  test("should return the same blog when list has one blog", () => {
    const result = listHelper.favoriteBlog(listHelper.oneBlog);
    assert.deepStrictEqual(result, listHelper.oneBlog[0]);
  });
  test("should return the most liked one when list has multiple blogs", () => {
    const result = listHelper.favoriteBlog(listHelper.blogs);
    const expected = listHelper.blogs.find((blog) => blog.likes === 12);
    assert.deepStrictEqual(result, expected);
  });
});
