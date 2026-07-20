import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { BrowserRouter } from "react-router-dom";

import Blog from "../components/Blog";

const blog = {
  user: {
    id: "user1",
    name: "Mucahid",
    username: "user1",
  },
  likes: 1,
  author: "mucahid",
  title: "Test Blog",
  url: "http://test.com",
};

const renderWithRouter = (component) => {
  return render(<BrowserRouter>{component}</BrowserRouter>);
};

describe("Blog component", () => {
  test("renders blog information for unauthenticated users, but not likes and remove buttons", () => {
    renderWithRouter(<Blog blog={blog} userId={null} />);

    const titleElement = screen.getByTestId("blog-title");
    const authorElement = screen.getByTestId("blog-author");
    const urlElement = screen.queryByTestId("blog-url");
    const likesElement = screen.queryByTestId("blog-likes");
    expect(titleElement).toBeDefined();
    expect(titleElement).toHaveTextContent("Test Blog");
    expect(urlElement).toBeDefined();
    expect(likesElement).toBeDefined();
    expect(authorElement).toHaveTextContent("mucahid");

    const likeButton = screen.queryByText("like");
    const removeButton = screen.queryByText("remove");
    expect(likeButton).toBeNull();
    expect(removeButton).toBeNull();
  });

  test("authenticated users can like blogs", async () => {
    const mockHandler = vi.fn();
    const user = userEvent.setup();

    renderWithRouter(
      <Blog blog={blog} userId={"user2"} updateBlog={mockHandler} />,
    );

    const likeButton = screen.getByText("like");
    expect(likeButton).toBeDefined();

    await user.click(likeButton);
    await user.click(likeButton);
    expect(mockHandler.mock.calls).toHaveLength(2);
  });

  test("delete button is shown only for blog creator", async () => {
    const mockDelete = vi.fn();
    const user = userEvent.setup();
    window.confirm = vi.fn().mockReturnValue(true);

    const mockHandler = vi.fn();
    renderWithRouter(
      <Blog blog={blog} userId={"user1"} deleteBlog={mockDelete} />,
    );

    const removeButton = screen.queryByTestId("blog-remove");
    await user.click(removeButton);

    expect(mockDelete).toHaveBeenCalledTimes(1);
    expect(mockDelete).toHaveBeenCalledWith(blog.id);
  });
});
