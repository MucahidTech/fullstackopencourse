import { test, expect, beforeEach, describe } from "@playwright/test";
import { loginWith, createBlog } from "./helper";

describe("Blog app", () => {
  beforeEach(async ({ page, request }) => {
    await request.post("http://localhost:3003/api/testing/reset");
    await request.post("http://localhost:3003/api/users", {
      data: {
        name: "Mucahid",
        username: "firstUser",
        password: "StrongPassword",
      },
    });
    await page.goto("http://localhost:5173");
  });

  test("Login form is shown", async ({ page }) => {
    await expect(page.getByText("Log in to application")).toBeVisible();
    await expect(page.getByLabel("username")).toBeVisible();
    await expect(page.getByLabel("password")).toBeVisible();
    await expect(page.getByRole("button", { name: "login" })).toBeVisible();
  });

  describe("Login", () => {
    test("succeeds with correct credentials", async ({ page }) => {
      await loginWith(page, "firstUser", "StrongPassword");
      await expect(page.getByText("Login Successful")).toBeVisible();
    });

    test("fails with wrong credentials", async ({ page }) => {
      await loginWith(page, "newUser", "wrongPassword");

      const errorDiv = page.locator(".error");
      await expect(errorDiv).toContainText("Wrong username or password");
      await expect(errorDiv).toHaveCSS("border-style", "solid");
      await expect(errorDiv).toHaveCSS("color", "rgb(255, 0, 0)");

      await expect(page.getByText("Mucahid logged in")).not.toBeVisible();
    });
  });

  describe("When logged in", () => {
    beforeEach(async ({ page }) => {
      await loginWith(page, "firstUser", "StrongPassword");
    });

    test("a new blog can be created", async ({ page }) => {
      await createBlog(page);
      await expect(
        page.getByTestId("blog-title").filter({ hasText: "Test Blog" }),
      ).toBeVisible();
    });
    test("a blog can be liked", async ({ page }) => {
      const blogTitle = "Blog to liked";
      await createBlog(page, blogTitle);

      const blogElement = page
        .getByTestId("blog-title")
        .filter({ hasText: blogTitle })
        .locator("..");
      await blogElement.getByRole("button", { name: "view" }).click();
      await page.getByRole("button", { name: "like" }).click();

      const likesCount = page.getByTestId("blog-likes");
      await expect(likesCount).toContainText("1");
    });
  });
});
