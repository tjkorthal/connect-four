var color, rows, columnsGlobal, redDots, yellowDots;
color = "red";
rows = 6;
columnsGlobal = 7;
redDots = [];
yellowDots = [];

function addDot(){
  var emptyDotArray = Array.from(this.querySelectorAll("div.dot:not(.red):not(.yellow)"));
  var emptyDot = emptyDotArray.pop();
  if (!emptyDot) return;
  emptyDot.className = "dot " + color;
  updateHash(this,emptyDot,color);
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

function checkWin(){
  //check hashes to see if a player won
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

function initialize(){
  createBoard();
  updateMessage();
  addListeners();
}

function updateHash(column, row, color) {
  var x = column.getAttribute("data-column-index");
  var y = row.getAttribute("data-row-index");
  var hash = color == "red" ? redDots : yellowDots;
  hash.push({"x": parseInt(x), "y": parseInt(y)});
}

function updateMessage(){
  var messageElement = document.querySelector("#flash");
  messageElement.innerHTML = capitalize(color) + "'s turn";
}
