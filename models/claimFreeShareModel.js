import { selectShare } from "./resources/selectShare.js";
import { transferShareToUser } from "./utils/transferShareToUser.js";

export const claimFreeShare = async ({userId}) => {
  let respBody = {};
  try {
    const shareToGiftUser = await selectShare(userId);
    const transferredShare = await transferShareToUser(userId, shareToGiftUser, 1)
    if (!transferredShare) {
      throw new Error(
        `[InternalServerError] failed to transfer share ${shareToGiftUser} to ${userId}`
      );
    }
    respBody.message = `[RequestSuccessful] transferred share ${shareToGiftUser} to ${userId}`;
  } catch (err) {
    respBody.message = err.message;
    respBody.success = false;
  }
  return respBody;
};
