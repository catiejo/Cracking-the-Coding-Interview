function rotateImage(img) {
  var width = Math.sqrt(img.length);
  if (width != Math.floor(width)) {
    throw new Error("Image is not square");
  }
  var numberOfRings = Math.ceil( width / 2.0);
  for (var i = 0; i < numberOfRings; i++) {
    rotateRing(img, width, i);
  }
  return img;
}

function rotateRing(img, width, ringNumber) {
  for (var i = 0; i < width - 1 - ringNumber; i++) {
    rotatePixels(img, width, ringNumber, i);
  }
}

function rotatePixels(img, width, ringNumber, ringOffset) {
  var top = getIndex(width, ringNumber, ringOffset, SIDE.TOP);
  var bottom = getIndex(width, ringNumber, ringOffset, SIDE.BOTTOM);
  var left = getIndex(width, ringNumber, ringOffset, SIDE.LEFT);
  var right = getIndex(width, ringNumber, ringOffset, SIDE.RIGHT);
  var tmp = img[top];
  img[top] = img[left];
  img[left] = img[bottom];
  img[bottom] = img[right];
  img[right] = tmp;
}

function getIndex(width, ringNumber, ringOffset, side) {
  var x = ringNumber + ringOffset;
  var y = ringNumber;
  switch (side) {
    case SIDE.TOP:
      break;
    case SIDE.BOTTOM:
      x = width - x - 1;
      y = width - y - 1;
      break;
    case SIDE.LEFT:
      var tmp = x;
      x = y;
      y = width - tmp - 1;
      break;
    case SIDE.RIGHT:
      var tmp = x;
      x = width - y - 1;
      y = tmp;
      break;
  }
  return y * width + x;
}

var SIDE = {
  "TOP": 0,
  "LEFT": 1,
  "RIGHT": 2,
  "BOTTOM": 3
};

var initial3 =
[
  1, 2, 3,
  4, 5, 6,
  7, 8, 9
];

var expected3 =
[
  7, 4, 1,
  8, 5, 2,
  9, 6, 3
];

var initial5 =
[
  1, 2, 3, 4, 5,
  6, 7, 8, 9, 10,
  11, 12, 13, 14, 15,
  16, 17, 18, 19, 20,
  21, 22, 23, 24, 25
];

var expected5 =
[
  21, 16, 11, 6, 1,
  22, 17, 12, 7, 2,
  23, 18
]


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

function testRotate(tests) {
  console.log("***** Test *****");
  tests.forEach(function(test) {
    var initial = test[0];
    var expected = test[1];
    var actual = rotateImage(initial);
    var areEqual = arraysAreEqual(actual, expected);
    console.log(`3x3 test: ${areEqual}`);
    if (!areEqual) {
      console.log(`actual: \n ${actual}`);
      console.log(`expected: \n ${expected}`);
    }
  });
}

function testGetIndex(width, ringNumber, ringOffset, side, expected) {
  var actual = getIndex(width, ringNumber, ringOffset, side);
  if (actual != expected) {
    console.log(`expected = ${expected} and actual is ${actual}`);
  }
}

testRotate([[initial, expected]]);
testGetIndex(3, 0, 0, SIDE.TOP, 0);
testGetIndex(3, 0, 0, SIDE.BOTTOM, 8);
testGetIndex(3, 0, 0, SIDE.LEFT, 6);
testGetIndex(3, 0, 0, SIDE.RIGHT, 2);
