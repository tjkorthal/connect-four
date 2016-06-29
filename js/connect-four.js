"use strict"

var currentColor = "red",
    colorOne = "red",
    colorTwo = "yellow",
    totalRows = 6,
    totalColumns = 7,
    colorOneArray = [],
    colorTwoArray = [],
    winner = false;

function addDot(){
  var emptyDotArray = Array.from(this.querySelectorAll(
      "div.dot:not(."+colorOne+"):not(."+colorTwo+")")),
      emptyDot = emptyDotArray.pop(),
      array = getColorArray();
  if (!emptyDot) return;
  emptyDot.className = "dot " + currentColor;
  updateArray(this,emptyDot,array);
  checkWin();
  if (winner == false){
    currentColor = switchColor(currentColor);
    updateMessage(capitalize(currentColor)+" 's turn");
  }
}

function addListeners(){
  var columns = document.querySelectorAll(".column");
  for (var i = columns.length - 1; i >= 0; i--) {
    columns[i].addEventListener("click", addDot);
  }
}

function capitalize(string){
  return string.charAt(0).toUpperCase() + string.slice(1);
}

function checkWin(){
  var array = getColorArray(),
      strategies;
  if (array.length < 4) {return;}
  strategies = [verticalStrategy, horizontalStrategy, diagonalStrategy1, diagonalStrategy2];
  for (var i = 0; i < strategies.length; i++) {
    var strategy = strategies[i];
    for (var j = 0; j < array.length; j++) {
      var consecutive = 1,
          coordinate = array[j];
      consecutive = checkSequence(strategy, array, coordinate, consecutive);
      if (consecutive == 4) {handleWin(currentColor, strategy);}
    }
  }
}

function checkSequence(method, array, coordinate, index){
  if (containsCoordinate(array,coordinate)){
    var newCoordinate = method(coordinate);
    return index + checkSequence(method, array, newCoordinate, index)
  } else {
    return 0;
  }
}

function containsCoordinate(array, coordinate){
  for (var i = 0; i < array.length; i++) {
    if ( (array[i]["x"] == coordinate["x"]) &&
         (array[i]["y"] == coordinate["y"]) ){
      return true;
    }
  }
  return false;
}

function createBoard(){
  var target = document.querySelector("section.board");
  target.innerHTML = "";
  for (var i = 0; i < totalColumns; i++) {
    var columnNode = document.createElement("div");
    columnNode.className = "column";
    columnNode.setAttribute("data-column-index", i);
    for (var j = totalRows-1; j >= 0; j--) {
      var dotNode = document.createElement("div");
      dotNode.className = "dot";
      dotNode.setAttribute("data-row-index", j);
      columnNode.appendChild(dotNode);
    }
    target.appendChild(columnNode);
  }
}

function diagonalStrategy1(coordinate){
  return {"x": coordinate["x"]+1,
          "y": coordinate["y"]+1 };
}

function diagonalStrategy2(coordinate){
  return {"x": coordinate["x"]-1,
          "y": coordinate["y"]+1 };
}

function horizontalStrategy(coordinate){
  return {"x": coordinate["x"]+1,
          "y": coordinate["y"] };
};

function verticalStrategy(coordinate){
  return {"x": coordinate["x"],
          "y": coordinate["y"]+1 };
};

function getColorArray() {
  return currentColor == colorOne ? colorOneArray : colorTwoArray;
}

function handleWin(color){
  winner = true;
  updateMessage(capitalize(color) + " wins!");
  removeListeners();
}

function initialize(){
  winner = false;
  colorOneArray = [];
  colorTwoArray = [];
  createBoard();
  currentColor = switchColor(currentColor);
  updateMessage(capitalize(currentColor) + "'s turn");
  addListeners();
}

function removeListeners(){
  var columns = document.querySelectorAll(".column");
  for (var i = columns.length - 1; i >= 0; i--) {
    columns[i].removeEventListener("click", addDot);
  }
}

function switchColor(color){
  return (color == colorOne ? colorTwo : colorOne);
}

function updateArray(column, row, array) {
  var x = column.getAttribute("data-column-index"),
      y = row.getAttribute("data-row-index");
  array.push({ "x": parseInt(x), "y": parseInt(y)});
}

function updateMessage(message){
  var messageElement = document.querySelector("#flash");
  messageElement.innerHTML = message;
}
