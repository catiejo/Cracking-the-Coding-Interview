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
