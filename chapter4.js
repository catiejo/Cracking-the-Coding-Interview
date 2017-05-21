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
function createRomance() {
  var lady = new Node();
  var tramp = new Node();
  var kiss = new Node();

  var ladyPup1 = new Node();
  var ladyPup2 = new Node();
  var ladyPup3 = new Node();
  var trampPup1 = new Node();
  var trampPup2 = new Node();

  lady.addOutgoingEdges([ladyPup1, ladyPup2, ladyPup3]);
  lady.addIncomingEdges([ladyPup1, ladyPup2]);

  tramp.addOutgoingEdges([trampPup1, trampPup2]);
  tramp.addIncomingEdges([trampPup1]);

  ladyPup1.addOutgoingEdges([lady, kiss]);
  ladyPup1.addIncomingEdges([lady]);
  ladyPup2.addOutgoingEdges([lady]);
  ladyPup2.addIncomingEdges([lady, kiss]);
  ladyPup3.addIncomingEdges([lady]);

  trampPup1.addOutgoingEdges([tramp]);
  trampPup1.addIncomingEdges([tramp, kiss]);
  trampPup2.addIncomingEdges([tramp]);

  kiss.addOutgoingEdges([ladyPup2, trampPup1]);
  kiss.addIncomingEdges([ladyPup1]);
  return [lady, tramp];
}

var romance = createRomance();
console.log(routeExists(romance[0], romance[1]));
romance = createRomance();
console.log(routeExists(romance[1], romance[0]));


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
