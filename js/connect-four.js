let colorOne,
    colorTwo,
    totalRows,
    totalColumns,
    currentColor,
    colorOneArray = [],
    colorTwoArray = [],
    colorOneWins = 0,
    colorTwoWins = 0,
    winner = false;

const capitalize = (x) =>
  x.charAt(0).toUpperCase() + x.slice(1);

const getColorArray = () =>
  currentColor === colorOne ? colorOneArray : colorTwoArray;

const switchColor = (x) =>
  x === colorOne ? colorTwo : colorOne;

function initialize(opts = {}) {
  // Allow user opts without having to pass in defaults
  ({ colorOne = "red", colorTwo = "yellow", totalRows = 6, totalColumns = 7 } = opts);
  currentColor = colorOne;
  updateScoreboard();
  reset(); //: <- this fixes my syntax highlighting
}

function addDot() {
  const emptyDotArray = Array.from(this.querySelectorAll(
      `div.dot:not(.${colorOne}):not(.${colorTwo})`)),
        emptyDot = emptyDotArray.pop();
  if (!emptyDot || winner) { return; }
  emptyDot.className = `dot ${currentColor}`;
  getColorArray().push(getCoordinate(this, emptyDot));
  if (playerWon(getColorArray())) {
    handleWin(currentColor);
  } else {
    currentColor = switchColor(currentColor);
    updateElementbyId("flash", `${capitalize(currentColor)}'s turn`);
  }
}

function addListeners() {
  const columns = document.querySelectorAll(".column");
  for (let i = columns.length - 1; i >= 0; i--) {
    (function(i) {
      columns[i].addEventListener("click", addDot);
    })(i);
  }
}

function checkSequence(method, array, coordinate, index) {
  if (containsCoordinate(array, coordinate)) {
    const newCoordinate = method(coordinate);
    return index + checkSequence(method, array, newCoordinate, index);
  }
  return 0;
}

function containsCoordinate(array, coordinate) {
  for (let i = 0; i < array.length; i++) {
    if ((array[i].x === coordinate.x) &&
        (array[i].y === coordinate.y)) {
      return true;
    }
  }
  return false;
}

function createBoard() {
  const target = document.querySelector("section.board");
  target.innerHTML = "";
  for (let i = 0; i < totalColumns; i++) {
    const columnNode = createColumn(i);
    for (let j = totalRows - 1; j >= 0; j--) {
      const dotNode = createDot(j);
      columnNode.appendChild(dotNode);
    }
    target.appendChild(columnNode);
  }
}

function createColumn(index) {
  const column = document.createElement("div");
  column.className = "column";
  column.setAttribute("data-column-index", index);
  return column;
}

function createDot(index) {
  const dot = document.createElement("div");
  dot.className = "dot";
  dot.setAttribute("data-row-index", index);
  return dot;
}

function diagonalStrategy1(coordinate) {
  return { "x": coordinate.x + 1,
  "y": coordinate.y + 1 };
}

function diagonalStrategy2(coordinate) {
  return { "x": coordinate.x - 1,
            "y": coordinate.y + 1 };
}

function horizontalStrategy(coordinate) {
  return { "x": coordinate.x + 1,
            "y": coordinate.y };
}

function verticalStrategy(coordinate) {
  return { "x": coordinate.x,
            "y": coordinate.y + 1 };
}

function getCoordinate(column, row) {
  const x = column.getAttribute("data-column-index"),
        y = row.getAttribute("data-row-index");
  return { "x": parseInt(x), "y": parseInt(y) };
}

function handleWin(color) {
  winner = true;
  updateElementbyId("flash", `${capitalize(color)} wins!`);
  color == colorOne ? colorOneWins++ : colorTwoWins++;
  updateScoreboard();
}

function playerWon(array) {
  const strategies = [verticalStrategy, horizontalStrategy,
                      diagonalStrategy1, diagonalStrategy2];
  if (array.length < 4) { return false; }
  for (let i = 0; i < strategies.length; i++) {
    const strategy = strategies[i];
    for (let j = 0; j < array.length; j++) {
      let consecutive = 1,
          coordinate = array[j];
      consecutive = checkSequence(strategy, array, coordinate, consecutive);
      if (consecutive >= 4) { return true; }
    }
  }
  return false;
}

function reset() {
  winner = false;
  colorOneArray = [];
  colorTwoArray = [];
  createBoard();
  currentColor = switchColor(currentColor);
  updateElementbyId("flash", `${capitalize(currentColor)}'s turn`);
  addListeners();
}

function updateElementbyId(id, message) {
  const messageElement = document.querySelector("#" + id);
  messageElement.innerHTML = message;
}

function updateScoreboard() {
  updateElementbyId("scoreboard", `${capitalize(colorOne)}: ${colorOneWins}
    ${capitalize(colorTwo)}: ${colorTwoWins}`);
}

module.exports = {
  initialize,
  addDot,
  addListeners,
  capitalize,
  checkSequence,
  containsCoordinate,
  createBoard,
  createColumn,
  createDot,
  diagonalStrategy1,
  diagonalStrategy2,
  horizontalStrategy,
  verticalStrategy,
  getColorArray,
  getCoordinate,
  handleWin,
  playerWon,
  reset,
  switchColor,
  updateElementbyId,
  updateScoreboard
};
