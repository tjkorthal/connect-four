"use strict"

var color = "red",
    rows = 6,
    columnsGlobal = 7,
    redArray = [],
    yellowArray = [];

function addDot(){
  var emptyDotArray = Array.from(this.querySelectorAll("div.dot:not(.red):not(.yellow)"));
  var emptyDot = emptyDotArray.pop();
  if (!emptyDot) return;
  emptyDot.className = "dot " + color;
  updateArray(this,emptyDot,color);
  checkWin();
  //switch color
  color = (color == "red" ? "yellow" : "red");
  updateMessage();
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

//http://stackoverflow.com/questions/1129216/sort-array-of-objects-by-string-property-value-in-javascript
function compare(a,b) {
  if (a.x < b.x)
    return -1;
  if (a.x > b.x)
    return 1;
  return 0;
}

function compareArrays(a,b) {
  if (a[0] < b[0])
    return -1;
  if (a[0] > b[0])
    return 1;
  return 0;
}

function checkWin(){
  var array = getColorArray(),
      win = false,
      consecutive = 1,
      xCount = {},
      yCount = {};
  if (array.length < 4) {return;}
  array.sort(compareArrays);
  //count number dots per column
  for (var i = 0; i < array.length; i++) {
    //     currentY = array[i].y;
    var currentX = array[i][0],
        currentY = array[i][1];
    if (xCount[currentX] === undefined){
      xCount[currentX] = 1;
    } else {
      xCount[currentX]++;
    }
    if (yCount[currentY] === undefined){
      yCount[currentY] = 1;
    } else {
      yCount[currentY]++;
    }
  }
  console.log("X count: ");
  console.log(xCount);
  console.log("Y count: ");
  console.log(yCount);

  for (var property in xCount) {
    if (xCount.hasOwnProperty(property)) {
      if (xCount[property] > 3) {
        checkVertical(array);
      }
    }
  }

  for (var property in yCount) {
    if (yCount.hasOwnProperty(property)) {
      if (yCount[property] > 3) {
        checkHorizontal(array);
      }
    }
  }
}

function checkDiagonal(array) {

}

function checkHorizontal(array){
  var keepSearching = true,
      consecutive = 1,
      xIndex,
      yIndex;
  for (var i = 0; i < array.length; i++) {
    if (xIndex === undefined){ xIndex = array[i][0]; }
    if (yIndex === undefined || yIndex != array[i][1]){
      yIndex = array[i][1];
      consecutive = 1;
    }
    keepSearching = (array[i][0] == xIndex+1) && (array[i][1] == yIndex);
    if (!keepSearching) {continue;}
    consecutive++;
    yIndex++;
    if (consecutive == 4) {alert(capitalize(color)+" wins!");}
  }
}

function checkVertical(array){
  var keepSearching = true,
      consecutive = 1,
      xIndex,
      yIndex;
  for (var i = 0; i < array.length; i++) {
    if (xIndex === undefined || xIndex != array[i][0]){
      xIndex = array[i][0];
      consecutive = 1;
    }
    if (yIndex === undefined){ yIndex = array[i][1]; }
    keepSearching = (array[i][0] == xIndex) && (array[i][1] == yIndex+1);
    if (!keepSearching) {continue;}
    consecutive++;
    yIndex++;
    if (consecutive == 4) {alert(capitalize(color)+" wins!");}
  }
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

function getColorArray() {
  return color == "red" ? redArray : yellowArray;
}

function initialize(){
  redArray = [];
  yellowArray = [];
  createBoard();
  updateMessage();
  addListeners();
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
