/**************************HELPERS + CLASSES**************************/
class Node {
  constructor (name) {
    this.name = name;
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

// 4.1 tests
function createRomance() {
  var lady = new Node("lady");
  var tramp = new Node("tramp");
  var kiss = new Node("kiss");

  var ladyPup1 = new Node("lady's first pup");
  var ladyPup2 = new Node("lady's second pup");
  var ladyPup3 = new Node("lady's third pup");
  var trampPup1 = new Node("tramp's first pup");
  var trampPup2 = new Node("tramp's second pup");

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
console.log(routeExistsBetween(romance[0], romance[1]));
romance = createRomance();
console.log(routeExistsBetween(romance[1], romance[0]));
