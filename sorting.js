/*
Merge Sort
-----------------------------------
Time Complexity Analysis | O(nlogn)
-----------------------------------
The divide() function gets called 2*(n-1) times. This is because it gets called
twice each split (once for each half of the list), and there are n-1 splits to
separate the list into n 1-element lists. In my implementation, the total calls
becomes 2*(n-1) + 1 b/c of the initial call from mergeSort. However, the work for
this function is constant (just computing the middle index, then adding the next
pair of divide() calls to the call stack).

The conquer() algorithm is a bit more complex. Since conquer() is only called
once (as opposed to twice like divide), and there's no initial call, it's only
called n-1 times. It creates 2 subarrays that, over the entire course of mergeSort(),
copies each of the n elements logn times (it copies the array once for each
"level" of depth of sorting, which is logn). It also goes through each of these
arrays once to merge them into a sorted list, which is O(r + l) where r and l are
the lengths of the right and left subarrays. Over the course of the mergeSort(),
this works out to go through every element in the n-element list nlogn times.

One potentially problematic factor is the use of shift() to pop the first element
of the arrays. This has a potential bottleneck with sufficiently long arrays since
the performance could be linear (in order to shift every element over by 1).

Therefore, the time complexity is O(n) + O(nlogn) for divide() and conquer(),
respectively, working out to a final time complexity of O(nlogn).

------------------------------------
Space Complexity Analysis | O(nlogn)
------------------------------------
Divide() does not allocate any space, though it does build up the call stack.
Conquer() allocates a subarray each time it is called with a cumulative size of
O(nlogn). These arrays are all empty by the end of the function, but even so,
depending on how JS handles garbage collection, this could work out to be a lot
of random arrays floating around.

One way to improve my solution is to use a buffer for sorting, rather than
making a bunch of copies (slices) of the array. This would involve adding
a "buffer" argument to divide() that gets passed to conquer(), then using
pointers to iterate through the origianl array, sorting the values into buffer,
then writing those values back into the original array. This would improve the
space complexity to be O(n) as it would have one array for the entire life of
mergeSort().
*/
function mergeSort(a) {
    divide(a, 0, a.length - 1);
    return a;
}

function divide(a, start, end) {
    if (start < end) {
        var middle = Math.floor((start + end) / 2);
        divide(a, start, middle);
        divide(a, middle + 1, end);
        conquer(a, start, end);
    }
}

function conquer(a, start, end) {
    var middle = Math.floor((start + end) / 2);
    var left = a.slice(start, middle + 1);
    var right = a.slice(middle + 1, end + 1);
    var sortedIndex = start;
    while (left.length > 0) {
        var next;
        if (right.length == 0 || left[0] < right[0]) {
            next = left.shift();
        } else {
            next = right.shift()
        }
        a[sortedIndex++] = next;
    }
}

var test = [7, 6, 5, 4, 3, 2, 1];
console.log(mergeSort(test.slice()));
test = [0, 7, 6, 5, 14, 3, 2, 1, 1, 3, 3, 3, 4, 9, 15, 12];
console.log(mergeSort(test.slice()));
