// 16.17
function maxSum(array) {
  var curSum = 0, maxSum = 0;
  array.forEach( function (num) {
    curSum += num;
    maxSum = Math.Max(curSum, maxSum);
    curSum = Math.Max(curSum, 0);
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

tests.forEach( function (test) {
  var sum = maxSum(test[0]);
  var result = sum == test[1];
  console.log(`16.17 test${index + 1}: ${result}`);
});
