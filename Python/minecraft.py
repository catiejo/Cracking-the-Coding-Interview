import random

class Game:
    def __init__(self, w, h, num_mines):
        self.guess_count = 0
        self.width = w
        self.height = h
        self.mine_field = [[0] * w for i in range(h)]
        self.playing_field = [['?'] * w for i in range(h)]
        mine_indices = random.sample(range(w*h), k=num_mines)
        for index in mine_indices:
            y, x = divmod(index, w)
            self.mine_field[y][x] = -1
            self.__increment_neighbors(x, y)
        self.show_playing_field()

    def make_guess(self, x, y):
        if  not (0 <= x < self.width - 1) or not (0 <= y < self.height - 1):
            print ("Guess out of bounds! Please keep your guesses between (0-{}, 0-{}).".format(self.width - 1, self.height - 1))
            return
        answer = self.mine_field[y][x]
        still_alive = True
        if answer == -1:
            still_alive = False
        elif answer == 0:
            self.__reveal_neighbors(x, y)
        self.show_playing_field()
        self.guess_count += 1

        return still_alive

    def show_playing_field(self):
        border = "-" * (2 * self.width + 3)
        print(str(border))
        for row in self.playing_field:
            print('| ' + ' '.join(row) + ' |')
        print(str(border))

    def __place_bomb(self, x, y):
        self.mine_field[y][x] = -1
        self.__update_blast_zone(x, y, 1)

    def __move_bomb(self, old_x, old_y, new_x, new_y):
        self.mine_field[old_y][old_x] = 0
        self.__update_blast_zone(old_x, old_y, -1)
        self.__place_bomb(new_x, new_y)

    def __update_playing_field(self, x, y):
        if self.mine_field[y][x] >= 0:
            self.playing_field[y][x] = self.mine_field[y][x]
        else:
            self.playing_field[y][x] = '*'

    def __get_neighbors(self, x, y):
        start_x = max(0, x - 1)
        end_x = min(self.width - 1, x + 1)
        start_y = max(0, y - 1)
        end_y = min(self.height - 1, x + 1)
        x_coords = range(start_x, end_x + 1)
        y_coords = range(start_y, end_y + 1)
        return [(x, y) for x in x_coords for y in y_coords]

    def __update_blast_zone(self, x, y, inc):
        neighbors = self.__get_neighbors(x, y)
        for col, row in neighbors:
                if self.mine_field[row][col] != -1:
                    self.mine_field[row][col] += inc

    def __reveal_neighbors(self, x, y):
        neighbors = self.__get_neighbors(x, y)
        visited = set(neighbors)
        while len(neighbors):
            x, y = neighbors.pop()
            self.__update_playing_field(x, y)
            if self.mine_field[y][x] == 0:
                new_neighbors = set(self.__get_neighbors(x, y))
                neighbors += list(new_neighbors.difference(visited))
                visited.update(new_neighbors)
