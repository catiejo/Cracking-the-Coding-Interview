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

Node.prototype.setNext = function(next) {
  this.next = next;
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
    if (runner2 == null || !nodesAreEqual(runner1, runner2)) {
      logNode("Runner1", runner1);
      logNode("Runner2", runner2);
      return false;
    }
    runner1 = runner1.next;
    runner2 = runner2.next;
  }
  return true;
}

function nodesAreEqual(n1, n2) {
  return n1.data == n2.data;
}

function logNode(name, node) {
  console.log(`Node: ${name}`);
  if (node == null) {
    console.log(`--is null.`);
    return;
  }
  console.log(`--data = ${node.data}`);
  console.log(`--prev = ${node.prev}`);
  console.log(`--next = ${node.next}`);
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

var test1 = [makeNodesFromArray([1, 2, 2, 3, 4]), makeNodesFromArray([1, 2, 3, 4])];
var test2 = [makeNodesFromArray([1, 1, 1, 1]), makeNodesFromArray([1])];
var test3 = [makeNodesFromArray([1, 2, 3, 4]), makeNodesFromArray([1, 2, 3, 4])];
var test4 = [makeNodesFromArray([]), makeNodesFromArray([])];
var test5 = [makeNodesFromArray([1, 2, 3, 4, 4, 4, 4, 4]), makeNodesFromArray([1, 2, 3, 4])];
var tests = [test1, test2, test3, test4, test5];
tests.forEach(function (test, index, array) {
  removeDupes(test[0]);
  var result = listsAreEqual(test[0], test[1]);
  console.log(`test${index + 1}: ${result}`);
});
