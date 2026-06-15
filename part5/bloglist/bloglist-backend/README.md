# ✍️ Blog List Backend

A RESTful API for a blog listing application with user accounts, authentication, and database persistence. Built through exercises 4.1 - 4.23 of Full Stack Open Course.

## 🎯 What it does

- ➕ Create, read, update, and delete blog posts
- 👤 Register new users with username and password
- 🔐 Authenticate users via JWT tokens
- 👨‍💻 Link each blog post to its creator
- 🔒 Restrict blog creation and deletion to authenticated users
- 🧪 Comprehensive unit and integration tests

## 🧠 What I practiced

- 🧪 Writing unit tests with Node's native test runner (`node:test`, `assert`)
- 🌐 Building integration tests for Express routes with SuperTest
- 🗄️ Modeling data relationships with Mongoose (population)
- 🔐 Hashing passwords and saving users to MongoDB
- 🔑 Generating and verifying JWT tokens for authentication
- 🛡️ Extracting middleware functions (`tokenExtractor`, `userExtractor`)
- 🔄 Using `async/await` instead of promises for all operations
- ✅ Validating user input (min length, uniqueness) in controllers

## 🚀 How to run locally

```bash
# Clone and navigate
git clone https://github.com/MucahidTech/fullstackopencourse/
cd part4/bloglist

# Install dependencies
npm install

# Set up environment variables
echo "MONGODB_URI=<your_mongodb_uri>" > .env
echo "SECRET=your_jwt_secret" >> .env
echo "PORT=3003" >> .env

# Start in development mode
npm run dev

# Run tests
npm test

# Run a single test file
npm test -- tests/blogs_api.test.js
```

## 📚 Reference

[Full Stack Open Part 4](https://fullstackopen.com/en/part4)
