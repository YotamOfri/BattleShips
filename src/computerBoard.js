const Gameboard = require("./Gameboard");
function RandomBoard() {
  // taken spots
  const Ships_positions = [];
  const ships = [];
  // ships names and length
  const ships_name = [
    { name: "carrier", length: 5 },
    { name: "battleship", length: 4 },
    { name: "cruiser", length: 3 },
    { name: "submarine", length: 3 },
    { name: "destroyer", length: 2 },
  ];
  ships_name.forEach((ship) => {
    while (true) {
      // state of each ship X or Y
      let state = Math.floor(Math.random() * (2 - 1 + 1)) + 1;
      state = state === 1 ? "x" : "y";
      // position of each ship
      let position = [
        Math.floor(Math.random() * (10 - 1 + 1)) + 1,
        Math.floor(Math.random() * (10 - 1 + 1)) + 1,
      ];
      if (checkLegalPos(position, ship.length, state)) {
        ships.push([ship.name, position, state]);
        for (let i = 0; i < ship.length; i++) {
          if (state === "x")
            Ships_positions.push([position[0] + i, position[1]]);
          else Ships_positions.push([position[0], position[1] - i]);
        }
        break;
      }
    }
  });
  // end of Creating
  const board = new Gameboard(
    [ships[0][0], [ships[0][1]], ships[0][2]],
    [ships[1][0], [ships[1][1]], ships[1][2]],
    [ships[2][0], [ships[2][1]], ships[2][2]],
    [ships[3][0], [ships[3][1]], ships[3][2]],
    [ships[4][0], [ships[4][1]], ships[4][2]]
  );
  return board;

  // supportive Functions
  // check if a position is in the Ships_positions
  // Example [[1,2][2,1]],[1,2] return True
  function checkforPos(Ships_positions, position) {
    if (
      position[0] > 10 ||
      position[1] > 10 ||
      position[0] < 1 ||
      position[1] < 1
    )
      return true;
    else
      return Ships_positions.some((arr) =>
        arr.every((value, index) => value === position[index])
      );
  }
  // check if all of the positions if taken
  // Example ([1,2], 5, X) [[1,2][2,1]] return false
  function checkLegalPos(position, length, state) {
    let is_true = true;
    for (let i = 0; i < length; i++) {
      if (state === "x") {
        if (checkforPos(Ships_positions, [position[0] + i, position[1]]))
          return (is_true = false);
      } else if (checkforPos(Ships_positions, [position[0], position[1] - i]))
        return (is_true = false);
    }
    return is_true;
  }
}
module.exports = RandomBoard;
