import { getRewardAccountPositions } from "../../mockBrokerApi/accountManagement.js";
import { addUserToFreeShareQueue } from "../utils/freeShareQueue.js";

export const returnBoundsOfShareValues = (num) => {
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
  return { lowerBound, upperBound };
};

export const isShareWithinBounds = (value, lowerBound, upperBound) => {
  return lowerBound <= value && value <= upperBound;
};

export const pickShareForUser = async (userId, lowerBound, upperBound) => {
  const currentPositions = await getRewardAccountPositions();
  for (let position of currentPositions) {
    if (isShareWithinBounds(position.sharePrice, lowerBound, upperBound)) {
      return position.tickerSymbol;
    }
  }
  await addUserToFreeShareQueue(userId, lowerBound, upperBound);
  throw new Error('no shares currently available, user added to free share queue')
};

export const selectShare = async (userId) => {
  const { lowerBound, upperBound } = returnBoundsOfShareValues(
    Math.random() * 100
  );
  return await pickShareForUser(userId, lowerBound, upperBound);
};
