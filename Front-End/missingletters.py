import pygame
import random

pygame.init()

# Game variables and constants
Width = 600
Height = 600

# Colors
white = (255, 255, 255)
black = (0, 0, 0)
grey = (128, 128, 128)
green = (0, 255, 0)
blue = (0, 0, 255)
red = (255, 0, 0)

# Frame rate and timer
fps = 60
timer = pygame.time.Clock()

# Word bank for the game
word_bank = ["PYTHON", "DEVELOPER", "REACT", "JAVASCRIPT", "DATABASE", "FIREBASE"]

# Game states
game_over = False
lives = 5
score = 0
current_word = ''
hidden_word = ''
missing_indices = []
user_input = []
win = False

# Create screen
screen = pygame.display.set_mode((Width, Height))
pygame.display.set_caption('Missing Letters Game')

# Fonts
title_font = pygame.font.SysFont('Times New Roman', 50)
small_font = pygame.font.SysFont('Times New Roman', 30)
button_font = pygame.font.SysFont('Times New Roman', 20)

def draw_background():
    screen.fill(white)
    title_text = title_font.render('Missing Letters Game', True, black)
    screen.blit(title_text, (120, 20))

    bottom_menu = pygame.draw.rect(screen, black, [0, Height - 100, Width, 100], 0)
    score_text = button_font.render(f'Score: {score}', True, white)
    lives_text = button_font.render(f'Lives: {lives}', True, white)
    screen.blit(score_text, (20, 565))
    screen.blit(lives_text, (500, 565))

def draw_word():
    global hidden_word
    word_display = small_font.render(hidden_word, True, black)
    screen.blit(word_display, (Width // 2 - 100, Height // 2 - 50))

def hide_letters(word):
    global missing_indices, hidden_word
    num_missing = random.randint(1, len(word) // 2)
    missing_indices = random.sample(range(len(word)), num_missing)
    hidden_word = ''.join('_' if i in missing_indices else letter for i, letter in enumerate(word))
    return hidden_word

def check_guess(guess):
    global hidden_word, lives, score, win
    correct_guess = False
    updated_hidden_word = list(hidden_word)
    
    for index in missing_indices:
        if current_word[index].lower() == guess.lower():
            updated_hidden_word[index] = current_word[index]
            correct_guess = True

    hidden_word = ''.join(updated_hidden_word)

    if not correct_guess:
        lives -= 1
    else:
        missing_indices[:] = [i for i in missing_indices if hidden_word[i] == '_']

    if lives == 0:
        return 'game_over'
    if "_" not in hidden_word:
        win = True
        score += 1
        return 'win'

    return 'playing'

def restart_game():
    global current_word, hidden_word, missing_indices, lives, win, user_input
    current_word = random.choice(word_bank)
    hidden_word = hide_letters(current_word)
    missing_indices = [i for i in range(len(current_word)) if hidden_word[i] == '_']
    lives = 5
    win = False
    user_input = []

# Initialize the first word
restart_game()

# Main game loop
running = True
while running:
    timer.tick(fps)
    draw_background()
    draw_word()

    for event in pygame.event.get():
        if event.type == pygame.QUIT:
            running = False

        if event.type == pygame.KEYDOWN:
            if event.key == pygame.K_RETURN and user_input:
                guess = user_input[-1]
                result = check_guess(guess)

                if result == 'game_over':
                    game_over = True
                elif result == 'win':
                    restart_game()

            elif event.key == pygame.K_BACKSPACE:
                if user_input:
                    user_input.pop()
            else:
                if event.unicode.isalpha():
                    user_input.append(event.unicode.upper())

    if game_over:
        screen.fill(white)
        game_over_text = title_font.render('Game Over!', True, red)
        screen.blit(game_over_text, (200, Height // 2 - 50))
        pygame.display.flip()
        pygame.time.delay(3000)
        restart_game()
        game_over = False

    # Display the current input guess
    if user_input:
        guess_text = small_font.render(f"Your guess: {user_input[-1]}", True, blue)
        screen.blit(guess_text, (Width // 2 - 100, Height // 2 + 50))

    pygame.display.flip()

pygame.quit()
