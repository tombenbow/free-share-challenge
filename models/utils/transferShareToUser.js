import { moveSharesFromRewardsAccount } from "../mockBrokerApi/brokerResources/accountManagement.js"

export const transferShareToUser = async (userId, tickerSymbol, quantity) => {
    return await moveSharesFromRewardsAccount(userId, tickerSymbol, quantity)
}