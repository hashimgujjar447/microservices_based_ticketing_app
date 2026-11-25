import request from "supertest";
import { app } from "../../app";

it("Returns a 200 on successful signin", async () => {
  await request(app)
    .post("/api/users/signup")
    .send({
      email: "hashim@gmail.com",
      password: "password",
    })
    .expect(201);

  await request(app)
    .post("/api/users/signin")
    .send({
      email: "hashim@gmail.com",
      password: "password",
    })
    .expect(200);
});

it("Should give invalid credentials", async () => {
  await request(app)
    .post("/api/users/signin")
    .send({ email: "hashim@gmail.com", password: "password" })
    .expect(400);
});
