const Gameboard = require("./Gameboard");
class Player {
  constructor(gameboard) {
    this.gameboard = gameboard;
    this.turn = false;
    this.hits = [];
  }
  attack(pos) {
    if (!this.hits.includes(pos)) {
      this.hits.push(pos);
      this.turn = false;
      return this.gameboard.receiveAttack(pos);
    }
  }
}
module.exports = Player;
