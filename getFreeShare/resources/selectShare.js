import { getRewardAccountPositions } from "../../mockBrokerApi/brokerResources/accountManagement.js";

export const returnValueConstraint = (num) => {
  let lowerBound;
  let upperBound;
  if (98 < num) {
    lowerBound = 25;
    upperBound = 200;
  }
  if (num <= 98) {
    lowerBound = 10;
    upperBound = 25;
  }
  if (num <= 95) {
    lowerBound = 3;
    upperBound = 10;
  }
  const constraint = (value) => {
    return lowerBound <= value && value <= upperBound;
  };
  return constraint;
};

export const pickShareForUser = async (valueConstraint) => {
  const currentPositions = await getRewardAccountPositions();
  for (let position of currentPositions) {
    if (valueConstraint(position.sharePrice)) {
      return position.tickerSymbol;
    }
  }
  //NEED TO HANDLE HERE WHAT TO DO IF THERE'S NO AVAILABLE SHARES AND THE MARKET IS SHUT
  // const marketState = await isMarketOpen();
  // if (marketState.open) {
  //     await topUpEmmaAccount()
  //     return await pickShareForUser()
  // }
  // await addUserToQueue(userId, valueConstraint)
};

export const selectShare = async (userId) => {
  const valueConstraint = returnValueConstraint(Math.random() * 100);
  const share = await pickShareForUser(valueConstraint);
  return share;
};
