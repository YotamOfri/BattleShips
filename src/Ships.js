class Ship {
  constructor(name, position, al) {
    switch (name.toLowerCase()) {
      case "carrier":
        this.length = 5;
        break;
      case "battleship":
        this.length = 4;
        break;
      case "cruiser":
        this.length = 3;
        break;
      case "submarine":
        this.length = 3;
        break;
      case "destroyer":
        this.length = 2;
        break;
      default:
        return "unknow Ship";
    }
    this.name = name;
    this.hits = 0;
    this.Sunk = false;
    this.position = position;
    this.position[0][0] -= 1;
    this.position[0][1] -= 1;
    this.al = al;
  }
  hit() {
    this.hits += 1;
  }
  isSunk() {
    return this.hits === this.length ? (this.Sunk = true) : false;
  }
}

module.exports = Ship;
