function showreaction(type, clickedBox) {
  clickedBox.classList.add(type);
  if (type !== "success") {
    setTimeout(function () {
      clickedBox.classList.remove(type);
    }, 800);
  }
}

const board = document.querySelector(".board");
const player1Cell = document.getElementById("player1");
const player2Cell = document.getElementById("player2");
let currentPlayer = "X";
let cells = Array.from({ length: 9 });

function showPageVictoire() {
  const PageVictoire = document.createElement("div");
  PageVictoire.classList.add("pagevictoire");
  PageVictoire.innerText = "Victoire! ";
  const logo = document.createElement("img");
  logo.src = "trophee.png";
  logo.alt = "logo";
  PageVictoire.appendChild(logo);
  const message = document.createElement("p");

  PageVictoire.appendChild(message);

  document.body.appendChild(PageVictoire);
}

function PlayZikVictoire() {
  const audio = new Audio("zik.mp3");
  audio.play();
}

player1Cell.textContent = "Joueur 1 (X)";
player2Cell.textContent = "Joueur 2 (O)";

cells.forEach((_, index) => {
  const cell = document.createElement("div");
  cell.classList.add("cell");
  cell.dataset.index = index;
  cell.addEventListener("click", handleCellClick);
  board.appendChild(cell);
});

function handleCellClick(event) {
  const cell = event.target;

  if (cells[cell.dataset.index] || listeVic()) {
    return;
  }

  cells[cell.dataset.index] = currentPlayer;
  cell.textContent = currentPlayer;

  if (listeVic()) {
    PlayZikVictoire();
    showPageVictoire();

    showreaction(".cell.winner");

    document.getElementById("myform").reset();
    document.getElementById("player" + currentPlayer).textContent += "Gagné!";
    setTimeout(() => {});
  } else {
    currentPlayer = currentPlayer === "X" ? "O" : "X";
  }
}

function listeVic() {
  const winningCombos = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6],
  ];

  for (let combo of winningCombos) {
    const [a, b, c] = combo;
    if (cells[a] && cells[a] === cells[b] && cells[a] === cells[c]) {
      return true;
    }
  }

  return false;
}

function resetGame() {
  cells = Array.from({ length: 9 });
  currentPlayer = "X";
  document.querySelectorAll(".cell").forEach((cell) => {
    cell.textContent = "";
  });
  player1Cell.textContent = "Joueur 1 (X)";

  player2Cell.textContent = "Joueur 2 (O)";
  player1Cell.textContent = "Joueur 1";
  player2Cell.textContent = "Joueur 2";
}

var sidenav = document.getElementById("mySidenav");
var openBtn = document.getElementById("openBtn");
var closeBtn = document.getElementById("closeBtn");

openBtn.onclick = openNav;
closeBtn.onclick = closeNav;

// ouverture de la nav
function openNav() {
  sidenav.classList.add("active");
}

// fermeture de la nav
function closeNav() {
  sidenav.classList.remove("active");
}

document.addEventListener("DOMContentLoaded", function () {
  var music = document.getElementById("background-music");
  var musicToggleBtn = document.getElementById("music-toggle");

  // si clique la musique ce lance
  document.body.addEventListener(
    "click",
    function () {
      music.play();
    },
    { once: true }
  );

  musicToggleBtn.addEventListener("click", function () {
    if (music.paused) {
      music.play();
    } else {
      music.pause();
    }
  });
});
