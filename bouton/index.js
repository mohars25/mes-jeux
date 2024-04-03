let score = 0;
let timeLeft = 10;
let highScores = [];

const clik = document.getElementById("clik");
const timeDiv = document.getElementById("time");
const scoreDiv = document.getElementById("score");
const highScoresDiv = document.getElementById("highScores");

clik.disabled = true;

function startGame() {
  clik.disabled = false;
  score = 0;
  timeLeft = 10;
  scoreDiv.innerHTML = "Score : " + score;
  timeDiv.innerHTML = "Temps restant : " + timeLeft + "s";

  const interval = setInterval(function () {
    timeLeft--;
    timeDiv.innerHTML = "Temps restant : " + timeLeft + "s";
    if (timeLeft <= 0) {
      clearInterval(interval);
      endGame();
    }
  }, 1000);
}

function incrementScore() {
  if (timeLeft > 0) {
    score++;
    scoreDiv.innerHTML = "Score : " + score;
  }
}

function endGame() {
  clik.disabled = true;
  highScores.push(score);
  highScores.sort((a, b) => b - a);
  highScores = highScores.slice(0, 5);

  let highScoresHTML = "";
  highScores.forEach((score, index) => {
    highScoresHTML += index + 1 + ". " + score + "<br>";
  });
  highScoresDiv.innerHTML = highScoresHTML;

  alert("perdus ! tu nest pas très chaud Votre score est de " + score);
  startGame();
}

startGame();

var sidenav = document.getElementById("mySidenav");
var openBtn = document.getElementById("openBtn");
var closeBtn = document.getElementById("closeBtn");

openBtn.onclick = openNav;
closeBtn.onclick = closeNav;

/* Set the width of the side navigation to 250px */
function openNav() {
  sidenav.classList.add("active");
}

/* Set the width of the side navigation to 0 */
function closeNav() {
  sidenav.classList.remove("active");
}
