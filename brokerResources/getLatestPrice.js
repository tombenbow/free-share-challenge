export const getLatestPrice = async (tickerSymbol) => {
  const sharePrices = {
    AAPL: 1,
    BRK: 3,
    C: 4,
    GOOG: 5,
    HOG: 6,
    HPQ: 12,
    INTC: 20,
    KO: 22,
    MSFT: 75,
    T: 125,
    XOM: 190,
    WMT: 250,
  };
  const price = sharePrices[tickerSymbol];
  return {
    sharePrice: price,
  };
};
