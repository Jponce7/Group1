#Activity 1

import pygame
import random

pygame.init()

# game variables and constants
Width = 600
Height = 600

#colours for the game

white = (255, 255, 255)
black = (0, 0, 0)
grey = (128, 128, 128)
green = (0, 255, 0)
blue = (0, 0, 255)
grey2 = (192,192,192)
grey3 = (90, 90, 90)

#frame rate and timer
fps = 60
timer = pygame.time.Clock()

#rows and coloumns for the board
rows = 2
cols = 4

#array from correct guesses
correct = [[0,0,0,0],
           [0,0,0,0]]
options_list =[]
spaces = []
used =[]
over = []
Test = ['Address', 'Name1', 'Name2', 'Phone1']
new_board = True

first_guess = False
second_guess = False

first_guess_num = 0
second_guess_num = 0
score = 0
matches = 0

game_over = False

#create screen
screen = pygame.display.set_mode((Width, Height))
pygame.display.set_caption('Card Matching Game')
title_font = pygame.font.SysFont('Times New Roman', 50)
small_font = pygame.font.SysFont('Times New Roman', 23)
button_font = pygame.font.SysFont('Times New Roman', 18)

def draw_backgrounds():
    top_menu = pygame.draw.rect(screen, black, (0, 0, Width, 100))
    title_text = title_font.render('CARD MATCHING GAME', True, white)
    screen.blit(title_text, (10, 20))

    board_space = pygame.draw.rect(screen, grey, [0, 100, Width, Height - 200], 0)

    bottom_menu = pygame.draw.rect(screen, black, [0, Height - 100, Width, 100], 0)

    restart_button = pygame.draw.rect(screen, grey2, [11, Height-40, 85, 30], 0, 5)
    restart_text = button_font.render('Restart', True, black)
    screen.blit(restart_text, (27, 565))

    #score_button = pygame.draw.rect(screen, grey2, [511, Height - 35, 85, 30], 0, 5)
    score_text = button_font.render(f'Correct Guesses: {score}', True, white)
    screen.blit(score_text, (460, 565))

    return restart_button

def draw_board():
    global rows, cols
    board_list = []

    for i in range(cols):
        for j in range(rows):
            piece = pygame.draw.rect(screen, white, [i * 145 +25, j * 180 + 147, 120, 120], 0, 4)
            board_list.append(piece)
            #piece_text = small_font.render(f'{spaces[i * rows + j]}', True, grey3)
            #screen.blit(piece_text, (i * 145 + 52, j * 180 + 195))

    for r in range(rows):
        for c in range(cols):
            if correct[r][c] == 1:
                pygame.draw.rect(screen, green, [c * 145 + 20, r * 180 + 142, 127, 127], 6, 4)
                piece_text = small_font.render(f'{spaces[c * rows + r]}', True, black)
                screen.blit(piece_text, (c * 145 + 52, r * 180 + 195))

    return board_list

def generate_board():
    global options_list
    global spaces
    global used
    global Test
    global over

    for item in range(rows * cols //2):
        options_list.append(item)


    for item in range(rows * cols):

        rand_num = random.randint(0, len(options_list)-1)

        options_list[rand_num] = random.choice(Test)

        if options_list[rand_num] in over:
            piece = options_list[rand_num]
            Test.remove(options_list[rand_num])
        else:
            piece = options_list[rand_num]
            over.append(piece)


        #keeping track of everything that was assigned inside the board
        spaces.append(piece)

        if piece in used:
            used.remove(piece)
            options_list.remove(piece)
        else:
            used.append(piece)

def check_guesses(first, second):
    global spaces
    global correct
    global score
    global matches


    if spaces[first] == spaces[second]:
        col_1 = first // rows
        col_2 = second // rows
        row_1 = first - (first // rows * rows)
        row_2 = second - (second // rows * rows)

        if correct[row_1][col_1] == 0 and correct[row_2][col_2] == 0:
            correct[row_1][col_1] = 1
            correct[row_2][col_2] = 1
            score += 1
            matches += 1


#main game loop

running = True
while running:
    #helps regulate the game
    timer.tick(fps)
    screen.fill(white)

    #creating new board for the game
    if new_board:
        generate_board()
        new_board = False

    #function to create all things in window
    restart = draw_backgrounds()

    #function to draw the board
    board = draw_board()

    if first_guess and second_guess:
        check_guesses(first_guess_num, second_guess_num)
        pygame.time.delay(1500)
        first_guess = False
        second_guess = False

    for event in pygame.event.get():

        #if quit button is pressed, exit
        if event.type == pygame.QUIT:
            running = False

        if event.type ==pygame.MOUSEBUTTONDOWN:
            for i in range(len(board)):
                button = board[i]
                if not game_over:
                    if button.collidepoint(event.pos) and not first_guess:
                        first_guess = True
                        first_guess_num = i

                    if button.collidepoint(event.pos) and not second_guess and first_guess and i != first_guess_num:
                        second_guess = True
                        second_guess_num = i

            if restart.collidepoint(event.pos):
                options_list = []
                spaces = []
                used = []
                over = []
                Test = ['Address', 'Name1', 'Name2', 'Phone1']
                new_board = True
                score = 0
                matches = 0

                first_guess = False
                second_guess = False

                correct = [[0,0,0,0],
                           [0,0,0,0]]

                game_over = False

    if correct == [[1,1,1,1],
                   [1,1,1,1]] :
        game_over = True
        winner = pygame.draw.rect(screen, green, [10, Height - 350, Width -20, 100], 0, 5)
        winnerText = title_font.render("You won!", True, black)
        screen.blit(winnerText, (200, Height -325))


    if first_guess:
        piece_text = small_font.render(f'{spaces[first_guess_num]}', True, blue)
        location = (first_guess_num // rows* 145 + 52, (first_guess_num -(first_guess_num // rows * rows)) * 180 +195)
        screen.blit(piece_text, location)

    if second_guess:
        piece_text = small_font.render(f'{spaces[second_guess_num]}', True, blue)
        location = (second_guess_num // rows* 145 + 52, (second_guess_num -(second_guess_num // rows * rows)) * 180 +195)
        screen.blit(piece_text, location)



    pygame.display.flip()
pygame.quit()