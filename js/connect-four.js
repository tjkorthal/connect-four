"use strict"

var color = "red",
    rows = 6,
    columnsGlobal = 7,
    redArray = [],
    yellowArray = [],
    winner = false;

function addDot(){
  var emptyDotArray = Array.from(this.querySelectorAll("div.dot:not(.red):not(.yellow)"));
  var emptyDot = emptyDotArray.pop();
  if (!emptyDot) return;
  emptyDot.className = "dot " + color;
  updateArray(this,emptyDot,color);
  checkWin();
  if (winner == false){
    //switch color
    color = (color == "red" ? "yellow" : "red");
    updateMessage();
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
          xIndex = array[j][0],
          yIndex = array[j][1];
      consecutive = checkSequence(strategy, array, [xIndex,yIndex], consecutive);
      if (consecutive == 4) {handleWin(color, strategy);}
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
  var x = coordinate[0],
      y = coordinate[1];
  for (var i = 0; i < array.length; i++) {
    if ( (array[i][0] == x) && (array[i][1] == y) ){
      return true;
    }
  }
  return false;
}

function createBoard(){
  var target = document.querySelector("section.board");
  target.innerHTML = "";
  for (var i = 0; i < columnsGlobal; i++) {
    var columnNode = document.createElement("div");
    columnNode.className = "column";
    columnNode.setAttribute("data-column-index", i);
    for (var j = rows-1; j >= 0; j--) {
      var dotNode = document.createElement("div");
      dotNode.className = "dot";
      dotNode.setAttribute("data-row-index", j);
      columnNode.appendChild(dotNode);
    }
    target.appendChild(columnNode);
  }
}

function diagonalStrategy1(coordinate){
  return [coordinate[0]+1,coordinate[1]+1];
}

function diagonalStrategy2(coordinate){
  return [coordinate[0]-1,coordinate[1]+1];
}

function horizontalStrategy(coordinate){
  return [coordinate[0]+1,coordinate[1]];
};

function verticalStrategy(coordinate){
  return [coordinate[0],coordinate[1]+1];
};

function getColorArray() {
  return color == "red" ? redArray : yellowArray;
}

function handleWin(color, strategy){
  var messageElement = document.querySelector("#flash");
  messageElement.innerHTML = capitalize(color) + " wins!";
  removeListeners();
  winner = true;
}

function initialize(){
  winner = false;
  redArray = [];
  yellowArray = [];
  createBoard();
  updateMessage();
  addListeners();
}

function removeListeners(){
  var columns = document.querySelectorAll(".column");
  for (var i = columns.length - 1; i >= 0; i--) {
    columns[i].removeEventListener("click", addDot);
  }
}

function updateArray(column, row, color) {
  var x = column.getAttribute("data-column-index"),
      y = row.getAttribute("data-row-index"),
      array = getColorArray();
  array.push([parseInt(x), parseInt(y)]);
}

function updateMessage(){
  var messageElement = document.querySelector("#flash");
  messageElement.innerHTML = capitalize(color) + "'s turn";
}
