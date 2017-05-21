var colors = require('colors');
var success = "SUCCESS".green;
var failure = "FAIL".red;
var algos = require('./sorting.js');

function arraysAreEqual(a1, a2) {
  if (a1.length != a2.length) {
    return false;
  }
  for (var i = 0; i < a1.length; i++) {
    if (a1[i] != a2[i]) {
      return false;
    }
  }
  return true;
}

function sortInts(a, b) {
  return a - b;
}

function testAll(test) {
  if (test.length == 1) {
    test[1] = test[0].slice().sort(sortInts);
  }
  var arrayString = test[0].toString();
  if (test[0].length > 25) {
    arrayString = `${test[0].slice(0, 5)}...${test[0].slice(-5)}`
  }
  console.log(`Test = [${arrayString}]`.cyan);

  console.time("Radix Sort")
  var radixed = algos.radixSort(test[0].slice());
  console.timeEnd("Radix Sort")
  var radixSuccess = arraysAreEqual(radixed, test[1]);
  console.log(`--> ${radixSuccess ? success : failure}`);

  console.time("Quick Sort")
  var quicked = algos.quickSort(test[0].slice());
  console.timeEnd("Quick Sort")
  var quickSuccess = arraysAreEqual(quicked, test[1]);
  console.log(`--> ${quickSuccess ? success : failure}`);

  console.time("Merge Sort")
  var merged = algos.mergeSort(test[0].slice());
  console.timeEnd("Merge Sort")
  var mergeSucess = arraysAreEqual(merged, test[1]);
  console.log(`--> ${mergeSucess ? success : failure}`);
}

function makeBigTest(lowerBound, upperBound) {
  var bigTest = [];
  var randomizer = randomizerWithBound(lowerBound, upperBound);
  for (var i = 0; i < 175000; i++) {
    bigTest[i] = randomizer();
  }
  return bigTest;
}

function randomizerWithBound(lowerBound, upperBound) {
  var randomizer = function () {
    return Math.floor(Math.random() * (upperBound - lowerBound + 1)) + lowerBound;
  }
  return randomizer;
}


var tests =
[
  [[1, 2, 3, 4], [1, 2, 3, 4]],
  [[4, 3, 2, 1], [1, 2, 3, 4]],
  [[2, 4, 3, 2, 1], [1, 2, 2, 3, 4]],
  [[4, -3, 12, 1], [-3, 1, 4, 12]],
  [[], []],
  [[1], [1]],
  [[-1], [-1]],
  [[1, 1, 1, 1], [1, 1, 1, 1]],
  [makeBigTest(-99, 99)]
]

// testAll(tests[8]);
tests.forEach(testAll);
