import { render, screen } from "@testing-library/react";
import { expect, test, vi } from "vitest";
import Blog from "../components/Blog";

test("renders content", () => {
  const blog = {
    user: "samir",
    likes: 1,
    author: "samir",
    title: "Test Blog",
    url: "http://test.com",
  };

  render(<Blog blog={blog} />);

  const titleElement = screen.getByTestId("blog-title");
  const authorElement = screen.getByTestId("blog-author");
  expect(titleElement).toBeDefined();
  expect(titleElement).toHaveTextContent("Test Blog");
  expect(authorElement).toHaveTextContent("samir");

  const urlElement = screen.queryByTestId("blog-url");
  const likesElement = screen.queryByTestId("blog-likes");
  expect(urlElement).toBeNull();
  expect(likesElement).toBeNull();
});
