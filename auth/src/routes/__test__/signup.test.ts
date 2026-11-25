import request from "supertest";
import { app } from "../../app";

it("Returns a 201 on successful signup", async () => {
  return request(app)
    .post("/api/users/signup")
    .send({
      email: "hashim@gmail.com",
      password: "password",
    })
    .expect(201);
});

it("Should return 400 with an invalid email", async () => {
  return request(app)
    .post("/api/users/signup")
    .send({
      email: "sskakshs",
      password: "password",
    })
    .expect(400);
});
it("Should return 400 with an invalid password", async () => {
  return request(app)
    .post("/api/users/signup")
    .send({
      email: "hashim@gmail.com",
      password: "p",
    })
    .expect(400);
});
it("Should return 400 with missing email and password", async () => {
  return request(app).post("/api/users/signup").send({}).expect(400);
});

it("Should return email already in use ", async () => {
  await request(app)
    .post("/api/users/signup")
    .send({
      email: "hashim@example.com",
      password: "hashim1234",
    })
    .expect(201);

  await request(app)
    .post("/api/users/signup")
    .send({
      email: "hashim@example.com",
      password: "hashim1234",
    })
    .expect(400);
});

it("sets a cookie after successful signup", async () => {
  const response = await request(app)
    .post("/api/users/signup")
    .send({
      email: "hashim@example.com",
      password: "hashim1234",
    })
    .expect(201);

  expect(response.get("Set-Cookie")).toBeDefined();
});
