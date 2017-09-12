(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
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

},{}],2:[function(require,module,exports){
const ConnectFour = require('./connect-four'),
      playerOneEl = document.querySelector("select[name='playerOne']"),
      playerTwoEl = document.querySelector("select[name='playerTwo']");

playerOneEl.addEventListener("change", defineConstraint.bind(this, playerOneEl));

playerTwoEl.addEventListener("change", defineConstraint.bind(this, playerTwoEl));

document.getElementById("reset").addEventListener("click",
  ConnectFour.reset.bind(ConnectFour));

document.getElementById("start").addEventListener("click", start);

function defineConstraint(constrainer){
  let constrainee = constrainer === playerOneEl ? playerTwoEl : playerOneEl;
  if(constrainee.value === constrainer.value){
    constrainee.value = "Select";
  }
  document.querySelectorAll(`select[name=${constrainee.name}] option`).forEach((el) => constrainOptions(el, constrainer.value));
}

function constrainOptions(el, selectedValue) {
  if(el.hasAttribute("disabled") && el.value !== selectedValue){
    el.removeAttribute("disabled")
  } else if (!el.hasAttribute("disabled") && el.value === selectedValue) {
    el.removeAttribute("selected");
    el.setAttribute("disabled", true);
  }
}

function start() {
  let values = {
    colorOne: playerOneEl.value,
    colorTwo: playerTwoEl.value,
    totalRows: document.querySelector("input[name='rows']").value || 6,
    totalColumns: document.querySelector("input[name='columns']").value || 7
  };
  ConnectFour.initialize(values);
  document.querySelector(".menu.modal").className += " hide";
  document.getElementById("reset").className = "";
}

},{"./connect-four":1}]},{},[2]);
