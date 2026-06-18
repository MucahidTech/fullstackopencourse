import { render, screen } from "@testing-library/react";
import { expect, test, vi } from "vitest";
import userEvent from "@testing-library/user-event";

import Blog from "../components/Blog";

const mockHandler = vi.fn();

const blog = {
  user: "samir",
  likes: 1,
  author: "samir",
  title: "Test Blog",
  url: "http://test.com",
};

test("renders title and author, but not url or likes by default", () => {
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

test("shows url and likes after clicking view button", async () => {
  render(<Blog blog={blog} />);

  const user = userEvent.setup();
  const button = screen.getByText("view");
  await user.click(button);

  const titleElement = screen.getByTestId("blog-title");
  const authorElement = screen.getByTestId("blog-author");
});
