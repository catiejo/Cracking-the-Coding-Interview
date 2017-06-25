import math
import random

class Color:
    HEADER = '\033[95m'
    OKBLUE = '\033[94m'
    OKGREEN = '\033[92m'
    WARNING = '\033[93m'
    FAIL = '\033[91m'
    ENDC = '\033[0m'
    BOLD = '\033[1m'
    UNDERLINE = '\033[4m'

def get_parent(index):
    return index // 2
def get_left(index):
    return (index * 2) + 1
def get_right(index):
    return (index * 2) + 2

class MinHeap:
    """ A simple priority queue that prioritizes by the first element in a tuple.
    The tuple can be of arbitrary length, but must be of type tuple. """
    def __init__(self):
        self.__heap = []
    def __len__(self):
        """ Returns length of heap. """
        return len(self.__heap)
    def push(self, tup):
        """ Push an element onto the heap. Elements with same priority (tup[0])
        have no guaranteed order """
        heap = self.__heap
        heap.append(tup)
        priority = tup[0]
        index = len(heap) - 1
        parent_priority = heap[get_parent(index)][0]
        while index > 0 and priority < parent_priority:
            # Swap the elements
            heap[index], heap[get_parent(index)] = heap[get_parent(index)], heap[index]
            # Move up the heap
            index = get_parent(index)
            priority = heap[index][0]
            parent_priority = heap[get_parent(index)][0]

    def pop(self):
        """ Remove the element with the highest priority (smallest value) """
        heap = self.__heap
        root = heap[0]
        new_root = heap.pop()
        if len(heap):
            heap[0] = new_root
            priority = heap[0][0]
        index = 0
        while index < len(heap):
            # Find child indices
            left_index = get_left(index)
            right_index = get_right(index)
            # Find child priorities
            left_priority = heap[left_index][0] if left_index < len(heap) else math.inf
            right_priority = heap[right_index][0] if right_index < len(heap) else math.inf
            # Figure out which to swap (if any)
            if priority < min(left_priority, right_priority):
                break;
            if left_priority == min(left_priority, right_priority):
                heap[left_index], heap[index] = heap[index], heap[left_index]
                index = left_index
            else:
                heap[right_index], heap[index] = heap[index], heap[right_index]
                index = right_index
        return root

    def peek(self):
        """ View the element with the highest priority (smallest value) """
        return self.__heap[0]

    def is_empty(self):
        """ Checks if the heap is empty. """
        return len(self.__heap) == 0

def test_heap():
    my_heap = MinHeap()

    print("***Generate the Heap***")
    for num in random.sample(range(100), 10):
        print("--adding", num)
        tup = (num, num)
        my_heap.push(tup)

    print("***Culling the Heap***")
    while not my_heap.is_empty():
        value = my_heap.pop()[0]
        print("--removing", value)
        
class QueueWithStacks:
    def __init__(self):
        self.__enq = []
        self.__deq = []
    
    def enqueue(self, item):
        self.__enq.append(item)
    
    def dequeue(self):
        if len(self.__deq) == 0:
            self.__shift_stacks()
        return self.__deq.pop() if len(self.__deq) else None # Could also raise error.
    
    def __shift_stacks(self):
        while len(self.__enq):
            self.__deq.append(self.__enq.pop())
    
    def __len__(self):
        return len(self.__enq) + len(self.__deq)

def test_queue_with_stacks(stack_size):
    my_stack = QueueWithStacks()
    
    for num in range(stack_size):
        print(Color.WARNING, "--enqueueing", num, Color.ENDC)
        my_stack.enqueue(num)
        if num > (stack_size // 2):
            dq = my_stack.dequeue()
            print(Color.OKBLUE, "--dequeueing", dq, Color.ENDC)
    
    while len(my_stack):
        dq = my_stack.dequeue()
        print(Color.OKBLUE, "--dequeueing", dq, Color.ENDC)