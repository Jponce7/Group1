#include <stdio.h>
#define MAX_PATH_LENGTH 70  // Maximum path length for the game
#define MIN_PATH_LENGTH 10  // Minimum path length
#define MULTIPLE_OF 5       // Path length must be a multiple of this value
#define MAX_LIVES 10        // Maximum lives for the player

// Structure to hold player information
typedef struct {
    char symbol;                        // Player's character symbol
    int lives;                          // Player's lives
    int treasuresFound;                 // Number of treasures found
    int history[MAX_PATH_LENGTH];       // History of positions visited
} PlayerInfo;

// Structure to hold game settings
typedef struct {
    int maxMoves;                       // Maximum number of moves allowed
    int pathLength;                     // Length of the game path
    int bombs[MAX_PATH_LENGTH];         // Bomb placements along the path
    int treasures[MAX_PATH_LENGTH];     // Treasure placements along the path
} GameInfo;

// Function to reset player history to -1 (empty state)
void resetHistory(int history[], int length) {
    for (int i = 0; i < length; i++) {
        history[i] = -1;
    }
}

// Function to prompt the user for player configuration
void configurePlayer(PlayerInfo *player) {
    printf("Enter a single character to represent the player: ");
    scanf(" %c", &player->symbol);

    do {
        printf("Set the number of lives (1-%d): ", MAX_LIVES);
        scanf("%d", &player->lives);
    } while (player->lives < 1 || player->lives > MAX_LIVES);

    player->treasuresFound = 0;  // Initialize treasures found
    resetHistory(player->history, MAX_PATH_LENGTH);  // Reset move history
}

// Function to validate if a number is a multiple of a given value
int isMultipleOf(int value, int divisor) {
    return (value % divisor == 0);
}

// Function to prompt the user for game configuration
void configureGame(GameInfo *game, int playerLives) {
    do {
        printf("Set the path length (between %d and %d, multiple of %d): ",
               MIN_PATH_LENGTH, MAX_PATH_LENGTH, MULTIPLE_OF);
        scanf("%d", &game->pathLength);
    } while (game->pathLength < MIN_PATH_LENGTH || 
             game->pathLength > MAX_PATH_LENGTH || 
             !isMultipleOf(game->pathLength, MULTIPLE_OF));

    int maxAllowedMoves = (game->pathLength * 75) / 100;

    do {
        printf("Set the maximum number of moves (at least %d, no more than %d): ",
               playerLives, maxAllowedMoves);
        scanf("%d", &game->maxMoves);
    } while (game->maxMoves < playerLives || game->maxMoves > maxAllowedMoves);

    printf("Enter the bomb placements (0 or 1) for %d positions:\n", game->pathLength);
    for (int i = 0; i < game->pathLength; i++) {
        scanf("%d", &game->bombs[i]);
    }

    printf("Enter the treasure placements (0 or 1) for %d positions:\n", game->pathLength);
    for (int i = 0; i < game->pathLength; i++) {
        scanf("%d", &game->treasures[i]);
    }
}

// Function to display the game configuration summary
void displayConfiguration(const PlayerInfo *player, const GameInfo *game) {
    printf("\n--- Game Configuration Summary ---\n");
    printf("Player Symbol: %c\n", player->symbol);
    printf("Player Lives: %d\n", player->lives);
    printf("Max Moves: %d\n", game->maxMoves);
    printf("Path Length: %d\n", game->pathLength);

    printf("Bomb Positions: ");
    for (int i = 0; i < game->pathLength; i++) {
        printf("%d", game->bombs[i]);
    }
    printf("\n");

    printf("Treasure Positions: ");
    for (int i = 0; i < game->pathLength; i++) {
        printf("%d", game->treasures[i]);
    }
    printf("\n");
}

int main() {
    PlayerInfo player;
    GameInfo game;

    printf("Welcome to the Bombs and Treasures Game!\n\n");

    // Configure player and game settings
    configurePlayer(&player);
    configureGame(&game, player.lives);

    // Display the summary of the configurations
    displayConfiguration(&player, &game);

    printf("\nGame setup is complete. Get ready to play!\n");

    return 0;
}
