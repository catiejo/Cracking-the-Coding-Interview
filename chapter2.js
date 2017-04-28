// 2.1
function Node(data, prev, next) {
  this.data = data;
  this.prev = prev;
  this.next = next;
}

Node.prototype.delete = function () {
  if (this.prev != null) {
    this.prev.next = this.next;
  }
  if (this.next != null) {
    this.next.prev = this.prev;
  }
}

Node.prototype.equals = function (node) {
  return this.data = node.data;
}

Node.prototype.log = function(name) {
  console.log(`Node: ${name}`);
  console.log(`--data = ${this.data}`);
  console.log(`--prev = ${this.prev}`);
  console.log(`--next = ${this.next}`);
}

function removeDupes(node) {
  var check, runner;
  check = node;
  while (check != null) {
    runner = check.next;
    while (runner != null) {
      if (check.data == runner.data) {
        runner.delete();
      }
      runner = runner.next;
    }
    check = check.next;
  }
  return node; //optional
}

// 2.1 Tests
function listsAreEqual(node1, node2) {
  var runner1 = node1;
  var runner2 = node2;
  while (runner1 != null) {
    if (runner2 == null || !runner1.equals(runner2)) {
      runner1.log("Runner1");
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

function makeNodesFromArray(a) {
  var node;
  var nextNode = null;
  a.forEach(function(data) {
    node = new Node(data, null, nextNode);
    if (nextNode != null) {
      nextNode.prev = node;
    }
    nextNode = node;
  });
  return node;
}

var tests =
[
  [makeNodesFromArray([1, 2, 2, 3, 4]), makeNodesFromArray([1, 2, 3, 4])],
  [makeNodesFromArray([1, 1, 1, 1]), makeNodesFromArray([1])],
  [makeNodesFromArray([1, 2, 3, 4]), makeNodesFromArray([1, 2, 3, 4])],
  [makeNodesFromArray([]), makeNodesFromArray([])],
  [makeNodesFromArray([1, 2, 3, 4, 4, 4, 5, 4, 1, 3, 3, 2]), makeNodesFromArray([1, 2, 3, 4, 5])]
]
tests.forEach(function (test, index, array) {
  var result = listsAreEqual(removeDupes(test[0]), test[1]);
  console.log(`test${index + 1}: ${result}`);
});
