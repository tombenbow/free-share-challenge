import * as chai from "chai";
import chaiAsPromised from "chai-as-promised";
import { listTradeableAssets } from "../mockBrokerApi/tradeableAssets.js";
import { getLatestPrice } from "../mockBrokerApi/latestPrices.js";
import {
  isMarketOpen,
  shutMarket,
  openMarket,
} from "../mockBrokerApi/marketState.js";
import {
  buySharesInRewardsAccount,
  getRewardAccountPositions,
  setEmmaRewardAccount,
  moveSharesFromRewardsAccount,
} from "../mockBrokerApi/accountManagement.js";

chai.use(chaiAsPromised);
const { expect } = chai;

describe("listTradeableAssets", () => {
  it("returns array", async () => {
    const result = await listTradeableAssets();
    expect(result).to.be.a("array");
  });
  it("returns array of assets as listed in function", async () => {
    const result = await listTradeableAssets();
    expect(result).to.eql([
      { tickerSymbol: "AAPL" },
      { tickerSymbol: "BRK" },
      { tickerSymbol: "C" },
      { tickerSymbol: "GOOG" },
      { tickerSymbol: "HOG" },
      { tickerSymbol: "HPQ" },
      { tickerSymbol: "INTC" },
      { tickerSymbol: "KO" },
      { tickerSymbol: "MSFT" },
      { tickerSymbol: "T" },
      { tickerSymbol: "XOM" },
      { tickerSymbol: "WMT" },
    ]);
  });
});

describe("getLatestPrice", () => {
  it("returns object", async () => {
    const result = await getLatestPrice("AAPL");
    expect(result).to.be.a("object");
  });
  it("returns sharePrice of £1 when given APPL input", async () => {
    const appleSharePrice = await getLatestPrice("AAPL");
    expect(appleSharePrice.sharePrice).to.eql(1);
  });
});

describe("isMarketOpen", () => {
  it("returns object", async () => {
    const result = await isMarketOpen();
    expect(result).to.be.a("object");
  });
  it("testing func shutMarket shuts the market", async () => {
    shutMarket();
    const result = await isMarketOpen();
    expect(result.open).to.eql(false);
  });
  it("testing func openMarket opens the market", async () => {
    openMarket();
    const result = await isMarketOpen();
    expect(result.open).to.eql(true);
  });
});

describe("buySharesInRewardsAccount", () => {
  it("returns success true and correct sharePrice when market is set to open", async () => {
    openMarket();
    const result = await buySharesInRewardsAccount("HOG", 47);
    expect(result).to.be.a("object");
    expect(result.success).to.eql(true);
    expect(result.sharePricePaid).to.eql(6);
  });
  // it("throws error when market is set to shut", async () => {
  //   shutMarket();
  //   const result = await buySharesInRewardsAccount("HOG", 47);
  //   // expect().should.be.rejectedWith("[BadRequest] Market Currently Shut");
  //   return expect(result).to.be.rejected();
  // });
});

describe("getRewardAccountPositions", () => {
  it("returns an array", async () => {
    setEmmaRewardAccount({ AAPL: 4 });
    const result = await getRewardAccountPositions();
    expect(result).to.be.a("array");
  });
  it("returns positions in desired format", async () => {
    setEmmaRewardAccount({ AAPL: 4 });
    const result = await getRewardAccountPositions();
    expect(result).to.eql([
      { tickerSymbol: "AAPL", quantity: 4, sharePrice: 1 },
    ]);
  });
});

describe("moveSharesFromRewardsAccount", () => {
  it("returns a boolean", async () => {
    const result = await moveSharesFromRewardsAccount();
    expect(result).to.be.a("boolean");
  });
  it("returns true when asked to move shares that are in the account", async () => {
    setEmmaRewardAccount({ AAPL: 4 });
    const result = await moveSharesFromRewardsAccount(
      "customerAccount",
      "AAPL",
      1
    );
    expect(result).to.eql(true);
  });
  it("returns false when asked to move shares that are not in the account", async () => {
    setEmmaRewardAccount({});
    const result = await moveSharesFromRewardsAccount(
      "customerAccount",
      "AAPL",
      1
    );
    expect(result).to.eql(false);
  });
  it("returns false when parameters are missing", async () => {
    setEmmaRewardAccount({});
    const result = await moveSharesFromRewardsAccount("AAPL", 1);
    expect(result).to.eql(false);
  });
});
