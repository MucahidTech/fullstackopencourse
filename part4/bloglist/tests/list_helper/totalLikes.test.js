const { test, describe } = require("node:test");
const assert = require("node:assert");
const listHelper = require("../../utils/list_helper");

describe("total likes", () => {
  test("should return 0 when list is empty", () => {
    const result = listHelper.totalLikes(listHelper.zeroBlog);
    assert.strictEqual(result, 0);
  });
  test("should return the likes count when list has one blog", () => {
    const result = listHelper.totalLikes(listHelper.oneBlog);
    assert.strictEqual(result, 5);
  });
  test("should return sum of all likes when list has multiple blogs", () => {
    const result = listHelper.totalLikes(listHelper.blogs);
    assert.strictEqual(result, 36);
  });
});
