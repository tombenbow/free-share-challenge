import { selectShare } from "./resources/selectShare.js";
import { moveSharesFromRewardsAccount } from "../mockBrokerApi/brokerResources/accountManagement.js"

export const claimFreeShare = async (userId) => {
  let respBody = {};
  try {
    const shareToGiftUser = await selectShare(userId);
    const giftShare = await moveSharesFromRewardsAccount(
      userId,
      shareToGiftUser,
      1
    );
    if (!giftShare) {
      throw new Error(
        `[InternalServerError] failed to transfer share ${shareToGiftUser} to ${userId}`
      );
    }
  } catch (err) {
    respBody.message = err.message;
    respBody.success = false;
  }
  return respBody;
};
