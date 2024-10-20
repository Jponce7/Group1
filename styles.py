import pygame

# Fonts
font = pygame.font.Font(None, 36)

# Colors
blue = (0, 0, 255)
black = (0, 0, 0)

def draw_text(screen, text, x, y, color=black):
    rendered_text = font.render(text, True, color)
    screen.blit(rendered_text, (x - rendered_text.get_width() // 2, y - 15))
