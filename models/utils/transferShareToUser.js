import { moveSharesFromRewardsAccount } from "../../mockBrokerApi/accountManagement.js"

export const transferShareToUser = async (userId, tickerSymbol) => {
    const transferShare = await moveSharesFromRewardsAccount(userId, tickerSymbol, 1)
    if (!transferShare) {
        throw new Error("[InternalServerError] failed to transfer share")
    }
    return transferShare;
}