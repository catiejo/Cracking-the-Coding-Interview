/*
  #1 | Trading Apple Stocks
  Write an efficient function that takes stockPricesYesterday and returns
  the best profit I could have made from 1 purchase and 1 sale of stock.
*/
function getBestTrade(prices) {
    if (prices.length < 2) {
      throw new Error("Getting a profit requires at least 2 prices");
    }
    var bestTrade = prices[1] - prices[0], bestBuy = prices[0];
    for (var i = 1; i < prices.length; i++) {
        if (prices[i] - bestBuy > bestTrade) {
            bestTrade = prices[i] - bestBuy;
        }
        bestBuy = Math.min(bestBuy, prices[i]);
    }
    return bestTrade;
}
