// 1.1 First Stab
function stringIsUnique(str) {
  var charSet = {};
  var i, len, ch;
  for (i = 0, len = str.length; i < len; i++) {
    ch = str.charAt(i);
    if (charSet[ch] != undefined) {
      return false;
    }
    charSet[ch] = 1;
  }
  return true;
}

// 1.1 Using a set
function stringIsUnique2(str) {
  var charSet = new Set();
  var i, len, ch;
  for (i = 0, len = str.length; i < len; i++) {
    charSet.add(str.charAt(i));
  }
  return charSet.size == str.length;
}

// 1.1 Without additional data structures
function stringIsUnique3(str) {
  var marker = 0;
  var len = str.length;
  var i, ch;
  while (marker < len - 1) {
    ch = str.charAt(marker);
    for (i = marker + 1; i < len; i++) {
      if (ch == str.charAt(i)) {
        return false;
      }
    }
    marker++;
  }
  return true;
}

// 1.1 Tests
console.log("***** 1.1 *****");
var tests = ["hello", "abc", " ", " :D ", "abc123#$% ijk)(*&^"];
tests.forEach(function(test) {
  console.log("\"" + test + "\": " + stringIsUnique(test));
  console.log("\"" + test + "\": " + stringIsUnique2(test));
  console.log("\"" + test + "\": " + stringIsUnique3(test));
});

//TODO: sort characters using O(nlogn) sorting algorithm.

// 1.2 First Stab
function getMap(str) {
  var charMap = new Map();
  var i, len, ch;
  for (i = 0, len = str.length; i < len; i++) {
    ch = str.charAt(i);
    if (!charMap.has(ch)) {
      charMap.set(ch, 0);
    }
    charMap.set(ch, charMap.get(ch) + 1);
  }
  return charMap;
}
function stringsArePermutations(str1, str2) {
  if (str1.length != str2.length) {
    return false;
  }
  var map1 = getMap(str1);
  var map2 = getMap(str2);
  var i, len, ch;
  for (i = 0, len = str1.length; i < len; i++) {
    if (map1[str1.charAt(i)] != map2[str1.charAt(i)]) {
      return false;
    }
  }
  return true;
}

// 1.2 Tests
console.log("***** 1.2 *****");
var tests = [["banana", "ananab"], ["abc", " "], ["abc123#$% ijk)(*&^", "abc"]];
tests.forEach(function(test) {
  console.log("\"" + test[0] + "\" and \"" + test[1] + "\": " + stringsArePermutations(test[0], test[1]));
});

// 1.3 First Stab
function URLify(str) {
  var url = "";
  var len, i, ch;
  for (i = 0, len = str.length; i < len; i++) {
    ch = str.charAt(i);
    if (ch == ' ') {
      url += "%20";
    } else {
      url += ch;
    }
  }
  return url;
}

// 1.3 in place
// Strings in js are apparently immutable, so there isn't a clear way to do this in-place.
function URLify2(str) {
  return str.replace(/ /g, "%20");
}

// 1.3 Tests
console.log("***** 1.3 *****");
var tests = ["hello there", "abc", " ", "", "hello  there"];
tests.forEach(function(test) {
  console.log("\"" + test + "\": " + URLify(test));
  console.log("\"" + test + "\": " + URLify2(test));
});

// 1.4 First Stab
// Good questions to ask with this type of question:
// * Does case matter?
// * Spaces don't normally count in palindromes. Do they count here?
function palindromePermutation(str) {
  // Remove spaces and capital letters
  var possiblePalindrome = str.toLowerCase().replace(/ /g, "");
  var map = getMap(possiblePalindrome);
  var numberOfOddEntries = 0
  map.forEach(function(value, key, map) {
    if (value % 2 != 0) {
      numberOfOddEntries++;
    }
  });
  return numberOfOddEntries <= 1;
}

// 1.4 using Array.every
function palindromePermutation2(str) {
  // Remove spaces and capital letters
  var possiblePalindrome = str.toLowerCase().replace(/ /g, "");
  var map = getMap(possiblePalindrome);
  var numberOfOddEntries = 0
  var palArray = Array.from(map.values());
  var isPalindrome = palArray.every(function(value, index, array) {
    if (value % 2 != 0) {
      numberOfOddEntries++;
    }
    return numberOfOddEntries <= 1;
  });
  return isPalindrome;
}

// 1.4 Tests
console.log("***** 1.4 *****");
var tests = ["Tact coa", "abc"];
tests.forEach(function(test) {
  console.log("\"" + test + "\": " + palindromePermutation(test));
  console.log("\"" + test + "\": " + palindromePermutation2(test));
});

// 1.5 First Stab
// Things I learned in this problem:
// * Calling charAt() with an invalid index returns the empty string
// * substring() still works with invalid indices
// * substring()'s end argument is optional, and defaults to the end of the string
// * substring() is start (inclusive) to end (exclusive)
// * substring() is start (inclusive) to end (exclusive)
// * This algorithm is using the Levenshtein distance definition
function isOneAway(str1, str2) {
  var shorter, longer, i;
  if (str1.length > str2.length) {
    longer = str1;
    shorter = str2;
  } else {
    longer = str2;
    shorter = str1;
  }
  if (longer.length - shorter.length > 1) {
    // Avoid running the loop if there's no way the strings are equal
    return false;
  }
  for (i = 0; i < longer.length; i++) {
    if (shorter.charAt(i) != longer.charAt(i)) {
      if (longer.length == shorter.length) {
        // Treat as a character replace
        return (shorter.substring(i + 1) == longer.substring(i + 1))
      } else {
        // Treat as a charcter insertion into the longer string
        return (shorter.substring(i) == longer.substring(i + 1));
      }
    }
  }
  return true;
}

// 1.5 Related problem (not from the book)
// Find the (Levenshtein) edit distance between two strings.
function stringEditDistance(str1, str2) {
  var shorter, longer, i;
  if (str1.length > str2.length) {
    longer = str1;
    shorter = str2;
  } else {
    longer = str2;
    shorter = str1;
  }
  for (i = 0; i < longer.length; i++) {
    if (shorter.charAt(i) != longer.charAt(i)) {
      if (longer.length == shorter.length) {
        // Treat as a character replace
        return 1 + stringEditDistance(shorter.substring(i + 1), longer.substring(i + 1))
      } else {
        // Treat as a charcter insertion into the longer string
        return 1 + stringEditDistance(shorter.substring(i), longer.substring(i + 1));
      }
    }
  }
  return 0;
}

// TODO: function that returns words (in a given dictionary) that are closest..
// * create a try
// * when you traverse the try, you branch out
//     c
//  a    o
// b t  w
//
// cob -> cab, cow
// cb -> cab
// crow ->
//
// distanceLookup(trie, word, errorBudget)
// c, cob, 1
// a, ob, 1
// b, b, 0 => insert cab in results
// t, b, 0 => do nothing
// o, ob, 1
// w, b, 1 => insert cow in results
//
// c, cb, 1
// a, b, 1
// b, , 0 => /
// b, b, 0 => cab
// t, , 0 => /
// t, b, 0 => /
//
// c, crow, 1
// ...
// o, row, 1
// w, ow, 0 => /
// w, row, 0 => /
// o, ow, 0
// w, w, 0 => cow

// 1.5 Tests
console.log("***** 1.5 *****");
var tests = [["yay", "yayay"], ["banana", "canana"], ["abc", "def"],
  ["ccc", "cccc"], ["cccc", "caccc"], ["abcd", "aecd"],
  ["mango", "mango"], ["cat", "cow"], ["brick", "houses"],
  ["abc", "abcd"], ["abcd", "bcd"], ["banana", "cananb"]];
tests.forEach(function(test) {
  console.log("\"" + test[0] + "\" and \"" + test[1] + "\": " + isOneAway(test[0], test[1]));
  console.log("\"" + test[0] + "\" and \"" + test[1] + "\": " + stringEditDistance(test[0], test[1]));
});

// 1.6
// Assumption: Uppercase/lowercase are treated differently. ie: AAa becomes A2a1
function compressString(str) {
  var compressedString = "";
  var i, len, count;
  var currentChar = "";
  for (i = 0, len = str.length + 1; i < len; i++) {
    if (str.charAt(i) != currentChar) {
      compressedString += (currentChar == "") ? "" : currentChar + count;
      currentChar = str.charAt(i);
      count = 0;
    }
    count++;
  }
  return (compressedString.length < str.length) ? compressedString : str;
}

// 1.6 Tests
console.log("***** 1.6 *****");
var tests = ["aaaaaaaaa", "aaabbbbcddd", "", "abc"];
tests.forEach(function(test) {
  console.log(`\"${test}\": ${compressString(test)}`);
});

// 1.7
// Assumptions:
// * Array is square (NxN)
// * N = 1 byte, and so N must be divisible by 4 (since a pixel is 4 bytes)
// * Image is passed as a 2-dimensional array.
// Things I learned in this problem:
// * non-primitive data types are passed by reference by default, not value
// * if you want to pass an array by value, use array.slice()
function rotateImage(img) {
  var pixPos, pix, rotatedPixPos, rotatedPix, startPos, i, len;
  for (i = 0, len = img[0].length; i < len - 1; i++) {
    startPos = [0, i];
    pixPos = startPos;
    pix = img[pixPos[0]][pixPos[1]];
    do {
      rotatedPixPos = getRotatedPixPos(pixPos, len);
      var tmp = img[rotatedPixPos[0]][rotatedPixPos[1]];
      img[rotatedPixPos[0]][rotatedPixPos[1]] = pix;
      pixPos = rotatedPixPos;
      pix = tmp;
    } while (!arraysAreEqual(pixPos, startPos));
  }
  return img;
}
function getRotatedPixPos(pixPos, imgSize) {
  return [pixPos[1], imgSize - 1 - pixPos[0]];
}
function arraysAreEqual(current, start) {
  var xEqual = current[0] == start[0];
  var yEqual = current[1] == start[1];
  return xEqual && yEqual;
}

// 1.7 Tests
console.log("***** 1.7 *****");
var twoxtwo =
[[[1, 2, 3, 4], [5, 6, 7, 8]],
 [[9, 10, 11, 12], [13, 14, 15, 16]]];
var rotatedTwoxTwo =
[[[9, 10, 11, 12], [1, 2, 3, 4]],
 [[13, 14, 15, 16], [5, 6, 7, 8]]];
console.log(`2x2 test: ${rotateImage(twoxtwo) == rotatedTwoxTwo}`);
