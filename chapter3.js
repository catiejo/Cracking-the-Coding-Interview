// 3.1
/*
There are three ways I can think of to implement multiple stacks with a single array.

Most simply, you could just divide the array into n sections (where n is the number
of stacks you want). Then you push elements to their associated sections. The problem
here is that once a stack is full, you're SOL.

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
