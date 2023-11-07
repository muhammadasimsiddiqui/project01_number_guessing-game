// guess-the-number.ts
import * as inquirer from 'inquirer';
import * as chalk from 'chalk';

// Function to generate a random number within a specified range
function generateRandomNumber(min: number, max: number): number {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

// Function to start the game
async function startGame() {
  const minRange = 1;
  const maxRange = 100;
  const secretNumber = generateRandomNumber(minRange, maxRange);
  let attempts = 0;

  console.log(chalk.blue('Welcome to the Guess the Number game!'));
  console.log(chalk.yellow(`I'm thinking of a number between ${minRange} and ${maxRange}.`));

  async function askForGuess() {
    const input = await inquirer.prompt([
      {
        type: 'number',
        name: 'guess',
        message: 'Enter your guess:',
        validate: (value) => {
          return !isNaN(value) && value >= minRange && value <= maxRange;
        },
      },
    ]);

    const guess = input.guess;
    attempts++;

    if (guess === secretNumber) {
      console.log(chalk.green(`Congratulations! You guessed the number ${secretNumber} in ${attempts} attempts.`));
      process.exit(0);
    } else if (guess < secretNumber) {
      console.log(chalk.red('Try a higher number.'));
    } else {
      console.log(chalk.red('Try a lower number.'));
    }

    askForGuess();
  }

  askForGuess();
}

startGame();
