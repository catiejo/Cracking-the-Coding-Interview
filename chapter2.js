// 2.1
Node = {
  var data;
  var next;
  var prev;
}

function Node.prototype.delete() {
  if (this.prev != null) {
    this.prev.next = this.next;
  }
  if (this.next != null {
    this.next.prev = this.prev;
  }
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
