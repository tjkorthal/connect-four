(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
module.exports = (function () {
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

  return {
    initialize: function (opts = {}) {
      const self = this;
      ({ colorOne = "red", colorTwo = "yellow", totalRows = 6, totalColumns = 7 } = opts);
      currentColor = colorOne;
      this.reset(self);
    },
    addDot: function (context) {
      const emptyDotArray = Array.from(context.querySelectorAll(
          `div.dot:not(.${colorOne}):not(.${colorTwo})`)),
            emptyDot = emptyDotArray.pop();
      if (!emptyDot || winner){ return; }
      emptyDot.className = `dot ${currentColor}`;
      this.getColorArray().push(this.getCoordinate(context, emptyDot));
      if (this.playerWon(this.getColorArray())) {
        this.handleWin(currentColor);
      } else {
        currentColor = this.switchColor(currentColor);
        this.updateElementbyId("flash", `${this.capitalize(currentColor)}'s turn`);
      }
    },
    addListeners: function () {
      const columns = document.querySelectorAll(".column"),
            self = this;
      for (let i = columns.length - 1; i >= 0; i--) {
        (function(i, self) {
          columns[i].addEventListener("click", function () { self.addDot(this) });
        })(i, self);
      }
    },
    capitalize: function (string) {
      return string.charAt(0).toUpperCase() + string.slice(1);
    },
    checkSequence: function (method, array, coordinate, index) {
      if (this.containsCoordinate(array, coordinate)) {
        const newCoordinate = method(coordinate);
        return index + this.checkSequence(method, array, newCoordinate, index);
      }
      return 0;
    },
    containsCoordinate: function (array, coordinate) {
      for (let i = 0; i < array.length; i++) {
        if ((array[i]["x"] == coordinate["x"]) &&
            (array[i]["y"] == coordinate["y"])) {
          return true;
        }
      }
      return false;
    },
    createBoard: function () {
      const target = document.querySelector("section.board");
      target.innerHTML = "";
      for (let i = 0; i < totalColumns; i++) {
        const columnNode = this.createColumn(i);
        for (let j = totalRows - 1; j >= 0; j--) {
          const dotNode = this.createDot(j);
          columnNode.appendChild(dotNode);
        }
        target.appendChild(columnNode);
      }
    },
    createColumn: function (index) {
      const column = document.createElement("div");
      column.className = "column";
      column.setAttribute("data-column-index", index);
      return column;
    },
    createDot: function (index) {
      const dot = document.createElement("div");
      dot.className = "dot";
      dot.setAttribute("data-row-index", index);
      return dot;
    },
    diagonalStrategy1: function (coordinate) {
      return { "x": coordinate["x"] + 1,
               "y": coordinate["y"] + 1 };
    },
    diagonalStrategy2: function (coordinate) {
      return { "x": coordinate["x"] - 1,
               "y": coordinate["y"] + 1 };
    },
    horizontalStrategy: function (coordinate) {
      return { "x": coordinate["x"] + 1,
               "y": coordinate["y"] };
    },
    verticalStrategy: function (coordinate) {
      return { "x": coordinate["x"],
               "y": coordinate["y"] + 1 };
    },
    getColorArray: function () {
      return currentColor === colorOne ? colorOneArray : colorTwoArray;
    },
    getCoordinate: function (column, row) {
      const x = column.getAttribute("data-column-index"),
            y = row.getAttribute("data-row-index");
      return { "x": parseInt(x), "y": parseInt(y) };
    },
    handleWin: function (color) {
      winner = true;
      this.updateElementbyId("flash", `${this.capitalize(color)} wins!`);
      color == colorOne ? colorOneWins++ : colorTwoWins++;
      this.updateElementbyId("scoreboard", `${this.capitalize(colorOne)}: ${colorOneWins}
        ${this.capitalize(colorTwo)}: ${colorTwoWins}`);
    },
    playerWon: function (array) {
      const strategies = [this.verticalStrategy, this.horizontalStrategy,
                          this.diagonalStrategy1, this.diagonalStrategy2];
      if (array.length < 4) { return false; }
      for (let i = 0; i < strategies.length; i++) {
        let strategy = strategies[i];
        for (let j = 0; j < array.length; j++) {
          let consecutive = 1,
              coordinate = array[j];
          consecutive = this.checkSequence(strategy, array, coordinate, consecutive);
          if (consecutive >= 4) { return true; }
        }
      }
      return false;
    },
    reset: function (context) {
      winner = false;
      colorOneArray = [];
      colorTwoArray = [];
      context.createBoard();
      currentColor = context.switchColor(currentColor);
      context.updateElementbyId("flash", `${context.capitalize(currentColor)}'s turn`);
      context.addListeners();
    },
    switchColor: function (color) {
      return (color === colorOne ? colorTwo : colorOne);
    },
    updateElementbyId: function (id, message) {
      const messageElement = document.querySelector("#" + id);
      messageElement.innerHTML = message;
    }
  };
})();

},{}],2:[function(require,module,exports){
const ConnectFour = require('./connect-four.js');

function startMenu(){
  // TODO: add options on load for colors and board size
  const element = document.querySelector("nav.menu");
}

ConnectFour.initialize();
document.getElementById("reset").addEventListener("click", function () { ConnectFour.reset(ConnectFour)});

},{"./connect-four.js":1}]},{},[2]);
