import random

# Define the list of information to be recalled
info_list = ["home address", "your school", "phone number", "parents' names", "your name"]

def prompt_user_information():
    user_information = {}
    print("Please provide the following information:")
    for info in info_list:
        user_input = input(f"What is your {info}? ").strip()
        user_information[info] = user_input
    return user_information

def simon_says_game(user_information):
    while True:
        # Shuffle the list of information
        random.shuffle(info_list)
        
        # Initialize a variable to track correct answers
        correct_answers = 0
        
        # Iterate through each item in the shuffled list
        for info in info_list:
            # Print the prompt for the player
            print(f"Simon says, what is your {info}?")
            
            # Get the player's response
            player_response = input().strip().lower()
            
            # Check if the player's response matches the current item
            if player_response == user_information[info].lower():
                print("Correct!\n")
                correct_answers += 1
            else:
                print(f"Sorry, that's incorrect. The correct answer is: {user_information[info]}.\n")
        
        # Check if all items were answered correctly
        if correct_answers == len(info_list):
            print("Congratulations! You've successfully recalled all the information.")
            break
        else:
            print("You missed some information. Let's try again.\n")

# Prompt the user for their personal information
user_info = prompt_user_information()

# Run the Simon Says game
simon_says_game(user_info)
