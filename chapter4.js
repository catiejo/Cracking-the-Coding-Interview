/**************************HELPERS + CLASSES**************************/
var colors = require('colors');
var success = "SUCCESS".green;
var failure = "FAIL".red;

class Node {
  constructor () {
    this.incoming = [];
    this.outgoing = [];
  }
}

Node.prototype.addIncomingEdges = function(edges) {
  this.incoming = edges;
}

Node.prototype.addOutgoingEdges = function(edges) {
  this.outgoing = edges;
}

function convertToGraph(a) {
  var nodesByIndex = [];
  // Make nodes
  for (var i = 0; i < a.length; i++) {
    nodesByIndex[i] = new Node();
  }
  // Add incoming/outgoing
  for (var i = 0; i < a.length; i++) {
    var incoming = []
    a[i].incoming.forEach( function (index) {
      incoming.push(nodesByIndex[index]);
    });
    nodesByIndex[i].addIncomingEdges(incoming);

    var outgoing = []
    a[i].outgoing.forEach( function (index) {
      outgoing.push(nodesByIndex[index]);
    });
    nodesByIndex[i].addOutgoingEdges(outgoing);
  }
  // Assumes point a and b are at the beginning and end of list, respectively
  return [nodesByIndex[0], nodesByIndex[nodesByIndex.length - 1]];
}

function convertToTree(a) {
  var nodesByIndex = [];
  for (var i = 0; i < a.length; i++) {
    var value = a[i].value ? a[i].value : a[i].id;
    nodesByIndex[i] = new BinaryNode(value);
  }
  a.forEach( function (node) {
    if (node.left != null) {
      nodesByIndex[node.id].left = nodesByIndex[node.left];
      nodesByIndex[node.left].parent = nodesByIndex[node.id];
    }
    if (node.right != null) {
      nodesByIndex[node.id].right = nodesByIndex[node.right];
      nodesByIndex[node.right].parent = nodesByIndex[node.id];
    }
  });
  // Assumes root is at the start of the list.
  return nodesByIndex[0];
}

class BinaryNode {
  constructor (value) {
    this.value = value;
    this.left = null;
    this.right = null;
    this.parent = null;
  }
}

class LinkedNode {
  constructor (value) {
    this.value = value;
    this.next = null;
  }
}

LinkedNode.prototype.prettyPrint = function() {
  var curNode = this, prettified = "";
  while (curNode != null) {
    prettified += `${curNode.value} --> `;
    curNode = curNode.next;
  }
  prettified = prettified.substring(0, prettified.length - 5);
  console.log(prettified);
}
/*********************************************************************/

// 4.1
function routeExists(node1, node2) {
  var q1 = [node1], q2 = [node2];
  var lewis, clark; // Explorers. Get it?

  while (q1.length != 0 && q2.length != 0) {
    lewis = q1.pop();
    clark = q2.pop();
    if (lewis === clark || lewis.hasOwnProperty('seenByClark') || clark.hasOwnProperty('seenByLewis')) {
      return true;
    }
    lewis.seenByLewis = true;
    clark.seenByClark = true;
    q1 = lewis.outgoing.filter((child) => !child.hasOwnProperty('seenByLewis')).concat(q1);
    q2 = clark.incoming.filter((child) => !child.hasOwnProperty('seenByClark')).concat(q2);
  }
  return false;
}

// 4.1 Tests
console.log("***** 4.1 *****".cyan);
var graph = [
  {id: 0, incoming: [1, 2], outgoing: [1, 2, 3]},
  {id: 1, incoming: [0], outgoing: [0, 4]},
  {id: 2, incoming: [0, 4], outgoing: []},
  {id: 3, incoming: [0], outgoing: []},
  {id: 4, incoming: [1], outgoing: [2, 5]},
  {id: 5, incoming: [4, 7], outgoing: [7]},
  {id: 6, incoming: [7], outgoing: []},
  {id: 7, incoming: [5], outgoing: [5, 6]},
];
var path = convertToGraph(graph);
console.log("There should be a path from 0 to 7");
console.log((routeExists(path[0], path[1]) ? `--${success}` : `--${failure}`));
path = convertToGraph(graph);
console.log("There should not be a path from 7 to 0");
console.log((!routeExists(path[1], path[0]) ? `--${success}` : `--${failure}`));

// 4.2
function createBST(a) {
  var middle = Math.floor((a.length - 1) / 2);
  var root = new BinaryNode(a[middle]);
  growTree(a, 0, middle - 1, root);
  growTree(a, middle + 1, a.length - 1, root);
  return root;
}

function growTree(a, start, end, node) {
  if (start > end) {
    return;
  }
  var middle = Math.floor((start + end) / 2);
  var child = new BinaryNode(a[middle]);
  if (child.value < node.value) {
    console.log(`${node.value} has ${child.value} on the left`);
    node.left = child;
  } else {
    console.log(`${node.value} has ${child.value} on the right`);
    node.right = child;
  }
  growTree(a, start, middle - 1, child);
  growTree(a, middle + 1, end, child);
}


// 4.2 Tests
console.log("***** 4.2 *****".cyan);
var bst = createBST([1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12]);

// 4.3
function listOfDepths(root) {
    var currentTreeNode;
    var linkedLists = [new LinkedNode(root.value)];
    var currentDepth = [root], nextDepth = [];

    while (currentDepth.length != 0) {
        currentTreeNode = currentDepth.pop();
        if (currentTreeNode.hasOwnProperty('left') && currentTreeNode.left != null) {
            nextDepth.push(currentTreeNode.left);
        }
        if (currentTreeNode.hasOwnProperty('right') && currentTreeNode.right != null) {
            nextDepth.push(currentTreeNode.right);
        }
        if (currentDepth.length == 0 && nextDepth.length != 0) {
            linkedLists.push(getLinkedFromArray(nextDepth));
            currentDepth = nextDepth.reverse();
            nextDepth = [];
        }
  }
  return linkedLists;
}

function getLinkedFromArray(a) {
  var head = new LinkedNode(a[0].value), curNode = head;
  for (var i = 1; i < a.length; i++) {
    curNode.next = new LinkedNode(a[i].value);
    curNode = curNode.next;
  }
  return head;
}

// 4.3 Tests
console.log("***** 4.3 *****".cyan);
var lists = listOfDepths(bst);
lists.forEach( (l) => l.prettyPrint() );

// 4.4
function checkIfBalanced(root) {
  return balanceChecker(root) != -1;
}

function balanceChecker(root) {
    if (root == null) {
      return 0;
    }
    var leftHeight = balanceChecker(root.left);
    var rightHeight = balanceChecker(root.right);
    if (leftHeight == -1 || rightHeight == -1) {
      return -1;
    } else {
      var balanced = Math.abs(leftHeight - rightHeight) <= 1;
      return balanced ? 1 + Math.max(leftHeight, rightHeight) : -1;
    }
}

// 4.4 Tests
console.log("***** 4.4 *****".cyan);

var unbalanced = [
  {id: 0, left: 1, right: 4},
  {id: 1, left: 2, right: null},
  {id: 2, left: 3, right: null},
  {id: 3, left: null, right: null},
  {id: 4, left: null, right: 5},
  {id: 5, left: null, right: 6},
  {id: 6, left: null, right: null}
];
unbalanced = convertToTree(unbalanced);

var balanced = [
  {id: 0, left: 1, right: 4},
  {id: 1, left: 2, right: 3},
  {id: 2, left: null, right: null},
  {id: 3, left: null, right: null},
  {id: 4, left: 5, right: null},
  {id: 5, left: null, right: null}
];
balanced = convertToTree(balanced);

console.log("Testing an unbalanced tree...");
console.log((checkIfBalanced(unbalanced) == false ? `--${success}: 'checkIfBalanced' says the tree isn't balanced.\n` : `--${failure}: 'checkIfBalanced' says the tree is balanced :(\n`));
console.log("Now testing a balanced tree...");
console.log((checkIfBalanced(balanced) == true ? `--${success}: 'checkIfBalanced' says the tree is balanced.\n` : `--${failure}: 'checkIfBalanced' says the tree isn't balanced :(\n`));
console.log("To be safe, let's check an empty tree...");
console.log((checkIfBalanced(new BinaryNode(0)) == true ? `--${success}: 'checkIfBalanced' says the tree is balanced.\n` : `--${failure}: 'checkIfBalanced' says the tree isn't balanced :(\n`));

// 4.5
class BSTValidator {
  constructor (min, max, isBroken) {
    this.min = min;
    this.max = max;
    this.isBroken = isBroken;
  }
}

function verifyBST(root) {
  var treeValidator = getValidator(root);
  return !treeValidator.isBroken;
}

function getValidator(node) {
  var isBroken = false;
  var leftValidator, rightValidator;
  if (node.right != null) {
    rightValidator = getValidator(node.right);
    if (node.value > rightValidator.min || rightValidator.isBroken) {
      isBroken = true;
    }
  }
  if (node.left != null) {
    leftValidator = getValidator(node.left);
    if (node.value < leftValidator.max || leftValidator.isBroken) {
      isBroken = true;
    }
  }
  var min = leftValidator ? leftValidator.min : node.value;
  var max = rightValidator ? rightValidator.max : node.value;
  return new BSTValidator(min, max, isBroken);
}

// 4.5 Tests
var invalid = [
  {id: 0, value: 9, left: 1, right: 2,},
  {id: 1, value: 5, left: 3, right: 4},
  {id: 2, value: 10, left: 5, right: 6},
  {id: 3, value: 4, left: null, right: null},
  {id: 4, value: 12, left: 7, right: 8},
  {id: 5, value: 8, left: null, right: null},
  {id: 6, value: 15, left: null, right: null},
  {id: 7, value: 6, left: null, right: null},
  {id: 8, value: 13, left: null, right: null}
];
invalid = convertToTree(invalid);

var valid = [
  {id: 0, value: 9, left: 1, right: 2,},
  {id: 1, value: 5, left: 3, right: 4},
  {id: 2, value: 10, left: null, right: 5},
  {id: 3, value: 4, left: null, right: null},
  {id: 4, value: 7, left: 6, right: 7},
  {id: 5, value: 15, left: null, right: null},
  {id: 6, value: 6, left: null, right: null},
  {id: 7, value: 8, left: null, right: null}
];
valid = convertToTree(valid);

console.log("***** 4.5 *****".cyan);
console.log("Let's start by testing the bst from section 4.2...");
console.log((verifyBST(bst) == true ? `--${success}: bonafide BST!\n` : `--${failure}: Unfortunately, verfyBST does not think this is a valid tree. :(\n`));
console.log("And a slightly more complex, but still correct BST...");
console.log((verifyBST(valid) == true ? `--${success}: bonafide BST!\n` : `--${failure}: Unfortunately, verfyBST does not think this is a valid tree. :(\n`));
console.log("And an invalid BST...");
console.log((verifyBST(invalid) == false ? `--${success}: Nothing gets past this algo!\n` : `--${failure}: Unfortunately, verfyBST thinks this is a valid tree. :(\n`));
console.log("Finally, the case of a single node...");
console.log((verifyBST(new BinaryNode(7)) == true ? `--${success}: bonafide BST!\n` : `--${failure}: Unfortunately, verfyBST does not think this is a valid tree. :(\n`));

// 4.6
function findSuccessor(root) {
  var minFromSubTree = findMin(root.right);
  var successor;
  if (minFromSubTree != null && root.parent != null) {
    successor = minFromSubTree.value < root.parent.value ? minFromSubTree : root.parent;
  } else {
    successor = root.parent == null ? minFromSubTree : root.parent;
  }
  return successor;
}

function findMin(root) {
  if (root == null || root.left == null) {
    return root;
  }
  return findMin(root.left);
}

// 4.6 Tests
var successorTest;
console.log("***** 4.6 *****".cyan);
console.log("BST #1");
successorTest = findSuccessor(bst);
console.log((successorTest.value == 7 ? `--${success}: correctly returned 7!\n` : `--${failure}: expected 7 but got ${successorTest.value}. :(\n`));
console.log("BST #2");
successorTest = findSuccessor(valid);
console.log((successorTest.value == 10 ? `--${success}: correctly returned 10!\n` : `--${failure}: expected 10 but got ${successorTest.value}. :(\n`));
console.log("Finally, the case of a single node...");
console.log((findSuccessor(new BinaryNode(7)) == null ? `--${success}: handled edgecase; returned null!\n` : `--${failure}: expected null but got ${successorTest} :(\n`));
