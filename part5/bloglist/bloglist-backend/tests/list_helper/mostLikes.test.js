const { test, describe } = require("node:test");
const assert = require("node:assert");
const listHelper = require("../../utils/list_helper");

describe("Author with most likes", () => {
  test("should return null when list is empty", () => {
    const result = listHelper.mostLikes([]);
    assert.deepStrictEqual(result, null);
  });

  test("should return the only author when list has one blog", () => {
    const result = listHelper.mostLikes(listHelper.oneBlog);
    assert.deepStrictEqual(result, {
      author: "Edsger W. Dijkstra",
      likes: 5,
    });
  });

  test("should return author with most total likes when multiple blogs exist", () => {
    const result = listHelper.mostLikes(listHelper.blogs);
    assert.deepStrictEqual(result, {
      author: "Edsger W. Dijkstra",
      likes: 17,
    });
  });
});
