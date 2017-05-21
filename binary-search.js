var colors = require('colors');

/************************************************************************/
/********************************* Code *********************************/
/************************************************************************/

function binarySearchSlices(a, num) {
  if (a.length == 0) {
    return false;
  }
  var middle = Math.floor(a.length/2);
  if (a[middle] == num) {
    return true;
  } else {
    var start = a[middle] < num ? middle + 1 : 0;
    var end = a[middle] < num ? a.length : middle;
    return binarySearchSlices(a.slice(start, end), num);
  }
}

function binarySearchInPlace(a, num, start, end) {
  if (start > end) {
    return false;
  }
  var middle = Math.floor((start + end) / 2);
  if (a[middle] == num) {
    return true;
  } else {
    start = a[middle] < num ? middle + 1 : start;
    end = a[middle] < num ? end : middle - 1;
    return binarySearchInPlace(a, num, start, end);
  }
}

function binarySearchIterative(a, num) {
  var start = 0, end = a.length - 1;
  while (start <= end) {
    var middle = Math.floor((start + end) / 2);
    if (a[middle] == num) {
      return true;
    }
    start = a[middle] < num ? middle + 1 : start;
    end = a[middle] < num ? end : middle - 1;
  }
  return false;
}

/************************************************************************/
/***************************** Benchmarking *****************************/
/************************************************************************/

function binarySearchTest(a, num, answer) {
  var arrayString = a.toString();
  if (a.length > 25) {
    arrayString = `${a.slice(0, 5)}...${a.slice(-5)}`
  }
  console.log(`Searching for ${num} in [${arrayString}]`.cyan);
  console.log("  ---------------------------");

  console.time("  Iterative In Place")
  var iter = binarySearchIterative(a, num);
  console.timeEnd("  Iterative In Place");
  console.log(`  --${iter == answer ? "SUCCESS".green : "FAIL".red}`);

  console.time("  Recursive In Place")
  var inPlace = binarySearchInPlace(a, num, 0, a.length - 1);
  console.timeEnd("  Recursive In Place");
  console.log(`  --${inPlace == answer ? "SUCCESS".green : "FAIL".red}`);

  console.time("  In Slices")
  var slices =  binarySearchSlices(a, num);
  console.timeEnd("  In Slices");
  console.log(`  --${slices == answer ? "SUCCESS".green : "FAIL".red}`);

  console.log("  ---------------------------");
  var success = slices == answer && inPlace == answer && iter == answer;
  console.log((success ? "SUCCESS".green : "FAIL".red));
  console.log();
}

function makeBigTest(lowerBound, upperBound, exclude) {
  var banana = [];
  var randomizer = randomizerWithBound(lowerBound, upperBound);
  while (banana.length < 1000000) {
    var next = randomizer();
    if (exclude === undefined || next != exclude) {
      banana.push(next);
    }
  }
  return banana.sort((a, b) => a - b);
}

function getRandomValue(a) {
  var rando = randomizerWithBound(0, a.length - 1);
  return a[rando()];
}

function randomizerWithBound(lowerBound, upperBound) {
  var randomizer = function () {
    return Math.floor(Math.random() * (upperBound - lowerBound + 1)) + lowerBound;
  }
  return randomizer;
}

var tests =
[
  [[1, 2, 3, 4, 5], 3, true], // standard cases
  [[1, 2, 3, 4, 5, 6], 3, true],
  [[1, 2, 4, 5], 3, false],
  [[1, 2, 3, 4, 5], 1, true], // boundary cases
  [[1, 2, 3, 4, 5], 5, true],
  [[1, 2, 3, 4, 5], 0, false],
  [[1, 2, 3, 4, 5], 6, false],
  [[], 1, false], // edge cases
  [[0], 1, false],
  [[1], 1, true],
  [[-5, -3, -1, 1, 3, 5], -3, true], // negatives
  [bigTest = makeBigTest(-99, 99), getRandomValue(bigTest), true], // big cases
  [makeBigTest(-99, 99, 7), 7, false],
  [makeBigTest(-99, 99), 100, false],
  [makeBigTest(-99, 99), -100, false],
  [biggerTest = makeBigTest(-1000000, 1000000), getRandomValue(biggerTest), true],
  [makeBigTest(-1000000, 1000000, 7), 7, false]
];

tests.forEach( function (test) {
  binarySearchTest(test[0], test[1], test[2]);
});
