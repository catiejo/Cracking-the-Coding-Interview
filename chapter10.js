// 10.1
function sortedMerge(a1, a2) {
  var ptr1 = findLength(a1) - 1, ptr2 = findLength(a2) - 1;
  var endPtr = ptr1 + ptr2 + 1;
  var sortedValue;
  while (ptr2 >= 0) {
    if (a1[ptr1] > a2[ptr2]) {
      sortedValue = a1[ptr1];
      ptr1--;
    } else {
      sortedValue = a2[ptr2];
      ptr2--;
    }
    a1[endPtr] = sortedValue;
    endPtr--;
  }
}

function findLength(a) {
  var length = 0;
  while (a[length] != null) {
    length++;
  }
  return length;
}

// 10.1 Tests
var test1 = [[1, 2, 3, 4, null, null, null, null], [5, 6, 7, 8], [1, 2, 3, 4, 5, 6, 7, 8]];
var test2 = [[1, 3, 4, null, null, null, null], [5, 6, 9, 10, null], [1, 3, 4, 5, 6, 9, 10]];
var test3 = [[5, 6, 7, 8, null, null, null, null], [1, 2, 3, 4], [1, 2, 3, 4, 5, 6, 7, 8]];
var test4 = [[1, 3, 5, 7, null, null, null, null], [2, 4, 6, 8], [1, 2, 3, 4, 5, 6, 7, 8]];
var test5 = [[1, 2, 3, 4, null, null, null, null], [1, 2, 3, 4], [1, 1, 2, 2, 3, 3, 4, 4]];
var test6 = [[1, 2, 3, 4, null, null, null, null, null, null], [1, 2, 3, 4], [1, 1, 2, 2, 3, 3, 4, 4, null, null]];
var test7 = [[1, null], [2], [1, 2]];
var tests = [test1, test2, test3, test4, test5, test6, test7];
tests.forEach(function (test, index, array) {
  sortedMerge(test[0], test[1]);
  var result = arraysAreEqual(test[0], test[2]);
  console.log(`test${index + 1}: ${result}`);
  if (!result) {
    console.log(`--a1: ${test[0]}`);
    console.log(`--a2: ${test[1]}`);
    console.log(`--expected result: ${test[2]}`);
  }
});

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
