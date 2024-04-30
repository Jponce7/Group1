import time

def introduction():
    print("Welcome to the Correct Path Game!")
    time.sleep(1)
    print("You find yourself standing at a crossroad.")
    time.sleep(1)
    print("You must choose the correct path to reach your destination.")
    time.sleep(1)

def choose_path():
    print("\nWhich path will you choose? (1 or 2)")
    time.sleep(1)
    path = input("1. The left path\n2. The right path\n")
    return path

def check_path(path):
    correct_path = "2"
    if path == correct_path:
        print("\nCongratulations! You chose the correct path.")
        time.sleep(1)
        print("You reach your destination safely.")
    else:
        print("\nOh no! You chose the wrong path.")
        time.sleep(1)
        print("You got lost and never reached your destination.")

def play_again():
    choice = input("\nDo you want to play again? (yes or no): ").lower()
    return choice == "yes"

def main():
    while True:
        introduction()
        path = choose_path()
        check_path(path)
        if not play_again():
            print("\nThanks for playing!")
            break

if __name__ == "__main__":
    main()
