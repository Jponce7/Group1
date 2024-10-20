import pygame
import functions

# Initialize Pygame
pygame.init()

# Screen dimensions
screen_width = 800
screen_height = 600

# Colors
white = (255, 255, 255)
black = (0, 0, 0)

# Set up the screen
screen = pygame.display.set_mode((screen_width, screen_height))
pygame.display.set_caption("Reveal the Path")

# Game loop
running = True
while running:
    for event in pygame.event.get():
        if event.type == pygame.QUIT:
            running = False

    # Fill the screen with white
    screen.fill(white)

    # Draw the path and checkpoints
    functions.draw_path(screen)
    functions.draw_checkpoints(screen)

    # Update the display
    pygame.display.flip()

# Quit Pygame
pygame.quit()
