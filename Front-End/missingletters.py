import random

def remove_letters(text, num_letters=3):
    """Remove random letters from the text."""
    text_list = list(text)
    indices = sorted(random.sample(range(len(text)), num_letters), reverse=True)
    for index in indices:
        if text_list[index].isalnum():  # ensure we only remove alphanumeric characters
            text_list[index] = '_'
    return ''.join(text_list), {text[i] for i in indices if text[i].isalnum()}

def get_user_input(prompt):
    """Get user input with a prompt."""
    return input(prompt)

def main_game():
    # Gather user details
    name = get_user_input("Please enter your name: ")
    phone_number = get_user_input("Please enter your phone number: ")
    address = get_user_input("Please enter your address: ")

    # Create puzzles
    name_puzzle, name_missing = remove_letters(name)
    phone_puzzle, phone_missing = remove_letters(phone_number)
    address_puzzle, address_missing = remove_letters(address)

    # Function to ask the user to solve the puzzle
    def solve_puzzle(puzzle, missing_letters, detail_type):
        print(f"\nHere is your {detail_type} with some missing letters: {puzzle}")
        attempts = 3
        while attempts > 0:
            answer = get_user_input("Please fill in the missing letters: ")
            if set(answer) == missing_letters:
                print("Correct! Well done.")
                return
            else:
                attempts -= 1
                print(f"That's not quite right. You have {attempts} attempts left.")

    # Challenge the user to fill in the missing letters
    solve_puzzle(name_puzzle, name_missing, "name")
    solve_puzzle(phone_puzzle, phone_missing, "phone number")
    solve_puzzle(address_puzzle, address_missing, "address")

if __name__ == "__main__":
    main_game()
