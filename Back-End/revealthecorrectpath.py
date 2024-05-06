import random
import time

def show_path(path):
    """
    Displays the sequence of doors.
    
    Args:
    - path (list): A list containing the sequence of doors.
    """
    print("Memorize the sequence of doors:")
    for door in path:
        print("Door", door)
        time.sleep(1)  # Introduce a delay for better user experience

def choose_door():
    """
    Prompts the user to choose a door.
    
    Returns:
    - int: The door number chosen by the user.
    """
    while True:
        try:
            choice = int(input("Enter the number of the correct door: "))
            return choice
        except ValueError:
            print("Please enter a valid door number.")

def main():
    # Define the sequence of doors
    num_doors = 5
    doors = list(range(1, num_doors + 1))
    
    # Shuffle the doors to create a random path
    random.shuffle(doors)
    
    # Show the path to the user
    show_path(doors)
    
    # Clear the screen for better user experience
    print("\n" * 50)
    
    # Get user's input for the sequence of doors
    print("Now choose the correct sequence of doors:")
    user_sequence = []
    for _ in range(num_doors):
        user_choice = choose_door()
        user_sequence.append(user_choice)
    
    # Check if the user's sequence matches the original path
    if user_sequence == doors:
        print("Congratulations! You chose the correct sequence of doors.")
    else:
        print("Sorry, the sequence you chose is incorrect. Better luck next time!")

if __name__ == "__main__":
    main()
