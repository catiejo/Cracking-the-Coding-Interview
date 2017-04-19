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

// 1.1 Tests
var tests = ["hello", "abc", " ", " :D ", "abc123#$% ijk)(*&^"];
tests.forEach(function(test) {
  console.log("\"" + test + "\": " + stringIsUnique(test));
});
