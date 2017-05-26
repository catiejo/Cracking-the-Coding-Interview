require('colors');
var success = "SUCCESS".green;
var fail = "OOPS".red;

// 5.1
function fitBits(M, N, i, j) {
  var mask = ~(((1 << (j - i + 1)) - 1) << i);
  return (mask & N) | (M << i);
}

// 5.1 Tests
console.log("\n***** 5.1 *****".cyan);
function dec2bin(dec){
    return (dec >>> 0).toString(2);
}
var test = fitBits(7, 32, 1, 3);
console.log(`Trying to fit 7 into 32 between bits 1 and 3`);
console.log(`--Expected output: 101110 (46).`);
console.log(`--Actual output: ${dec2bin(test)} (${test}).`);
console.log(`--${test == 46 ? success : fail}`);

// 5.2
function binaryFraction(frac) {
  var binary = "0.";
  for (var i = 1; i <= 32; i++) {
    var partial = 1 / Math.pow(2, i);
    if (frac - partial >= 0) {
      frac -= partial;
      binary += "1";
      if (frac == 0) {
        return binary;
      }
    } else {
      binary += "0";
    }
  }
  return "ERROR";
}

// 5.2 Tests
console.log("\n***** 5.2 *****".cyan);
console.log(`Binary of 0.5 is "${binaryFraction(0.5)}"`);
console.log(`--${binaryFraction(0.5) == "0.1" ? success : fail}`);
console.log(`Binary of 0.75 is "${binaryFraction(0.75)}"`);
console.log(`--${binaryFraction(0.75) == "0.11" ? success : fail}`);
console.log(`Binary of 0.625 is "${binaryFraction(0.625)}"`);
console.log(`--${binaryFraction(0.625) == "0.101" ? success : fail}`);
console.log(`Binary of 0.72 is "${binaryFraction(0.72)}"`);
console.log(`--${binaryFraction(0.72) == "ERROR" ? success : fail}`);

// 5.3
function flipBitToWin(n) {
  var level1 = 0, level2 = 0, max = 1;
  while (n != 0) {
    if (n % 2) {
      level1++;
      level2++;
    } else {
      level2 = ++level1;
      level1 = 0;
    }
    max = Math.max(level2, max);
    n >>>= 1;
  }
  return max;
}

console.log("\n***** 5.3 *****".cyan);
console.log(`Winning length of 11011101111 (1775) is 8`);
console.log(`--${flipBitToWin(1775) == 8 ? success : fail + ": got " + flipBitToWin(1775)}`);
console.log(`Winning length of 11001 (25) is 3`);
console.log(`--${flipBitToWin(25) == 3 ? success : fail + ": got " + flipBitToWin(25)}`);
console.log(`Winning length of 1111 (15) is 4`);
console.log(`--${flipBitToWin(15) == 4 ? success : fail + ": got " + flipBitToWin(15)}`);
console.log(`Winning length of 0 is 1`);
console.log(`--${flipBitToWin(0) == 1 ? success : fail + ": got " + flipBitToWin(0)}`);
console.log(`Winning length of 1110111 (119) is 7`);
console.log(`--${flipBitToWin(119) == 7 ? success : fail + ": got " + flipBitToWin(119)}`);
console.log(`Winning length of ${dec2bin(-2)} (-2) is 32`);
console.log(`--${flipBitToWin(-2) == 32 ? success : fail + ": got " + flipBitToWin(-2)}`);
console.log(`Winning length of ${dec2bin(-29)} (-29) is 28`);
console.log(`--${flipBitToWin(-29) == 28 ? success : fail + ": got " + flipBitToWin(-29)}`);

// 5.4
function nextNum(n) {
  var min = findNextSmallest(n);
  var max = findNextLargest(n);
  return [min, max];
}

function findNextSmallest(n) {
  // Check that the number is in bounds
  if (n <= 0 || n >= Number.MAX_SAFE_INTEGER) {
    return n;
  }
  var bits = n, lsmb = 0, num1s = 0;
  while (bits != 0) {
    if ((bits & 1) == 0 && (bits & 2) == 2) {
      break;
    } else if ((bits & 1) == 1) {
      num1s++;
    }
    lsmb++;
    bits >>>= 1;
  }
  if (lsmb == 0 || num1s != lsmb) {
    n -= Math.pow(2, lsmb + 1);
    n += Math.pow(2, lsmb);
    n &= ~0 << lsmb;
    n += (Math.pow(2, num1s) - 1) << (lsmb - num1s);
  }
  return n;
}

function findNextLargest(n) {
  // Check that the number is in bounds
  if (n <= 0 || n >= Number.MAX_SAFE_INTEGER) {
    return n;
  }
  var bits = n, lsmb = 0, num1s = 0;
  while (bits != 0) {
    if ((bits & 1) == 1) {
      if ((bits & 2) == 0) {
        break;
      }
      num1s++;
    }
    lsmb++;
    bits >>>= 1;
  }
  n -= Math.pow(2, lsmb);
  n += Math.pow(2, lsmb + 1);
  n &= ~0 << lsmb;
  n+= (Math.pow(2, num1s) - 1);
  return n;
}

console.log("\n***** 5.4 *****".cyan);
nextNumTests = [0, 1, 22, 25, 7, 1775, Number.MAX_SAFE_INTEGER];
nextNumTests.forEach( function (num) {
  console.log(`Testing with "${dec2bin(num)}" (${num})`.magenta);
  var result = nextNum(num);
  console.log(`--Next smallest is "${dec2bin(result[0])}" (${result[0]})`);
  console.log(`--Next largest is "${dec2bin(result[1])}" (${result[1]})`);
});

// 5.6
function convert(a, b) {
  var diff = a^b;
  var numDiffs = 0;
  for (var i = diff; i != 0; i&=(i-1)) {
    numDiffs++;
  }
  return numDiffs;
}

// 5.6 Tests
console.log("\n***** 5.6 *****".cyan);
var convertTests = [[29, 15], [0, ~0], [7, 7]];
convertTests.forEach( function (test) {
  console.log(`Number of differences between ${dec2bin(test[0])} and ${dec2bin(test[1])} = ${convert(test[0], test[1])}`)
});

// 5.7
function swapBits(num) {
  // MAX_SAFE_INTEGER = Math.pow(2, 54) -1, MIN_SAFE_INTEGER = -(Math.pow(2, 54) - 1)
  return ((num & 0x15555555555555) << 1) | ((num & 0x2AAAAAAAAAAAAA) >>> 1);
}

// 5.7 Tests
console.log("\n***** 5.7 *****".cyan);
var convertTests = [0b10000111, 0b1111, 0b101010];
convertTests.forEach( function (test) {
  console.log(`Swap of ${dec2bin(test)} = ${dec2bin(swapBits(test))}`);
});

// 5.8
function drawLine(screen, width, x1, x2, y) {
  var startByte = Math.floor(x1 / 4), endByte = Math.floor(x2 / 4);
  var startBit = x1 % 4;
  var endBit = 4 - ((x2 % 4) + 1);
  var row = width * y;
  for (var i = startByte + 1; i < endByte; i++) {
    screen[row + i] = 0xFF;
  }
  screen[row + startByte] = (0xFF << startBit) & 0xFF;
  screen[row + endByte] = (0xFF >>> endBit) & 0xFF;
}
