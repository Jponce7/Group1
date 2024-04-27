#include <iostream>
#include <cstdlib>
#include <ctime>
#include <vector>

using namespace std;

// Function to generate a random number between min and max
int getRandomNumber(int min, int max) {
    static const double fraction = 1.0 / (RAND_MAX + 1.0);
    return min + static_cast<int>((max - min + 1) * (rand() * fraction));
}

// Function to display the sequence
void displaySequence(const vector<int>& sequence) {
    for (int color : sequence) {
        cout << color << " ";
    }
    cout << endl;
}

// Function to get user input
vector<int> getUserInput(int numColors) {
    vector<int> userInput;
    cout << "Enter the sequence (separate each color by a space): ";
    for (int i = 0; i < numColors; ++i) {
        int color;
        cin >> color;
        userInput.push_back(color);
    }
    return userInput;
}

// Function to check if user input matches the sequence
bool checkInput(const vector<int>& sequence, const vector<int>& userInput) {
    if (sequence.size() != userInput.size()) {
        return false;
    }
    for (size_t i = 0; i < sequence.size(); ++i) {
        if (sequence[i] != userInput[i]) {
            return false;
        }
    }
    return true;
}

int main() {
    srand(static_cast<unsigned int>(time(nullptr))); // Seed the random number generator

    const int numColors = 4; // Number of colors in the game
    const int maxLevel = 10; // Maximum level of the game

    vector<int> sequence;
    vector<int> userInput;

    bool gameOver = false;
    int level = 1;

    while (!gameOver && level <= maxLevel) {
        cout << "Level " << level << ":" << endl;
        // Generate a random sequence for this level
        sequence.clear();
        for (int i = 0; i < level; ++i) {
            sequence.push_back(getRandomNumber(1, numColors));
        }
        displaySequence(sequence);

        // Get user input
        userInput = getUserInput(level);

        // Check if user input matches the sequence
        if (checkInput(sequence, userInput)) {
            cout << "Correct! Proceed to the next level." << endl;
            level++;
        } else {
            cout << "Incorrect! Game over." << endl;
            gameOver = true;
        }
    }

    if (!gameOver) {
        cout << "Congratulations! You completed all levels!" << endl;
    }

    return 0;
}
