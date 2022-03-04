import { selectShare } from "./resources/selectShare.js";
import { transferShareToUser } from "./utils/transferShareToUser.js";

export const claimFreeShareModel = async ({ userId }) => {
  const shareToGiftUser = await selectShare(userId);
  const transferredShare = await transferShareToUser(userId, shareToGiftUser);
  return shareToGiftUser;
};
