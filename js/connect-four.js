(function () {
  let currentColor = "red",
      colorOne = "red",
      colorTwo = "yellow",
      totalRows = 6,
      totalColumns = 7,
      colorOneArray = [],
      colorTwoArray = [],
      colorOneWins = 0,
      colorTwoWins = 0,
      winner = false;

  initialize();
  document.getElementById("reset").addEventListener("click", initialize);

  function addDot() {
    const emptyDotArray = Array.from(this.querySelectorAll(
        `div.dot:not(.${colorOne}):not(.${colorTwo})`)),
          emptyDot = emptyDotArray.pop(),
          array = getColorArray();
    if (!emptyDot){ return; }
    emptyDot.className = `dot ${currentColor}`;
    updateArray(this, emptyDot, array);
    checkWin();
    if (winner === false) {
      currentColor = switchColor(currentColor);
      updateElementbyId("flash", `${capitalize(currentColor)}'s turn`);
    }
  }

  function addListeners() {
    const columns = document.querySelectorAll(".column");
    for (let i = columns.length - 1; i >= 0; i--) {
      columns[i].addEventListener("click", addDot);
    }
  }

  function capitalize(string) {
    return string.charAt(0).toUpperCase() + string.slice(1);
  }

  function checkWin() {
    const array = getColorArray(),
          strategies = [verticalStrategy, horizontalStrategy, diagonalStrategy1,
                      diagonalStrategy2];
    if (array.length < 4) { return; }
    for (let i = 0; i < strategies.length; i++) {
      let strategy = strategies[i];
      for (let j = 0; j < array.length; j++) {
        let consecutive = 1,
            coordinate = array[j];
        consecutive = checkSequence(strategy, array, coordinate, consecutive);
        if (consecutive >= 4) { handleWin(currentColor, strategy); }
      }
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
      if ((array[i]["x"] == coordinate["x"]) &&
          (array[i]["y"] == coordinate["y"])) {
        return true;
      }
    }
    return false;
  }

  function createBoard() {
    const target = document.querySelector("section.board");
    target.innerHTML = "";
    for (let i = 0; i < totalColumns; i++) {
      const columnNode = document.createElement("div");
      columnNode.className = "column";
      columnNode.setAttribute("data-column-index", i);
      for (let j = totalRows - 1; j >= 0; j--) {
        const dotNode = document.createElement("div");
        dotNode.className = "dot";
        dotNode.setAttribute("data-row-index", j);
        columnNode.appendChild(dotNode);
      }
      target.appendChild(columnNode);
    }
  }

  function diagonalStrategy1(coordinate) {
    return { "x": coordinate["x"] + 1,
             "y": coordinate["y"] + 1 };
  }

  function diagonalStrategy2(coordinate) {
    return { "x": coordinate["x"] - 1,
             "y": coordinate["y"] + 1 };
  }

  function horizontalStrategy(coordinate) {
    return { "x": coordinate["x"] + 1,
             "y": coordinate["y"] };
  }

  function verticalStrategy(coordinate) {
    return { "x": coordinate["x"],
             "y": coordinate["y"] + 1 };
  }

  function getColorArray() {
    return currentColor === colorOne ? colorOneArray : colorTwoArray;
  }

  function handleWin(color) {
    winner = true;
    updateElementbyId("flash", `${capitalize(color)} wins!`);
    color == colorOne ? colorOneWins++ : colorTwoWins++;
    updateElementbyId("scoreboard", `${capitalize(colorOne)}: ${colorOneWins}
      ${capitalize(colorTwo)}: ${colorTwoWins}`);
    removeListeners();
  }

  function initialize() {
    winner = false;
    colorOneArray = [];
    colorTwoArray = [];
    createBoard();
    currentColor = switchColor(currentColor);
    updateElementbyId("flash", `${capitalize(currentColor)}'s turn`);
    addListeners();
  }

  function removeListeners() {
    const columns = document.querySelectorAll(".column");
    for (let i = columns.length - 1; i >= 0; i--) {
      columns[i].removeEventListener("click", addDot);
    }
  }

  function switchColor(color) {
    return (color === colorOne ? colorTwo : colorOne);
  }

  function updateArray(column, row, array) {
    const x = column.getAttribute("data-column-index"),
          y = row.getAttribute("data-row-index");
    array.push({ "x": parseInt(x), "y": parseInt(y) });
  }

  function updateElementbyId(id, message) {
    const messageElement = document.querySelector("#" + id);
    messageElement.innerHTML = message;
  }
}());
