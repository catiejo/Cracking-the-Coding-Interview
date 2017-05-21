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

/*
  #2 | Array of Products
  Write a function getProductsOfAllIntsExceptAtIndex() that takes an array of
  integers and returns an array of the products.
  Example: [1, 7, 3, 4] --> [84, 12, 28, 21]
*/
function getProductsOfAllIntsExceptAtIndex (ints) {
    if (ints.length < 2) {
        throw new Error("Getting the product of numbers at other indices requires at least 2 numbers");
    }
    var products = [], curProduct = 1;
    for (var i = 0; i < ints.length; i++) {
        products[i] = curProduct;
        curProduct *= ints[i];
    }
    curProduct = 1;
    for (var j = ints.length - 1; j >= 0; j--) {
        products[j] *= curProduct;
        curProduct *= ints[j];
    }
    return products;
}

// Bonus: What if you could use division?
function getProductsOfAllIntsExceptAtIndex2 (ints) {
  var zeroLocations = [], productWithoutZeros = 1, products = [];
  for (var i = 0; i < ints.length; i++) {
    if (ints[i] == 0) {
      zeroLocations.push(i);
    }
    productWithoutZeros *= ints[i];
  }
  finalProduct = zeroLocations.length == 0 ? productWithoutZeros : 0;
  for (var j = 0; j < ints.length; j++) {
    products[j] = finalProduct/ints[j];
  }
  if (zeroLocations.length == 1) {
    products[zeroLocations[0]] = productWithoutZeros;
  }
  return products;
}

