/**************************HELPERS + CLASSES**************************/
class Node {
  constructor (name) {
    this.name = name;
    this.children = [];
  }
}

Node.prototype.addChildren = function(children) {
  this.children = children;
}
/*********************************************************************/

// 4.1
function routeExistsBetween(node1, node2) {
  var q1 = [node1], q2 = [node2];
  var lewis, clark; // Explorers. Get it?

  while (q1.length != 0 || q2.length != 0) {
    lewis = q1.pop();
    clark = q2.pop();
    if (lewis === clark || lewis.hasOwnProperty('seenByClark') || clark.hasOwnProperty('seenByLewis')) {
      return true;
    }
    lewis.seenByLewis = "Seen By Lewis";
    clark.seenByClark = "Seen By Clark";
    q1 = lewis.children.filter((child) => !child.hasOwnProperty('seenByLewis')).concat(q1);
    q2 = clark.children.filter((child) => !child.hasOwnProperty('seenByClark')).concat(q2);
  }
  return false;
}


console.log(routeExistsBetween(lady, tramp));
console.log(routeExistsBetween(lady, villain));
