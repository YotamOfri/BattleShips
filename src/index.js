// Imports
import * as setup from "./setupPage";
const Gameboard = require("./Gameboard");
const Player = require("./Player");
const RandomBoard = require("./computerBoard");
setup.setupHover();
// end to Setup Page
function performAsyncTask() {
  return new Promise((resolve) => {
    const intervalId = setInterval(() => {
      if (setup.playerBoard !== undefined) {
        clearInterval(intervalId);
        resolve();
      }
    }, 500);
  });
}
// boards
const computer = new Player(RandomBoard());
var player;
// vars
const enemeyboard = document.querySelector(".computer");
const information_text = document.querySelector(".information");
const ships_hit = [
  { name: "carrier", pos: [] },
  { name: "battleship", pos: [] },
  { name: "cruiser", pos: [] },
  { name: "submarine", pos: [] },
  { name: "destroyer", pos: [] },
];
const ships_hit_enemey = [
  { name: "carrier", pos: [] },
  { name: "battleship", pos: [] },
  { name: "cruiser", pos: [] },
  { name: "submarine", pos: [] },
  { name: "destroyer", pos: [] },
];
// main page
async function MainPage() {
  // Creating The Players
  await performAsyncTask();
  player = new Player(setup.playerBoard);
  // Clicking on Enemey board
  enemeyboard.addEventListener("click", handleclick_hit);
}
MainPage();
// supportive Functions
// handle click for the EnemeyBoard
function handleclick_hit(event) {
  if (event.target.classList.contains("hitable")) {
    let hit = computer.attack(setup.findPos(event.target));
    if (hit === false) {
      information_text.innerText = "Player Missed";
      event.target.classList.add("hitted");
    } else {
      event.target.classList.add("hit-ship");
      // storing the hit
      if (hit.includes("sunk")) {
        const result = hit.replace(
          new RegExp("\\b" + "sunk" + "\\s*", "g"),
          ""
        );
        information_text.innerText = `Computer sank Players : ${result}`;
        let index = findShipIndexByName(result);
        ships_hit[index].pos.push(event.target);
        for (const pos of ships_hit[index].pos) {
          pos.classList.add("sunk");
        }
        if (checkforWin(computer)) return endgame("Player Wins");
      } else {
        information_text.innerText = `Player Hit`;
        let index = findShipIndexByName(hit);
        ships_hit[index].pos.push(event.target);
      }
    }
    event.target.classList.remove("hitable");
    computerTurn();
  }
}
// Random Hit Form Enemey To player
function RandomHit(player) {
  let position;
  while (true) {
    position = [
      Math.floor(Math.random() * (10 - 1 + 1)) + 1,
      Math.floor(Math.random() * (10 - 1 + 1)) + 1,
    ];
    if (!checkforPos(player.hits, position)) break;
  }
  return position;
}
// computer Turn
function computerTurn() {
  enemeyboard.removeEventListener("click", handleclick_hit);
  const position = RandomHit(player);
  const div = document
    .querySelector(`[data-x="${position[0]}"]`)
    .querySelector(`[data-y="${position[1]}"]`);
  //
  if (div.classList.contains("square")) {
    let hit = player.attack(setup.findPos(div));
    if (hit === false) {
      information_text.innerText = "Computer Missed";
      div.classList.add("hitted");
    } else {
      div.classList.add("hit-ship");
      // storing the hit
      if (hit.includes("sunk")) {
        const result = hit.replace(
          new RegExp("\\b" + "sunk" + "\\s*", "g"),
          ""
        );
        information_text.innerText = `Computer sank Players : ${result}`;
        let index = findShipIndexByName(result);
        ships_hit_enemey[index].pos.push(div);
        for (const pos of ships_hit_enemey[index].pos) {
          pos.classList.add("sunk");
        }
        if (checkforWin(player)) return endgame("Computer Wins");
      } else {
        information_text.innerText = "Computer Hit";
        hit = hit.toLowerCase();
        let index = findShipIndexByName(hit);
        ships_hit_enemey[index].pos.push(div);
      }
    }
    enemeyboard.addEventListener("click", handleclick_hit);
  }
}

// checks for a position inside of arrays of positions
function checkforPos(PositionsArray, position) {
  return PositionsArray.some((arr) =>
    arr.every((value, index) => value === position[index])
  );
}
// finds the ship by the name
function findShipIndexByName(shipName) {
  for (let i = 0; i < ships_hit.length; i++)
    if (ships_hit[i].name === shipName) return i;
}
// check if SomeoneWon
function checkforWin(player) {
  let win = true;
  for (const ship of player.gameboard.ships) if (!ship.Sunk) win = false;
  return win;
}
// endGame Screen
function endgame(winner) {
  enemeyboard.removeEventListener("click", handleclick_hit);
  // Creating The Ending Screen
  const endgame_container = document.createElement("div");
  const endgame = document.createElement("div");
  const title = document.createElement("h1");
  const button = document.createElement("button");
  title.innerText = winner;
  button.innerText = "Play Again";
  endgame_container.classList.add("endgame-container");
  endgame.classList.add("endgame");
  title.classList.add("endgame-title");
  button.classList.add("endgame-button");
  button.addEventListener("click", () => {
    window.location.href = "index.html";
  });
  // Appending

  endgame.append(title, button);
  endgame_container.append(endgame);
  document.body.append(endgame_container);
}
