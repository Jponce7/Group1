import pygame
from styles import draw_text, blue

# Checkpoints
checkpoints = [
    {"name": "Home", "x": 50, "y": 50},
    {"name": "Address 1", "x": 250, "y": 150},
    {"name": "Address 2", "x": 450, "y": 250},
    # Add more checkpoints as needed
]

def draw_checkpoints(screen):
    for checkpoint in checkpoints:
        pygame.draw.circle(screen, blue, (checkpoint["x"], checkpoint["y"]), 30)
        draw_text(screen, checkpoint["name"], checkpoint["x"], checkpoint["y"])

def draw_path(screen):
    for i in range(len(checkpoints) - 1):
        pygame.draw.line(screen, (0, 0, 0), (checkpoints[i]["x"], checkpoints[i]["y"]),
                         (checkpoints[i + 1]["x"], checkpoints[i + 1]["y"]), 2)
