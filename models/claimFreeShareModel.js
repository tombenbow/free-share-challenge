import { selectShare } from "./resources/selectShare.js";
import { transferShareToUser } from "./utils/transferShareToUser.js";

export const claimFreeShareModel = async ({ userId }) => {
  const shareToGiftUser = await selectShare(userId);
  const transferredShare = await transferShareToUser(
    userId,
    shareToGiftUser,
    1
  );
  if (!transferredShare) {
    throw new Error("[InternalServerError] failed to transfer share");
  }
  return shareToGiftUser;
};
