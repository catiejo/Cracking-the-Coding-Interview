// 1.1
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
var tests = ["hello", "abc", " ", " :D ", "abc123#$% ijk)(*&^"];
tests.forEach(function(test) {
  console.log("\"" + test + "\": " + stringIsUnique(test));
  console.log("\"" + test + "\": " + stringIsUnique2(test));
  console.log("\"" + test + "\": " + stringIsUnique3(test));
});
