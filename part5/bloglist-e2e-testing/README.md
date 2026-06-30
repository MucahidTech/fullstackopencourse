# 🎭 Bloglist E2E Testing

End-to-end test suite for the bloglist application using Playwright. Built through exercises 5.17 - 5.28 of Full Stack Open Course.

## 🎯 What it does

This project contains automated tests that simulate real user interactions with the bloglist application:

- 🧪 **Login Flows**: Tests for successful and failed login attempts.
- ✍️ **Blog Management**: Verifies that a logged-in user can create, like, and delete a blog.
- 🔐 **Permission Checks**: Ensures that only the blog creator can delete it.
- 🧭 **Routing**: Checks that navigation between views works correctly.
- 📊 **Data Display**: Confirms that blogs are sorted correctly by the number of likes.

## 🧠 What I practiced

- 🌐 **End-to-End Testing**: Using Playwright's API for browser automation (`page`, `request`).
- 🔐 **Testing Authentication**: Logging in with a user and maintaining the session for subsequent tests.
- 🧹 **Database Setup**: Resetting the test database before each test run using the backend's `/api/testing/reset` endpoint.
- 🧩 **Test Helpers**: Creating reusable functions (`loginWith`, `createBlog`) to avoid code duplication.
- 🔄 **Handling Dialogs**: Using Playwright's `dialog` handler to accept confirmation prompts for deletions.

## 🚀 How to run

```bash
# Navigate to the project
cd part5/bloglist-e2e-testing

# Install dependencies
npm install

# Run all tests in headless mode
npm test

# Run tests in headed mode (to see the browser)
npm test -- --headed

# Run a specific test file
npm test -- tests/blog_app.spec.js
```

**Note:** This test suite requires both the bloglist frontend (running on http://localhost:5173) and its associated backend (running on http://localhost:3003). The backend should be started with the `start:test` command.

## 📚 Reference

- [Full Stack Open - E2E testing](https://fullstackopen.com/en/part5/end_to_end_testing)
