const mazeMapSample = [
  // FOR TESTING PURPOSES ONLY. Don't use this map
  "WWWWWWW", // as one of the choices in your game.
  "S W   W",
  "W W W W",
  "W   W F",
  "WWWWWWW",
];

const mazeMap1 = [
  "WWWWWWWWWWWWWWWWWWWWW",
  "W   W     W     W   W",
  "W W W WWW WWWWW W WWW",
  "W W W  W      W W   W",
  "W WWWWWWW W WWW W W W",
  "W         W     W W W",
  "W WWW WWWWW WWWWW W W",
  "W W   W   W W     W W",
  "W WWWWW W W W WWW W F",
  "S     W W W W W W WWW",
  "WWWWW W W W W W W W W",
  "W     W W W   W W W W",
  "W WWWWWWW WWWWW W W W",
  "W       W       W   W",
  "WWWWWWWWWWWWWWWWWWWWW",
];

const sokobanMapSample = [
  // FOR TESTING PURPOSES ONLY. Don't use this map
  " WWWWWW ", // as one of the choices in your game.
  " WW   WW",
  "WWW W  W",
  "WS    W",
  "WWWWWWWW",
];

const sokobanMap1 = [
  "S WWWWWWW",
  "W W   W W",
  "W   W   W",
  "W W W W W",
  "W W WWW  ",
  "W W   WW ",
  "W WWW  W ",
  "W  W   W ",
  "WWWWWWWWF",
];

const sokobanMap2 = [
  "WWWWWWWWWWWF",
  "S   W     W ",
  "W  WW WWW W ",
  "W     W W W ",
  "W WWW W W W ",
  "W   W W WWW ",
  "WWW W W   W ",
  "W   WWW W W ",
  "W       W   ",
  "WWWWWWWWWWWW",
];

let currentMaze = sokobanMap1;
let playerPosition;

function createMaze() {
  const mazeElement = document.getElementById("maze");
  mazeElement.innerHTML = "";

  const maxRowLength = currentMaze.reduce(
    (max, row) => Math.max(max, row.length),
    0
  );

  for (let row = 0; row < currentMaze.length; row++) {
    const rowContent = currentMaze[row].padEnd(maxRowLength, " ");
    for (let col = 0; col < rowContent.length; col++) {
      const cell = document.createElement("div");
      const cellClass =
        rowContent[col] === " " ? "cell" : `cell ${rowContent[col]}`;
      cell.className = cellClass;
      mazeElement.appendChild(cell);

      if (rowContent[col] === "S") {
        playerPosition = { row, col };
      }
    }
    mazeElement.appendChild(document.createElement("br"));
  }

  updatePlayerPosition();
}

function updatePlayerPosition() {
  const mazeElement = document.getElementById("maze");
  const playerElement = mazeElement.querySelector(".cell.P");

  if (playerElement) {
    playerElement.classList.remove("P");
  }

  const playerIndex =
    playerPosition.row * (currentMaze[0].length + 1) + playerPosition.col;
  const newPlayerElement = mazeElement.children[playerIndex];
  newPlayerElement.classList.add("P");
}

function movePlayer(direction) {
  const newPosition = { ...playerPosition };

  switch (direction) {
    case "up":
      newPosition.row -= 1;
      break;
    case "down":
      newPosition.row += 1;
      break;
    case "left":
      newPosition.col -= 1;
      break;
    case "right":
      newPosition.col += 1;
      break;
    default:
      return;
  }

  if (
    newPosition.row >= 0 &&
    newPosition.row < currentMaze.length &&
    newPosition.col >= 0 &&
    newPosition.col < currentMaze[0].length
  ) {
    const newCell = currentMaze[newPosition.row][newPosition.col];
    if (newCell !== "W") {
      playerPosition = newPosition;
      updatePlayerPosition();

      if (newCell !== "W") {
        if (direction === "up" || direction === "down") {
          newPosition.col = playerPosition.col;
        } else if (direction === "left" || direction === "right") {
          newPosition.row = playerPosition.row;
        }

        const updatedCell = currentMaze[newPosition.row][newPosition.col];
        playerPosition = newPosition;
        updatePlayerPosition();

        if (updatedCell === "F") {
          showWinMessage();
        }
      }
    }
  }
}

function handleKeyPress(event) {
  switch (event.key) {
    case "ArrowUp":
      movePlayer("up");
      break;
    case "ArrowDown":
      movePlayer("down");
      break;
    case "ArrowLeft":
      movePlayer("left");
      break;
    case "ArrowRight":
      movePlayer("right");
      break;
    default:
      break;
  }
}

function changeMap() {
  currentMaze = currentMaze === sokobanMap1 ? sokobanMap2 : sokobanMap1;
  createMaze();
}

let winMessage = false;

function showWinMessage() {
  if (!winMessage) {
    const winMessage = document.createElement("h1");
    winMessage.id = "winMessage";
    winMessage.textContent = "You won!";

    document.body.appendChild(winMessage);

    winMessage = true;
  }

  const winMessageElement = document.getElementById("winMessage");
  winMessageElement.style.display = "block";
}

document.addEventListener("DOMContentLoaded", () => {
  createMaze();
  document.addEventListener("keydown", handleKeyPress);
});
