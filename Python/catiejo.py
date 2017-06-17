import math

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