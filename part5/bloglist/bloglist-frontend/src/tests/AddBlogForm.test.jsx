import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";

import AddBlogForm from "../components/AddBlogForm";

test("calls createBlog with correct data when form is submitted", async () => {
  const createBlog = vi.fn();
  render(<AddBlogForm createBlog={createBlog} />);

  const user = userEvent.setup();

  const titleInput = screen.getByLabelText("Title");
  const authorInput = screen.getByLabelText("Author");
  const urlInput = screen.getByLabelText("URI");

  await user.type(titleInput, "Test Blog");
  await user.type(authorInput, "Mucahid");
  await user.type(urlInput, "http://test.com");

  const submitButton = screen.getByText("Create");
  await user.click(submitButton);

  expect(createBlog).toHaveBeenCalledTimes(1);
  expect(createBlog).toHaveBeenCalledWith({
    title: "Test Blog",
    author: "Mucahid",
    url: "http://test.com",
  });
});
