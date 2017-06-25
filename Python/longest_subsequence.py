'''
Writing code to compute substring from dynamic programming array mentioned in this video:
https://youtu.be/NnD96abizww
'''

def longest_subsequence(a, b):
    sub_array = [[0] * (len(a) + 1) for i in range(len(b) + 1)]
    for row in range(1, len(sub_array)):
        for col in range(1, len(sub_array[0])):
            if a[col - 1] == b[row - 1]:
                sub_array[row][col] = sub_array[row - 1][col - 1] + 1
            else:
                sub_array[row][col] = max(sub_array[row - 1][col], sub_array[row][col - 1])
    print_array(sub_array, a, b)
    subseq = get_subseq(sub_array, a, b)
    return (sub_array[len(b)][len(a)], subseq)

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

def print_array(array, col_marker, row_marker):
    print("     ", "  ".join(col_marker))
    for i, row in enumerate(array):
        prefix = row_marker[i - 1] if i > 0 else " "
        print(prefix, row)

#class Runner:
#    def run_test():
print(longest_subsequence("abcdaf", "acbcf"))