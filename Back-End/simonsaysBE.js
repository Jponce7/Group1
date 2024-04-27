const readline = require('readline');

// Define the list of information to be recalled
const infoList = ["home address", "your school", "phone number", "parents' names", "your name"];

// Function to prompt user for information
function promptUserInformation() {
    const userInformation = {};
    const rl = readline.createInterface({
        input: process.stdin,
        output: process.stdout
    });

    console.log("Please provide the following information:");
    let index = 0;
    return new Promise((resolve, reject) => {
        function promptInfo() {
            if (index < infoList.length) {
                rl.question(`What is your ${infoList[index]}? `, (answer) => {
                    userInformation[infoList[index]] = answer.trim();
                    index++;
                    promptInfo();
                });
            } else {
                rl.close();
                resolve(userInformation);
            }
        }
        promptInfo();
    });
}

// Function to start Simon Says game
function simonSaysGame(userInformation) {
    const shuffledInfoList = [...infoList].sort(() => Math.random() - 0.5); // Shuffle the list

    let correctAnswers = 0;

    const rl = readline.createInterface({
        input: process.stdin,
        output: process.stdout
    });

    function askQuestion(index) {
        if (index < shuffledInfoList.length) {
            const info = shuffledInfoList[index];
            rl.question(`Simon says, what is your ${info}? `, (answer) => {
                if (answer.trim().toLowerCase() === userInformation[info].toLowerCase()) {
                    console.log("Correct!\n");
                    correctAnswers++;
                    askQuestion(index + 1);
                } else {
                    console.log(`Sorry, that's incorrect. The correct answer is: ${userInformation[info]}.\n`);
                    askQuestion(index); // Repeat the same question
                }
            });
        } else {
            rl.close();
            if (correctAnswers === infoList.length) {
                console.log("Congratulations! You've successfully recalled all the information.");
            } else {
                console.log("You missed some information. Let's try again.");
                simonSaysGame(userInformation);
            }
        }
    }

    askQuestion(0);
}

// Start the game
async function startSimonSaysGame() {
    const userInformation = await promptUserInformation();
    simonSaysGame(userInformation);
}

startSimonSaysGame();
