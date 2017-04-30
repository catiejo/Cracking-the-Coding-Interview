/**************************HELPERS + CLASSES**************************/
class Node {
  constructor (data, next) {
    this.data = data;
    this.next = next;
  }
}

Node.prototype.equals = function (node) {
  return this.data == node.data;
}

Node.prototype.log = function(name) {
  console.log(`${name} | data = ${this.data}`);
}

Node.prototype.deleteNext = function() {
  if (this.next != null) {
    this.next = this.next.next;
  }
}

class LinkedList {
  constructor (head) {
    this.head = head;
    this.end = head;
    while (this.end.next != null) {
      this.end = this.end.next;
    }
  }
}

LinkedList.prototype.add = function (node) {
  this.end.next = node;
  this.end = this.end.next;
}

LinkedList.prototype.equals = function(list) {
  var runner1 = this.head;
  var runner2 = list.head;
  while (runner1 != null || runner2 != null) {
    if (runner2 == null || runner1 == null || !runner1.equals(runner2)) {
      if (runner1 != null) {
        runner1.log("Runner1");
      } else {
        console.log("Node: Runner1 is null!");
      }
      if (runner2 != null) {
        runner2.log("Runner2");
      } else {
        console.log("Node: Runner2 is null!");
      }
      return false;
    }
    runner1 = runner1.next;
    runner2 = runner2.next;
  }
  return true;
}

LinkedList.createFromArray = function (a) {
  var node = new Node(null, null), nextNode = null, lastIndex = a.length - 1;
  for (var i = a.length - 1; i >= 0; i--) {
    node = new Node(a[i], nextNode);
    nextNode = node;
  }
  return new LinkedList(node);
}

LinkedList.prototype.toString = function () {
  var string = "";
  var runner = this.head;
  while (runner != null) {
    string += runner.data + " --> ";
    runner = runner.next;
  }
  string += "null";
  return string;
}
/*********************************************************************/

// 2.1
function removeDupes(list) {
  var check = list.head, runner, runnerUp;
  while (check != null) {
    runner = check;
    while (runner.next != null) {
      if (check.data == runner.next.data) {
        runner.deleteNext();
      } else {
        // Only move to next node if it's not a duplicate.
        runner = runner.next;
      }
    }
    check = check.next;
  }
  return list;
}

// 2.1 Tests
console.log("***** 2.1 *****");
var tests1 =
[
  [LinkedList.createFromArray([1, 2, 2, 3, 4]), LinkedList.createFromArray([1, 2, 3, 4])],
  [LinkedList.createFromArray([1, 1, 1, 1]), LinkedList.createFromArray([1])],
  [LinkedList.createFromArray([1, 2, 3, 4]), LinkedList.createFromArray([1, 2, 3, 4])],
  [LinkedList.createFromArray([]), LinkedList.createFromArray([])],
  [LinkedList.createFromArray([1, 2, 3, 4, 4, 4, 5, 4, 1, 3, 3, 2]), LinkedList.createFromArray([1, 2, 3, 4, 5])]
]
tests1.forEach(function (test, index, array) {
  var result = removeDupes(test[0]).equals(test[1]);
  console.log(`2.1 test${index + 1}: ${result}`);
});

// 2.5
function sumList(num1, num2) {
  var answer = new LinkedList(new Node(0, null));
  var sum, carry = 0, runner1 = num1.head, runner2 = num2.head;
  while (runner1 != null || runner2 != null || carry != 0) {
    var value1 = 0, value2 = 0;
    if (runner1 != null) {
      value1 = runner1.data;
      runner1 = runner1.next;
    }
    if (runner2 != null) {
      value2 = runner2.data;
      runner2 = runner2.next;
    }
    sum = value1 + value2 + carry;
    answer.add(new Node(sum % 10, null));
    carry = Math.floor(sum/10.0);
  }
  answer.head = answer.head.next;
  return answer;
}

// 2.5 Tests
console.log("***** 2.5 *****");
var tests5 =
[
  [LinkedList.createFromArray([7, 1, 6]), LinkedList.createFromArray([5, 9, 2]), LinkedList.createFromArray([2, 1, 9])],
  [LinkedList.createFromArray([7, 1, 6]), LinkedList.createFromArray([5, 9, 4]), LinkedList.createFromArray([2, 1, 1, 1])],
  [LinkedList.createFromArray([2, 1, 9]), LinkedList.createFromArray([0]), LinkedList.createFromArray([2, 1, 9])],
  [LinkedList.createFromArray([9, 9, 9]), LinkedList.createFromArray([9, 9, 9]), LinkedList.createFromArray([8, 9, 9, 1])],
  [LinkedList.createFromArray([0]), LinkedList.createFromArray([0]), LinkedList.createFromArray([0])]
]
tests5.forEach(function (test, index, array) {
  var answer = sumList(test[0], test[1]);
  var result = answer.equals(test[2]);
  console.log(`2.5 test${index + 1}: ${result}`);
});
