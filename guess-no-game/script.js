"use script";
/*console.log(document.querySelector(".message"));
console.log(document.querySelector(".message").innerHTML);
// OR WE CAN ASSIGN A CHANGE A VALUE FOR EXAMPLE
console.log((document.querySelector(".message").textContent = "Guess only"));*/

let secretNumber = Math.trunc(Math.random() * 100 + 1);
let score = 20;

let highscore = 0;

document.querySelector(".check").addEventListener("click", function () {
  const guess = Number(document.querySelector(".guess").value);

  //When wrong input
  if (guess < 1 || guess > 100) {
    if (score > 1) {
      document.querySelector(".message").textContent =
        "🤐 Enter Number between 1 to 100";
      score--;
      document.querySelector(".score").innerHTML = score;
    } else {
      document.querySelector(".score").textContent = 0;
      document.querySelector(".message").textContent = "😪 You Lose the Game";
    }
  }
  //When player wins
  else if (guess === secretNumber) {
    document.querySelector(".message").textContent = "🥇 Correct Number";
    document.querySelector("body").style.backgroundColor = "#60b347";
    document.querySelector(".number").style.width = "30rem";
    document.querySelector(".number").textContent = secretNumber;

    if (score > highscore) {
      highscore = score;
      document.querySelector(".highscore").textContent = highscore;
    }
  }
  //When guesss is too high
  else if (guess > secretNumber) {
    if (score > 1) {
      document.querySelector(".message").textContent = "💹 Too High";
      score--;
      document.querySelector(".score").innerHTML = score;
    } else {
      document.querySelector(".score").textContent = 0;
      document.querySelector(".message").textContent = "😪 You Lose the Game";
    }
  }
  //When guess is too loo
  else if (guess < secretNumber) {
    if (score > 1) {
      document.querySelector(".message").textContent = "📉 Too Loo";
      score--;
      document.querySelector(".score").innerHTML = score;
    } else {
      document.querySelector(".score").textContent = 0;
      document.querySelector(".message").textContent = "😪 You Lose the Game";
    }
  }
});

document.querySelector(".again").addEventListener("click", function () {
  secretNumber = Math.trunc(Math.random() * 100 + 1);
  score = 20;
  document.querySelector(".score").textContent = score;
  document.querySelector(".message").textContent = "Start guessing...";
  document.querySelector(".guess").value = "";
  document.querySelector("body").style.backgroundColor = "#222";
  document.querySelector(".number").textContent = "?";
  document.querySelector(".number").style.width = "15rem";
});
