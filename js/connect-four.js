const DOM = require('./dom');
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
  const selector = `div.dot:not(.${colorOne}):not(.${colorTwo})`;
  const emptyDotArray = Array.from(DOM.selectFromElement(this, selector));
  const emptyDot = emptyDotArray.pop();
  if (!emptyDot || winner) { return; }
  emptyDot.className = `dot ${currentColor}`;
  getColorArray().push(getCoordinate(this, emptyDot));
  if (playerWon(getColorArray())) {
    handleWin(currentColor);
  } else {
    currentColor = switchColor(currentColor);
    DOM.updateElementbyId("flash", `${capitalize(currentColor)}'s turn`);
  }
}

function addListeners() {
  const columns = DOM.columns();
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
  DOM.updateElementbyId("flash", `${capitalize(color)} wins!`);
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
  DOM.createBoard(totalColumns, totalRows);
  currentColor = switchColor(currentColor);
  DOM.updateElementbyId("flash", `${capitalize(currentColor)}'s turn`);
  addListeners();
}

function updateScoreboard() {
  DOM.updateElementbyId("scoreboard", `${capitalize(colorOne)}: ${colorOneWins}
    ${capitalize(colorTwo)}: ${colorTwoWins}`);
}

module.exports = {
  initialize,
  addDot,
  addListeners,
  capitalize,
  checkSequence,
  containsCoordinate,
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
  updateScoreboard
};
