import random
import copy

class Hat:
    def __init__(self, **kwargs):
        self.contents = []
        for color, count in kwargs.items():
            self.contents.extend([color] * count)

    def draw(self, num_balls):
        if num_balls >= len(self.contents):
            return self.contents

        balls_drawn = random.sample(self.contents, num_balls)
        for ball in balls_drawn:
            self.contents.remove(ball)

        return balls_drawn

def experiment(hat, expected_balls, num_balls_drawn, num_experiments):
    count = 0

    for _ in range(num_experiments):
        hat_copy = copy.deepcopy(hat)
        balls_drawn = hat_copy.draw(num_balls_drawn)

        balls_count = {}
        for ball in balls_drawn:
            balls_count[ball] = balls_count.get(ball, 0) + 1

        match = True
        for color, expected_count in expected_balls.items():
            if balls_count.get(color, 0) < expected_count:
                match = False
                break

        if match:
            count += 1

    probability = count / num_experiments
    return probability