const supertest = require("supertest");
// const { app, server } = require("./index");
// const request = supertest(app);
const { faker } = require("@faker-js/faker");

it("hello world", async () => {
  expect(1).toBe(1);
});

afterAll((done) => {
  // server.close();
  done();
});
