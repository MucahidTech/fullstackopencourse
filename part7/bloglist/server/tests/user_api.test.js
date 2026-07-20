const { test, describe, after, beforeEach } = require("node:test");
const assert = require("node:assert");
const mongoose = require("mongoose");
const supertest = require("supertest");
const app = require("../app");

const bcrypt = require("bcryptjs");
const helper = require("./test_helper");
const User = require("../models/user");
const api = supertest(app);

describe("user creation", () => {
  beforeEach(async () => {
    await User.deleteMany({});

    const passwordHash = await bcrypt.hash("secret", 10);
    const user = new User({
      username: "root",
      name: "Root User",
      passwordHash,
    });

    await user.save();
  });

  test("should create a valid user", async () => {
    const usersAtStart = await helper.usersInDb();

    const newUser = {
      username: "Mucahid",
      name: "Mucahid",
      password: "strongPass",
    };

    await api
      .post("/api/users")
      .send(newUser)
      .expect(201)
      .expect("Content-Type", /application\/json/);

    const usersAtEnd = await helper.usersInDb();
    assert.strictEqual(usersAtEnd.length, usersAtStart.length + 1);

    const usernames = usersAtEnd.map((u) => u.username);
    assert(usernames.includes(newUser.username));
  });
  describe("when username malformed", () => {
    test("should fail with if username already taken", async () => {
      const usersAtStart = await helper.usersInDb();

      const newUser = {
        username: "root",
        name: "Superuser",
        password: "salainen",
      };

      const result = await api
        .post("/api/users")
        .send(newUser)
        .expect(400)
        .expect("Content-Type", /application\/json/);

      const usersAtEnd = await helper.usersInDb();
      assert(result.body.error.includes("expected `username` to be unique"));

      assert.strictEqual(usersAtEnd.length, usersAtStart.length);
    });
    test("should fail if username is missing", async () => {
      const usersAtStart = await helper.usersInDb();

      const newUser = {
        name: "mucahid",
        password: "secure",
      };

      const result = await api
        .post("/api/users")
        .send(newUser)
        .expect(400)
        .expect("Content-Type", /application\/json/);

      const usersAtEnd = await helper.usersInDb();
      assert(result.body.error.includes("Username and password are required"));

      assert.strictEqual(usersAtEnd.length, usersAtStart.length);
    });
    test("should fail if password is missing", async () => {
      const usersAtStart = await helper.usersInDb();

      const newUser = {
        name: "mucahid",
        username: "secure",
      };

      const result = await api
        .post("/api/users")
        .send(newUser)
        .expect(400)
        .expect("Content-Type", /application\/json/);

      const usersAtEnd = await helper.usersInDb();
      assert(result.body.error.includes("Username and password are required"));

      assert.strictEqual(usersAtEnd.length, usersAtStart.length);
    });
    test("should fail if username is less than 3 characters", async () => {
      const usersAtStart = await helper.usersInDb();
      const newUser = {
        username: "ro",
        name: "Super",
        password: "salainen",
      };

      const result = await api
        .post("/api/users")
        .send(newUser)
        .expect(400)
        .expect("Content-Type", /application\/json/);
      assert(
        result.body.error.includes(
          "Username must be at least 3 characters long"
        )
      );

      const usersAtEnd = await helper.usersInDb();
      assert.strictEqual(usersAtEnd.length, usersAtStart.length);
    });
    test("should fail if password is less than 3 characters", async () => {
      const usersAtStart = await helper.usersInDb();
      const newUser = {
        username: "row",
        name: "Super",
        password: "sa",
      };

      const result = await api
        .post("/api/users")
        .send(newUser)
        .expect(400)
        .expect("Content-Type", /application\/json/);
      assert(
        result.body.error.includes(
          "Password must be at least 3 characters long"
        )
      );

      const usersAtEnd = await helper.usersInDb();
      assert.strictEqual(usersAtEnd.length, usersAtStart.length);
    });
  });
  after(async () => {
    await mongoose.connection.close();
  });
});
