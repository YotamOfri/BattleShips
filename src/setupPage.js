// imports
const Gameboard = require("./Gameboard");
// exports
export var playerBoard;
// Global Vars
const player_board = document.querySelector(".player");
const block = document.createElement("div");
const setupBoard = document.querySelector(".small-board");
const ship_name = document.querySelector(".ship-name");
const ships_names = [
  "Carrier",
  "BattleShip",
  "Cruiser",
  "Submarine",
  "Destroyer",
];
let bg_image =
  "url(https://raw.githubusercontent.com/YotamOfri/BattleShips/c6c6d591ab196a16406e659b50bb701e497d9add/resources/carrier.svg)";
let rotate_state = "x";
var length = 5;
// main function
export function setupHover() {
  // Hover div setup
  block.classList.add("has_ship");
  setupBoard.append(block);
  block.style.width = `${block.offsetWidth * length}px`;
  // hovering change location
  setupBoard.addEventListener("mouseover", (e) => {
    if (!e.target.classList.contains("board")) {
      block.style.top = e.target.offsetTop + "px";
      block.style.left = e.target.offsetLeft + "px";
    }
  });
  setupBoard.addEventListener("click", handleclick_x);
  // rotate button
  const rotate_btn = document.querySelector(".rotate-btn");
  rotate_btn.addEventListener("click", handleclick_rotate);
  window.addEventListener("resize", chnageBlockSize);
}
// Rotate Function
function handleclick_rotate() {
  if (rotate_state === "x") {
    setupBoard.removeEventListener("click", handleclick_x);
    setupBoard.addEventListener("click", handleclick_y);
    rotate_state = "y";
    chnageBlockSize();
  } else {
    setupBoard.removeEventListener("click", handleclick_y);
    setupBoard.addEventListener("click", handleclick_x);
    rotate_state = "x";
    chnageBlockSize();
  }
  if (playerBoard !== undefined) return playerBoard;
}
// Placment Function X
function handleclick_x(e) {
  if (!e.target.classList.contains("board")) {
    let tempdiv = null;
    let is_empty = true;
    for (let i = 1; i <= length; i++) {
      if (!tempdiv) {
        tempdiv = e.target;
        if (tempdiv.style.backgroundImage.length > 1) is_empty = false;
      } else {
        if (parseInt(tempdiv.parentNode.dataset.x) + 1 > 10) return null;
        tempdiv = document.querySelector(
          `[data-x="${parseInt(tempdiv.parentNode.dataset.x) + 1}`
        ).children[10 - tempdiv.dataset.y];
        if (tempdiv.style.backgroundImage.length > 1) is_empty = false;
      }
    }
    if (is_empty) {
      tempdiv = null;
      let ship = ship_name.innerText.replace("Place Your", "");
      ship = ship.replace(/\s/g, "");
      for (let i = 1; i <= length; i++) {
        if (!tempdiv) {
          tempdiv = e.target;
          tempdiv.setAttribute("data-name", ship);
          tempdiv.style.backgroundImage = bg_image;
        } else {
          tempdiv = document.querySelector(
            `[data-x="${parseInt(tempdiv.parentNode.dataset.x) + 1}`
          ).children[10 - tempdiv.dataset.y];
          tempdiv.setAttribute("data-name", ship);
          tempdiv.style.backgroundImage = bg_image;
        }
      }
      changeships(block);
    }
  }
}
// Placment Function Y
function handleclick_y(e) {
  if (!e.target.classList.contains("board")) {
    let ship = ship_name.innerText.replace("Place Your", "");
    ship = ship.replace(/\s/g, "");
    let tempdiv = e.target;
    let is_empty = true;
    for (let i = 1; i <= length; i++) {
      if (tempdiv.style.backgroundImage.length > 1) is_empty = false;
      tempdiv = tempdiv.nextElementSibling;
    }
    if (is_empty) {
      tempdiv = e.target;
      for (let i = 1; i <= length; i++) {
        tempdiv.setAttribute("data-name", ship);
        tempdiv.style.backgroundImage = bg_image;
        tempdiv = tempdiv.nextElementSibling;
      }
      changeships(block);
    }
  }
}
// update the Hover effect by size and length
function chnageBlockSize() {
  let size = setupBoard.firstElementChild.firstElementChild;
  if (rotate_state === "x") {
    block.style.width = `${size.offsetWidth * length}px`;
    block.style.height = `${size.offsetHeight}px`;
  } else {
    block.style.width = `${size.offsetWidth}px`;
    block.style.height = `${size.offsetHeight * length}px`;
  }
}
// presseing when hovering and updating the ships
function changeships(div) {
  switch (getComputedStyle(div).backgroundColor) {
    // blue case (carrier)
    case "rgb(102, 102, 255)": {
      div.style.backgroundColor = "rgb(102, 255, 102)";
      bg_image =
        "url(https://raw.githubusercontent.com/YotamOfri/BattleShips/c6c6d591ab196a16406e659b50bb701e497d9add/resources/BattleShip.svg)";
      length = 4;
      ship_name.innerText = "Place Your BattleShip";
      chnageBlockSize();
      break;
    }
    // green case (battleship)
    case "rgb(102, 255, 102)": {
      div.style.backgroundColor = "rgb(255, 255, 102)";
      bg_image =
        "url(https://raw.githubusercontent.com/YotamOfri/BattleShips/c6c6d591ab196a16406e659b50bb701e497d9add/resources/cruiser.svg)";
      length = 3;
      ship_name.innerText = "Place Your Cruiser";
      chnageBlockSize();
      break;
    }
    // yellow case (cruiser)
    case "rgb(255, 255, 102)": {
      div.style.backgroundColor = "rgb(255, 102, 102)";
      bg_image =
        "url(https://raw.githubusercontent.com/YotamOfri/BattleShips/c6c6d591ab196a16406e659b50bb701e497d9add/resources/submarine.svg)";
      ship_name.innerText = "Place Your Submarine";
      chnageBlockSize();
      break;
    }
    // red case (submarine)
    case "rgb(255, 102, 102)": {
      div.style.backgroundColor = "rgb(255, 102, 255)";
      bg_image =
        "url(https://raw.githubusercontent.com/YotamOfri/BattleShips/c6c6d591ab196a16406e659b50bb701e497d9add/resources/destroyer.svg)";
      length = 2;
      ship_name.innerText = "Place Your Destroyer";
      chnageBlockSize();
      break;
    }
    // pink case (destroyer) (end Case)
    case "rgb(255, 102, 255)": {
      let ships = FromInformationToShip();
      playerBoard = new Gameboard(
        [ships[0][0], [ships[0][1]], ships[0][2]],
        [ships[1][0], [ships[1][1]], ships[1][2]],
        [ships[2][0], [ships[2][1]], ships[2][2]],
        [ships[3][0], [ships[3][1]], ships[3][2]],
        [ships[4][0], [ships[4][1]], ships[4][2]]
      );
      const btn_container = document.createElement("div");
      const btn_submit = document.createElement("div");
      btn_container.classList.add("endpos-btn-container");
      btn_submit.classList.add("endpos-btn");
      btn_submit.innerText = "Submit";
      block.remove();
      btn_submit.addEventListener("click", handleclick_submit);
      btn_container.append(btn_submit);
      setupBoard.append(btn_container);
    }
  }
}
// gives x and y of a position given a location in a form of a div
export function findPos(div) {
  return [parseInt(div.parentNode.dataset.x), parseInt(div.dataset.y)];
}
// Takes all the info of the ships from the dom and gets it into a specific layout:
// ["ship name", location, X or Y allignment] for example : ["carrier", [[1, 10]], "x"]
function FromInformationToShip() {
  let ships = [];
  ships_names.forEach((ship) => {
    let ship_list = setupBoard.querySelectorAll(`[data-name="${ship}"]`);
    let first_pos = findPos(ship_list[0]);
    let last_pos = findPos(ship_list[ship_list.length - 1]);
    if (first_pos[0] === last_pos[0]) ships.push([ship, first_pos, "y"]);
    else ships.push([ship, first_pos, "x"]);
  });
  return ships;
}
function handleclick_submit() {
  setupBoard.removeEventListener("click", handleclick_x);
  setupBoard.removeEventListener("click", handleclick_y);
  const setup_container = document.querySelector(".setup-container");
  const ships_location = document.querySelectorAll(`[data-name]`);
  setup_container.remove();
  SmallBoardToMain(ships_location);
}
function SmallBoardToMain(ships_location) {
  ships_location.forEach((location) => {
    let ship = findPos(location);
    let div = player_board
      .querySelector(`[data-x="${ship[0]}"]`)
      .querySelector(`[data-y="${ship[1]}"]`);
    div.style.backgroundImage = location.style.backgroundImage;
    div.setAttribute("data-name", location.dataset.name);
  });
}
