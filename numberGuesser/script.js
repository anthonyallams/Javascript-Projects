// UI Elements
const form = document.querySelector("form");
const input = document.querySelector("input");
const submit = document.querySelector("button");
const minNum = document.querySelector(".min-num");
const maxNum = document.querySelector(".max-num");
const message = document.querySelector(".message");

//Function to get random winning num
const getWinningNum = () => {
  return Math.floor(Math.random() * (max - min + 1) + min);
};

// Declare Game Variables
const min = 1;
const max = 10;
let guessesAllowed = 3;
const winningNum = getWinningNum();
minNum.innerHTML = min;
maxNum.innerHTML = max;

// Function to Set DOM Message
const sendMessage = (msg, color) => {
  message.innerHTML = msg;
  message.style.color = color;
  message.style.display = "flex";
  input.style.borderColor = color;
};

// Function to reset Submit button to 'Play Again' button
const resetSubmit = () => {
  submit.value = "play-again";
  submit.classList.add("play-again");
  submit.innerHTML = "PLAY AGAIN";
};

// Function for Game Over Prompt
const gameOver = (status, msg) => {
  let color;
  status === true ? (color = "limegreen") : (color = "crimson");

  sendMessage(msg, color);
  // Disable input button
  input.disabled = true;
  resetSubmit();
};

// Function to Check the Guess Entered
const checkGuess = (e) => {
  e.preventDefault();

  //   Convert the entered value to integer
  let guess = parseInt(input.value);

  //   Validate the entered values
  if (isNaN(guess) || guess < min || guess > max) {
    sendMessage(
      `Please check. Guesses should be less than ${max} and greater than ${min}`,
      "crimson"
    );
  }
  // Check if user has won and whether the guesses allowed is remaining
  if (guess === winningNum) {
    gameOver(true, `${winningNum} is the winning Guess. You won!`);
    resetSubmit();
  } else {
    guessesAllowed -= 1;
    if (guessesAllowed === 0) {
      gameOver(false, `${winningNum} is the winning Guess. You Lost!`);
      resetSubmit();
    } else {
      sendMessage(
        `You have ${guessesAllowed} guesses remaining. Try again to win!`,
        "crimson"
      );
    }
  }
};

// Function to play again
const playAgain = (e) => {
  if (e.target.classList.contains("play-again")) {
    window.location.reload();
  }
};

// Function to Add Even Listeners
const events = () => {
  form.addEventListener("submit", checkGuess);
  submit.addEventListener("mousedown", playAgain);
};

// Invoke Event Listenerss
events();
