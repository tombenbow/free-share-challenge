import * as chai from "chai";
import chaiAsPromised from "chai-as-promised";
import { setEmmaRewardAccount } from "../../mockBrokerApi/brokerResources/accountManagement.js";
import { returnValueConstraint, pickShareForUser } from "../resources/selectShare.js";

chai.use(chaiAsPromised);
const { expect } = chai;

describe("returnValueConstraint", () => {
  it("returns function", async () => {
    const constraint = await returnValueConstraint(1);
    expect(constraint).to.be.a("function");
  });
  it("when passed a number between 0-95, returns a func that returns true when passed a number between 3-10", async () => {
    const constraint = await returnValueConstraint(94.9);
    expect(constraint(2.9)).to.eql(false);
    expect(constraint(3)).to.eql(true);
    expect(constraint(10)).to.eql(true);
    expect(constraint(11)).to.eql(false);
  });
  it("when passed a number between 95-98, returns a func that returns true when passed a number between 10-25", async () => {
    const constraint = await returnValueConstraint(95.01);
    expect(constraint(9.9)).to.eql(false);
    expect(constraint(10)).to.eql(true);
    expect(constraint(25)).to.eql(true);
    expect(constraint(25.01)).to.eql(false);
  });
  it("when passed a number between 98-100, returns a func that returns true when passed a number between 25-200", async () => {
    const constraint = await returnValueConstraint(98.01);
    expect(constraint(24.9)).to.eql(false);
    expect(constraint(25)).to.eql(true);
    expect(constraint(200)).to.eql(true);
    expect(constraint(200.0001)).to.eql(false);
  });
});

describe("pickShareForUser", () => {
    it("returns string", async () => {
      setEmmaRewardAccount({C: 1})  
      const constraint = returnValueConstraint(94.9);
      const result = await pickShareForUser(constraint)
      expect(result).to.be.a("string");
    });
    it("returns share set in reward account when it has relevant value", async () => {
        setEmmaRewardAccount({C: 1})  
        const constraint = returnValueConstraint(94.9);
        const result = await pickShareForUser(constraint)
        expect(result).to.eql("C");
    });
  });
