const Ship = require("./Ships");
// 0: Array(3) [ "Carrier", (2) [1,2], "x" ]
// ​1: Array(3) [ "BattleShip", (2) […], "x" ]
// 2: Array(3) [ "Cruiser", (2) […], "x" ]
// 3: Array(3) [ "Submarine", (2) […], "x" ]
// 4: Array(3) [ "Destroyer", (2) […], "x" ]
class Gameboard {
  constructor(ship_1, ship_2, ship_3, ship_4, ship_5) {
    this.ships = [
      new Ship(ship_1[0], ship_1[1], ship_1[2]),
      new Ship(ship_2[0], ship_2[1], ship_2[2]),
      new Ship(ship_3[0], ship_3[1], ship_3[2]),
      new Ship(ship_4[0], ship_4[1], ship_4[2]),
      new Ship(ship_5[0], ship_5[1], ship_5[2]),
    ];
    this.board = [];
    this.init();
  }
  init() {
    for (let i = 0; i < 10; i++) {
      let tempboard = [];
      for (let i_2 = 0; i_2 < 10; i_2++) {
        tempboard.push({ hasShip: false, isShot: false });
      }
      this.board.push(tempboard);
    }
    this.PlacingShips();
  }
  PlacingShips() {
    this.ships.forEach((ship) => {
      for (let i = 0; i <= ship.length - 1; i++) {
        if (ship.al === "y") {
          this.board[ship.position[0][0]][ship.position[0][1] - i].hasShip =
            ship.name;
        } else
          this.board[ship.position[0][0] + i][ship.position[0][1]].hasShip =
            ship.name;
      }
    });
  }
  receiveAttack(position) {
    if (this.board[position[0] - 1][position[1] - 1].hasShip) {
      let ship = this.ships.find(
        (classobj) =>
          classobj.name === this.board[position[0] - 1][position[1] - 1].hasShip
      );
      ship.hit();

      if (ship.isSunk()) return `sunk ${ship.name.toLowerCase()}`;
      else return ship.name.toLowerCase();
    }
    this.board[position[0] - 1][position[1] - 1].isShot = true;
    return false;
  }
}
module.exports = Gameboard;
