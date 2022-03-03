import { isMarketOpen } from "./marketState.js";
import { getLatestPrice } from "./latestPrices.js";

let emmaRewardAccount = {
  AAPL: 2,
  HOG: 7,
  INTC: 3,
  MSFT: 1
};

export const buySharesInRewardsAccount = async (tickerSymbol, quantity) => {
  const marketState = await isMarketOpen();
  if (!marketState.open) {
    throw new Error("[BadRequest] Market Currently Shut");
  }
  handleSharePurchase(tickerSymbol, quantity);
  const { sharePrice } = await getLatestPrice(tickerSymbol);
  return {
    success: true,
    sharePricePaid: sharePrice,
  };
};

const handleSharePurchase = (tickerSymbol, quantity) => {
  if (emmaRewardAccount.hasOwnProperty(tickerSymbol)) {
    emmaRewardAccount[tickerSymbol] += quantity;
  } else {
    emmaRewardAccount[tickerSymbol] = quantity;
  }
};

export const getRewardAccountPositions = async () => {
  const positions = [];
  for (const share in emmaRewardAccount) {
    const { sharePrice } = await getLatestPrice(share);
    const info = {
      tickerSymbol: share,
      quantity: emmaRewardAccount[share],
      sharePrice,
    };
    positions.push(info);
  }
  return positions;
};

export const moveSharesFromRewardsAccount = async (
  toAccount,
  tickerSymbol,
  quantity
) => {
  if (
    !emmaRewardAccount.hasOwnProperty(tickerSymbol) ||
    !toAccount ||
    !quantity
  ) {
    return false;
  }
  return true;
};

//TESTING FUNCTIONS
export const setEmmaRewardAccount = (desiredAccount) => {
  emmaRewardAccount = desiredAccount;
};
