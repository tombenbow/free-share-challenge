import * as chai from "chai";
import chaiAsPromised from "chai-as-promised";
import { setEmmaRewardAccount } from "../mockBrokerApi/accountManagement.js";
import {
  returnBoundsOfShareValues,
  isShareWithinBounds,
  pickShareForUser
} from "../models/resources/selectShare.js";
import { addUserToFreeShareQueue } from '../models/utils/freeShareQueue.js';

chai.use(chaiAsPromised);
const { expect } = chai;

describe("returnBoundsOfShareValues", () => {
  it("returns object", async () => {
    const result = await returnBoundsOfShareValues(1);
    expect(result).to.be.a("object");
  });
  it("when passed a number between 0-95, returns a lowerBound of 3 and an upperBound of 10", async () => {
    const result = await returnBoundsOfShareValues(94.9);
    expect(result.lowerBound).to.eql(3);
    expect(result.upperBound).to.eql(10);
  });
  it("when passed a number between 95-98, returns a lowerBound of 10 and an upperBound of 25", async () => {
    const result = await returnBoundsOfShareValues(95.01);
    expect(result.lowerBound).to.eql(10);
    expect(result.upperBound).to.eql(25);
  });
  it("when passed a number between 98-100, returns a lowerBound of 25 and an upperBound of 200", async () => {
    const result = await returnBoundsOfShareValues(98.01);
    expect(result.lowerBound).to.eql(25);
    expect(result.upperBound).to.eql(200);
  });
});

describe("isShareWithinBounds", () => {
  it("returns boolean", async () => {
    const result = await isShareWithinBounds();
    expect(result).to.be.a("boolean");
  });
  it("returns true when passed a value of 5, a lowerBound of 3, and an upperBound of 10", async () => {
    const result = await isShareWithinBounds(5, 3, 10);
    expect(result).to.eql(true);
  });
  it("returns false when passed a value of 2, a lowerBound of 3, and an upperBound of 10", async () => {
    const result = await isShareWithinBounds(2, 3, 10);
    expect(result).to.eql(false);
  });
  it("returns false when passed a value of 12, a lowerBound of 3, and an upperBound of 10", async () => {
    const result = await isShareWithinBounds(12, 3, 10);
    expect(result).to.eql(false);
  });
});

describe("pickShareForUser", () => {
    it("returns string", async () => {
      setEmmaRewardAccount({C: 1})
      const userId = 1;
      const lowerBound = 3;
      const upperBound = 10
      const result = await pickShareForUser(userId, lowerBound, upperBound);
      expect(result).to.be.a("string");
    });
    it("returns share set in reward account when it has value that falls within the bounds provided", async () => {
        setEmmaRewardAccount({C: 1})
        const userId = 1;
        const lowerBound = 3;
        const upperBound = 10
        const result = await pickShareForUser(userId, lowerBound, upperBound);
        expect(result).to.eql("C");
      });
  });

  describe("addUserToFreeShareQueue", () => {
    it("returns object with value pair success:true", async () => {
      const userId = 1;
      const lowerBound = 3;
      const upperBound = 10
      const result = await addUserToFreeShareQueue(userId, lowerBound, upperBound);
      expect(result).to.be.a("object");
      expect(result.success).to.eql(true)
    });
  });