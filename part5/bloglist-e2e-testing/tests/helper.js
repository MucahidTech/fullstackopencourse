export const loginWith = async (page, username, password) => {
  await page.getByRole("link", { name: "login" }).click();
  await page.getByLabel("username").waitFor({ state: "visible" });
  await page.getByLabel("username").fill(username);
  await page.getByLabel("password").fill(password);
  await page.getByRole("button", { name: "login" }).click();
};

export const createBlog = async (page, title = "Test Blog") => {
  await page.getByRole("link", { name: "Add Blog" }).click();
  await page.getByLabel("Title").fill(title);
  await page.getByLabel("Author").fill("PlayWright");
  await page.getByLabel("URI").fill("test.com");
  await page.getByRole("button", { name: "Create" }).click();
};
