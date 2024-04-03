// log de Hello JS

// console.log("Hello JS!"); // dan la console

// Fonction sidenav=menu burger

// fonctoin pour le refresh
// var refresh = window.getElementById("refresh");
// refresh.addEventListener("click", location.reload(), false);

// fonction pour menu burger

var sidenav = document.getElementById("mySidenav");
var openBtn = document.getElementById("openBtn");
var closeBtn = document.getElementById("closeBtn");

openBtn.onclick = openNav;
closeBtn.onclick = closeNav;

function openNav() {
  sidenav.classList.add("active");
}

function closeNav() {
  sidenav.classList.remove("active");
}

// fonction pour la souris

const mousemove = document.querySelector(".mousemove");
window.addEventListener("mousemove", (e) => {
  mousemove.style.left = e.pageX + "px";
  mousemove.style.top = e.pageY + "px";
});

// fonction pour que le chrono reviens des le debut

function showErrorAndStopTimer(clickedBox) {
  clickedBox.classList.add("error");
  if (document.querySelector(".error")) {
    const timer = document.querySelector(".timer");
    if (timer) {
      timer.remove();
    }
  }
}

// fonction pour que les box ce mélange

function shuffleChildren(parent) {
  let children = Array.from(parent.children);
  let i = children.length;
  while (--i > 0) {
    let j = Math.floor(Math.random() * (i + 1));
    [children[i], children[j]] = [children[j], children[i]];
    parent.appendChild(children[i]);
  }
}

// fonction pour que les effet vitoire ce lance et que le temps s'arrete

function showreaction(type, clickedBox) {
  clickedBox.classList.add(type);
  if (type !== "success") {
    setTimeout(() => clickedBox.classList.remove(type), 800);
  }
}

// fonction pour la musique si il y a vitoire

function PlayZikVictoire() {
  const audio = new Audio("zik.mp3");
  audio.play();
}
// fonction pour la musique de la defaite

function PlayZikdefaite() {
  const audio = new Audio("defaite.mp3");
  audio.play();
}

// fonction pour que le chrono ce lance à miliseceonds

function startTimer() {
  const timer = document.createElement("div");
  timer.classList.add("timer");
  timer.innerText = "0s 0ms";
  document.body.appendChild(timer);

  let seconds = 0,
    milliseconds = 0;
  const interval = setInterval(() => {
    milliseconds += 100;
    if (milliseconds >= 1000) {
      milliseconds = 0;
      seconds++;
    }
    timer.innerText = `${seconds}s ${milliseconds}ms`;
    if (
      document.querySelector(".success") ||
      document.querySelector(".error")
    ) {
      clearInterval(interval);
    }
  }, 100);
}

function getCurrentTimeInSeconds() {
  const timer = document.querySelector(".timer");
  if (timer) {
    const parts = timer.innerText.split(" ");
    const seconds = parseInt(parts[0], 10);
    const milliseconds = parseInt(parts[1], 10) / 1000;
    return seconds + milliseconds;
  }
  return 0;
}

const board = document.querySelector("#board");
const box = document.createElement("div");
box.classList.add("box");
let nb = 1;

// nombre de case de 1 à X

for (let i = 1; i <= 2; i++) {
  const newbox = box.cloneNode(true);
  newbox.innerText = i;
  board.appendChild(newbox);

  // si on clique le chrno ce lance

  newbox.addEventListener("click", function () {
    if (i === 1) {
      startTimer();
    }

    // si on clique sur les bonnes box alors le show des cases ce lance (case en vers, musique )

    if (i === nb) {
      newbox.classList.add("box-clicked");
      if (nb === board.children.length) {
        board.querySelectorAll(".box").forEach((box) => {
          box.classList.add("success");
        });
        showPageVictoire();
        PlayZikVictoire();
        recordPlayerTime("", getCurrentTimeInSeconds());
      }
      nb++;

      // si on clique sur les mauvaises box alor le show defaite ce lance et le jeux s'arrete
    } else {
      showErrorAndStopTimer(newbox);
      showreaction("error", newbox);
      PlayZikdefaite();
      nb = 1;
    }
  });
}

shuffleChildren(board);

// fonction du message victoire
function showPageVictoire() {
  const PageVictoire = document.createElement("div");
  PageVictoire.classList.add("pagevictoire");
  PageVictoire.innerText = "Victoire!";
  document.body.appendChild(PageVictoire);
  startQuestion();
}

// questionnaire en mode alerte
function startQuestion() {
  var score = 0;
  var totalQuestions = 4;

  var answer1 = prompt("Quelle est la capitale de la France ?");
  if (answer1 === "Paris") {
    score++;
  }

  var answer2 = prompt("Quelle est la capitale de l'Allemagne ?");
  if (answer2 === "Berlin") {
    score++;
  }

  var answer3 = prompt("Quelle est la capitale de la Suisse ?");
  if (answer3 === "Berne") {
    score++;
  }

  var answer4 = prompt("Qui est le prof ?");
  if (answer4 === "Nicolas") {
    score++;
  }

  alert(
    "Vous avez terminé le quiz ! Votre score est de " +
      score +
      " sur " +
      totalQuestions +
      "."
  );
}

// fonction pour avoir le record de temps et pour avoir de la memoire pour les 5 dernier temps

function recordPlayerTime(playerName, time) {
  let playerTimes = JSON.parse(localStorage.getItem("playerTimes")) || [];
  playerTimes.push({ nom: playerName, temps: time });
  playerTimes.sort((a, b) => a.temps - b.temps);
  playerTimes = playerTimes.slice(0, 5);
  localStorage.setItem("playerTimes", JSON.stringify(playerTimes));
  showBestTimes();
}

// fonction pour mettre les temps dans le tableau quand une victoire ce lance

function showBestTimes() {
  const bestTimesElement = document.getElementById("toplist-list");
  bestTimesElement.innerHTML = "";
  let playerTimes = JSON.parse(localStorage.getItem("playerTimes")) || [];
  playerTimes.forEach((player, index) => {
    const timeEntry = document.createElement("li");
    timeEntry.innerText = `${index + 1}.  ${player.temps}s`;
    bestTimesElement.appendChild(timeEntry);
  });
}
