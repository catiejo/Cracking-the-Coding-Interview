'''
Writing code to compute substring from dynamic programming array mentioned in this video:
https://youtu.be/NnD96abizww
'''

def get_subseq(array, a, b):
    a, b = (a, b) if (len(b) + 1) == len(array) else (b, a)
    subseq = ""
    x, y = len(a), len(b)
    while (x, y) != (0, 0):
        if array[y][x] == array[max(0, y - 1)][x]:
            y -= 1
        elif array[y][x] == array[y][max(0, x - 1)]:
            x -= 1
        else:
            subseq += a[x - 1]
            x, y = x - 1, y - 1
    return subseq[::-1]

my_sub_array = \
   [[0, 0, 0, 0, 0, 0, 0], \
    [0, 1, 1, 1, 1, 1, 1], \
    [0, 1, 1, 2, 2, 2, 2], \
    [0, 1, 2, 2, 2, 2, 2], \
    [0, 1, 2, 3, 3, 3, 3], \
    [0, 1, 2, 3, 3, 3, 4]]
    
class Runner:
    def run_test():
        print(get_subseq(my_sub_array, "acbcf", "abcdaf"))        
        print(get_subseq(my_sub_array, "abcdaf", "acbcf"))