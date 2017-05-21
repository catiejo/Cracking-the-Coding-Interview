/**************************HELPERS + CLASSES**************************/
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
  return [nodesByIndex[0], nodesByIndex[nodesByIndex.length - 1]];
}

class BinaryNode {
  constructor (value) {
    this.value = value;
  }
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
console.log(routeExists(path[0], path[1]));
path = convertToGraph(graph);
console.log(routeExists(path[1], path[0]));

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
function prettyPrintTree(root) {
  var layers = [[root.value], [root.left.value, root.right.value]];
  var currentQueue = [root.right, root.left], nextQueue = [];
  var currentNode;

  while (currentQueue.length > 0) {
    currentNode = currentQueue.pop();
    if (currentNode.hasOwnProperty('left')) {
      nextQueue.unshift(currentNode.left);
    }
    if (currentNode.hasOwnProperty('right')) {
      nextQueue.unshift(currentNode.right);
    }
    if (currentQueue.length == 0) {
      var newLayer = [];
      nextQueue.forEach( function (node) {
        newLayer.push(node.value);
      });
      if (newLayer.length > 0) {
        layers.push(newLayer.reverse());
      }
      currentQueue = nextQueue.slice();
      nextQueue.length = [];
    }
  }
  layers.forEach(function (layer) {
    console.log(`[${layer}]`);
  });
}

var bst = createBST([1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12]);
prettyPrintTree(bst);
