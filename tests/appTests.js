import { expect } from "chai";
import request from "supertest";
import { app } from "../app.js";
import { setEmmaRewardAccount } from "../mockBrokerApi/accountManagement.js";

describe("api", () => {
  it("GET 404 : route not found", async () => {
    return request(app)
      .get("/NotARoute")
      .expect(404)
      .then(({ body }) => {
        expect(body.msg).to.eql("Route Not Found");
      });
  });

  it("GET 405 : method not allowed", async () => {
    return request(app)
      .get("/api")
      .expect(405)
      .then(({ body }) => {
        expect(body.msg).to.eql("Method Not Allowed");
      });
  });

  describe("/claim-free-share", () => {
    it("POST 200 : /claim-free-share", async () => {
      return request(app)
        .post("/api/claim-free-share")
        .send({ userId: "randomUserId" })
        .expect(200)
        .then(({ text }) => {
          expect(text).to.be.a("string");
          expect(text).to.eql("[RequestSuccessful] share transferred to user.");
        });
    });
  });

  it("POST 400 : invalid parameters", async () => {
    return request(app)
      .post("/api/claim-free-share")
      .send({ greeting: "salut" })
      .expect(400)
      .then(({ body }) => {
        expect(body.msg).to.eql("Bad Request");
      });
  });

  it("POST 404 : route not found", async () => {
    return request(app)
      .post("/api/claim-free-share/NotARoute")
      .send({ greeting: "salut" })
      .expect(404)
      .then(({ body }) => {
        expect(body.msg).to.eql("Route Not Found");
      });
  });

  it("GET 405 : method not allowed", async () => {
    return request(app)
      .get("/api/claim-free-share")
      .expect(405)
      .then(({ body }) => {
        expect(body.msg).to.eql("Method Not Allowed");
      });
  });

  it("PATCH 405 : method not allowed", async () => {
    return request(app)
      .patch("/api/claim-free-share")
      .send({ greeting: "salut" })
      .expect(405)
      .then(({ body }) => {
        expect(body.msg).to.eql("Method Not Allowed");
      });
  });

  it("DELETE 405 : method not allowed", async () => {
    return request(app)
      .delete("/api/claim-free-share")
      .send({ greeting: "salut" })
      .expect(405)
      .then(({ body }) => {
        expect(body.msg).to.eql("Method Not Allowed");
      });
  });
});
