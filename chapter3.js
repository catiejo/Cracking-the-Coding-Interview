require('colors');
var success = "SUCCESS".green;
var fail = "OOPS".red;

// 3.1
/*
There are three ways I can think of to implement multiple stacks with a single array.

Most simply, you could just divide the array into n sections (where n is the number
of stacks you want). Then you push elements to their associated sections. The problem
here is that once a stack is full, you're SOL. The back of the book recommends a
circular array with flexible boundaries. Eg, if the last stack is full and one of
the other stacks isn't, you shift the elements in the next stack over by 1 (and
reduce its capacity by one) to accommodate the other stack. However, in my mind this
makes pushing to a full array a really expensie operation. Also, the indices are
modulo-ed so you can extend a stack that starts in the back of the array by over-
flowing to the beginning (hence, circuluar).

Second, you could interleave the indexes. So for example, pushing to stack 1 would
push to indices 0, 3, 6, etc, stack 2 to indices 1, 4, 7, and stack 3 to 2, 5, 8.
The benefit of this approach is that individual stack elements don't have to know
about their predecessor, and you don't have to shift elements around if the array
grows larger at some point. A drawback is that you could end up with a lot of empty
slots that could be a memory burden (e.g. if stack 2 is 3x as long as either of
the other stacks, 2/3 of the array would have two nulls for every element, which is
not an efficient use of memory.)

The final option would be to use a linked-list-style structure within an array.
So you would maintain pointers to the index that contains the head of each stack,
and whenever an element is popped, that object would have a prevIndex property
that tells you where to find it's previous member in the array. This doesn't
really have a huge advantage over just using three linked lists in my mind, though.
*/

// 3.2
class MinStack {
  constructor() {
    this.stack = [];
    this.mins = [];
  }
}

MinStack.prototype.push = function (item) {
  this.stack.push(item);
  if (this.peekMins() == null || item <= this.peekMins()) {
    this.mins.push(item);
  }
}

MinStack.prototype.pop = function () {
  var pop = this.stack.pop();
  if (pop != null && pop == this.peekMins()) {
    this.mins.pop();
  }
  return pop != null ? pop : null;
}

MinStack.prototype.peekMins = function () {
  return this.mins.length > 0 ? this.mins[this.mins.length - 1] : null;
}

MinStack.prototype.peek = function () {
  return this.stack.length > 0 ? this.stack[this.stack.length - 1] : null;
}

MinStack.prototype.size = function () {
  return this.stack.length;
}

MinStack.prototype.isEmpty = function () {
  return this.stack.length == 0;
}

// 3.2 Tests
var minStackTests = [[0, 1, 2, 3], [3, 2, 1, 0], [1, 2, 1, 2, 1], [0, -1, 15, -4, 0]];
console.log("\n***** 3.2 *****".cyan);
minStackTests.forEach( function (test) {
  console.log(`Testing minStack with [${test}]`.magenta)
  var minStack = new MinStack();
  test.forEach( (num) => {
    minStack.push(num);
    console.log(`--Pushing ${num}. Min is ${minStack.peekMins()}.`);
  });
  console.log("---------------------");
  while (!minStack.isEmpty()) {
    var pop = minStack.pop();
    console.log(`--Popping ${pop}. Min is ${minStack.peekMins()}.`);
  }
});

// 3.3
class SetOfStacks {
  constructor (stackSize) {
    if (stackSize <= 0) {
      throw new Error("Error: stack size must be at least 1.");
    }
    this.setOfStacks = [];
    this.stackSize = stackSize;
    this.curStack = -1;
  }
}

SetOfStacks.prototype.push = function (item) {
  if (this.setOfStacks.length == 0 || this.setOfStacks[this.curStack].length == this.stackSize) {
    this.setOfStacks.push([]);
    this.curStack++;
  }
  this.setOfStacks[this.curStack].push(item);
}

SetOfStacks.prototype.pop = function () {
  var pop = this.curStack >= 0 ? this.setOfStacks[this.curStack].pop() : null;
  if (this.curStackIsEmpty()) {
    this.curStack = Math.max(this.curStack - 1, -1);
    this.setOfStacks.pop(); // Returns undefined if already empty.
  }
  return pop;
}

SetOfStacks.prototype.popAt = function (index) {
  if (!this.setOfStacks[index]) {
    return null;
  }
  var pop = this.setOfStacks[index].pop();
  if (this.setOfStacks[index].length == 0) {
    this.setOfStacks.splice(index, 1);
    this.curStack = Math.max(this.curStack - 1, -1);
  }
  return pop;
}

SetOfStacks.prototype.isEmpty = function () {
  return this.setOfStacks.length == 0;
}

SetOfStacks.prototype.curStackIsEmpty = function () {
  return this.curStack < 0 || this.setOfStacks[this.curStack].length == 0;
}

// 3.3 Tests
console.log("\n***** 3.2 *****".cyan);
console.log(`Testing SetOfStacks with [0-9]`.magenta)
var stack = new SetOfStacks(3);
for (var i = 0; i < 10; i++) {
  stack.push(i);
}
console.log(`Completed stack is: ${JSON.stringify(stack.setOfStacks)}`);
console.log("---------------------");
while (!stack.isEmpty()) {
  var pop = stack.pop();
  console.log(`--Popping ${pop}.`);
}
console.log(`Testing popAt with [0-12]`.magenta);
var stack = new SetOfStacks(3);
for (var i = 1; i < 14; i++) {
  stack.push(i);
}
console.log(`Completed stack is: ${JSON.stringify(stack.setOfStacks)}`);
console.log("---------------------");
console.log(`--Popping from stack 4: ${stack.popAt(4)}.`);
console.log(`--Popping from stack 4: ${stack.popAt(4)}.`);
console.log(`--Popping from stack 3: ${stack.popAt(3)}.`);
console.log(`--Popping from stack 2: ${stack.popAt(2)}.`);
console.log(`--Popping from stack 1: ${stack.popAt(1)}.`);
console.log(`Altered stack is: ${JSON.stringify(stack.setOfStacks)}`);
console.log("---------------------");
console.log("Clearing the rest of the stack...")
while (!stack.isEmpty()) {
  var pop = stack.pop();
  console.log(`--Popping ${pop}.`);
}
console.log(`--Popping from empty stack of stacks: ${stack.pop()}.`);

// 3.4
class MyQueue {
  constructor() {
    this.enqStack = new MinStack(); // Using already-implemented MinStack b/c why not.
    this.deqStack = new MinStack();
  }
}

MyQueue.prototype.enqueue = function (item) {
  this.enqStack.push(item);
}

MyQueue.prototype.dequeue = function () {
  if (this.deqStack.isEmpty()) {
    this.flipStacks();
  }
  return this.deqStack.pop();
}

MyQueue.prototype.peek = function () {
  if (this.deqStack.isEmpty()) {
    this.flipStacks();
  }
  return this.deqStack.peek();
}

MyQueue.prototype.flipStacks = function () {
  while (!this.enqStack.isEmpty()) {
    this.deqStack.push(this.enqStack.pop());
  }
}

MyQueue.prototype.size = function () {
  return this.deqStack.size() + this.enqStack.size();
}

// 3.4 Tests
console.log("\n***** 3.2 *****".cyan);
var queue = new MyQueue();
for (var i = 0; i < 10; i++) {
  console.log(`Queueing ${i}`.green);
  queue.enqueue(i);
}
for (var i = 0; i < 7; i++) {
  console.log(`Dequeueing ${queue.dequeue()}`.red);
}
for (var i = 10; i < 15; i++) {
  console.log(`Queueing ${i}`.green);
  queue.enqueue(i);
}
while (queue.size() > 0) {
  console.log(`Dequeueing ${queue.dequeue()}`.red);
}
