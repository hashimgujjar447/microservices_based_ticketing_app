import request from "supertest";
import { app } from "../../app";

it("Should signout successfully", async () => {
  await request(app)
    .post("/api/users/signup")
    .send({
      email: "test@test.com",
      password: "password",
    })
    .expect(201);

  const response = await request(app)
    .post("/api/users/signout")
    .send({})
    .expect(200);

  expect(response.get("Set-Cookie")).toBeDefined();
});

it("Clears the cookie after signing out", async () => {
  const agent = request.agent(app);

  await agent
    .post("/api/users/signup")
    .send({
      email: "test@test.com",
      password: "password",
    })
    .expect(201);

  const response = await agent.post("/api/users/signout").send({}).expect(200);

  const cookie = response.get("Set-Cookie");
  expect(cookie).toBeDefined();
  expect(cookie![0]).toEqual(
    "session=; path=/; expires=Thu, 01 Jan 1970 00:00:00 GMT; httponly",
  );
});

it("Revokes access to current-user after signing out", async () => {
  const agent = request.agent(app);

  await agent
    .post("/api/users/signup")
    .send({
      email: "test@test.com",
      password: "password",
    })
    .expect(201);

  await agent.get("/api/users/current-user").send().expect(200);

  await agent.post("/api/users/signout").send({}).expect(200);

  await agent.get("/api/users/current-user").send().expect(401);
});
