import request from "supertest";
import { app } from "../../app";

it("Should return user information ", async () => {
  const agent = request.agent(app);
  await agent
    .post("/api/users/signup")
    .send({
      email: "hashim@gmail.com",
      password: "password",
    })
    .expect(201);

  const response = await agent
    .get("/api/users/current-user")
    .send()
    .expect(200);

  expect(response.body.currentUser.email).toEqual("hashim@gmail.com");
});

it("Responds with 401 if not authenticated", async () => {
  await request(app).get("/api/users/current-user").send().expect(401);
});

it("Responds with 401 when provided an invalid session cookie", async () => {
  const invalidSession = Buffer.from(JSON.stringify({ jwt: "invalid-token" })).toString("base64");
  await request(app)
    .get("/api/users/current-user")
    .set("Cookie", [`session=${invalidSession}`])
    .send()
    .expect(401);
});
