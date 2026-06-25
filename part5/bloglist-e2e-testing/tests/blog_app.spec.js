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
    await page.goto("http://localhost:5173/");
  });

  test("Login form is shown", async ({ page }) => {
    await page.getByRole("link", { name: "login" }).click();

    await expect(page.getByText("Log in to application")).toBeVisible();
    await expect(page.getByLabel("username")).toBeVisible();
    await expect(page.getByLabel("password")).toBeVisible();
    await expect(page.getByRole("button", { name: "login" })).toBeVisible();
  });

  describe("Login", () => {
    test("succeeds with correct credentials", async ({ page }) => {
      await loginWith(page, "firstUser", "StrongPassword");
      await expect(page.getByText("Login Successful")).toBeVisible();
      await expect(page.getByRole("button", { name: "logout" })).toBeVisible();
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
    let blogLink;
    beforeEach(async ({ page }) => {
      await loginWith(page, "firstUser", "StrongPassword");
      await createBlog(page);
      blogLink = page.getByRole("link", { name: "Test Blog" });
    });

    test("a new blog can be created", async ({ page }) => {
      await expect(blogLink).toBeVisible();
    });
    test("a blog can be liked", async ({ page }) => {
      await blogLink.click();
      await page.getByRole("button", { name: "like" }).click();

      await expect(page.getByTestId("blog-likes")).toHaveText("1");
    });
    test("a blog can be deleted", async ({ page }) => {
      page.on("dialog", (dialog) => dialog.accept());

      await blogLink.click();
      await page.getByTestId("blog-remove").click();

      await expect(
        page.getByRole("link", { name: "Test Blog" }),
      ).not.toBeVisible();
    });
    // test("only blog creater can delete it", async ({ page, request }) => {
    //   // test.setTimeout(3000);

    //   await page.getByRole("button", { name: "logout" }).click();
    //   await request.post("http://localhost:3003/api/users", {
    //     data: {
    //       name: "Ahmed",
    //       username: "secondUser",
    //       password: "Password",
    //     },
    //   });
    //   await loginWith(page, "secondUser", "Password");

    //   const targetBlog = page
    //     .getByTestId("blog-title")
    //     .filter({ hasText: "Test Blog" })
    //     .locator("..");

    //   await targetBlog.getByRole("button", { name: "view" }).click();
    //   await expect(targetBlog.getByTestId("blog-remove")).not.toBeVisible();
    // });
    // test("blogs are ordered by likes", async ({ page, request }) => {
    //   const userJson = await page.evaluate(() => {
    //     return window.localStorage.getItem("loggedBlogappUser");
    //   });

    //   const user = JSON.parse(userJson);
    //   const token = `Bearer ${user.token}`;

    //   const topBlogResponse = await request.post(
    //     "http://localhost:3003/api/blogs",
    //     {
    //       data: {
    //         title: "The Most Popular Blog",
    //         author: "Expert",
    //         url: "top.com",
    //         likes: 10,
    //       },
    //       headers: { Authorization: token },
    //     },
    //   );

    //   await request.post("http://localhost:3003/api/blogs", {
    //     data: {
    //       title: "The Medium Popular Blog",
    //       author: "Senior",
    //       url: "medium.com",
    //       likes: 5,
    //     },
    //     headers: { Authorization: token },
    //   });

    //   await page.reload({ waitUntil: "networkidle" });

    //   const blogTitles = page.getByTestId("blog-title");

    //   await expect(blogTitles.nth(0)).toHaveText("The Most Popular Blog");
    //   await expect(blogTitles.nth(1)).toHaveText("The Medium Popular Blog");
    //   await expect(blogTitles.nth(2)).toHaveText("Test Blog");
    // });
  });
});
