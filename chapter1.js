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

// 1.2 First Stab
function getMap(str) {
  var charMap = {};
  var i, len, ch;
  for (i = 0, len = str.length; i < len; i++) {
    ch = str.charAt(i);
    var count = charMap[ch];
    count = count ? count + 1 : 1;
    charMap[ch] = count;
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
