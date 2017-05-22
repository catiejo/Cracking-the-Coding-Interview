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
    nodesByIndex[i] = new BinaryNode(a[i].id);
  }
  a.forEach( function (node) {
    nodesByIndex[node.id].left = node.left == null ? null : nodesByIndex[node.left];
    nodesByIndex[node.id].right = node.right == null ? null : nodesByIndex[node.right];
  });
  // Assumes root is at the start of the list.
  return nodesByIndex[0];
}

class BinaryNode {
  constructor (value) {
    this.value = value;
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
