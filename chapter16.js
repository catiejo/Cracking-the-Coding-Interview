// 16.17
function maxSum(array) {
  var curSum = 0, maxSum = 0;
  array.forEach( function (num) {
    curSum += num;
    maxSum = Math.max(curSum, maxSum);
    curSum = Math.max(curSum, 0);
  });
  return maxSum;
}

// 16.17 Tests
tests =
[
  [[1, -2, 0, 5, 2, 3, -4], 10],
  [[-1, -2, -3, -4, -5, 0], 0],
  [[1, 2, 3, 4, 5], 15]
]

tests.forEach( function (test, index, array) {
  var sum = maxSum(test[0]);
  var result = sum == test[1];
  console.log(`16.17 test${index + 1}: ${result}`);
});

// 16.24
function printAllPairs(a) {
  var complement, map = new HashMap(), printNum = 0;
  a.forEach(function (num) {
      if (!map.has(num) {
        map.set(num, 0);
      }
      map.set(num, map.get(num) + 1);
  }
  map.keys().forEach( function (num) {
    complement = 7 - num;
    if (num < complement && map.has(complement) {
      printNum = map.get(num) * map.get(complement);
      for (var i = 0; i < printNum; i++) {
        console.log(`${num} + ${complement} = 7`);
      }
    }
  }
}
