var color, rows, columnsGlobal;
color = "red";
rows = 6;
columnsGlobal = 7;

function addDot(){
  var emptyDotArray = Array.from(this.querySelectorAll("div.dot:not(.red):not(.yellow)"));
  var emptyDot = emptyDotArray.pop();
  if (!emptyDot) return;
  emptyDot.className = "dot " + color;
  //check for win
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

function checkWin(){

}

function createBoard(){
  var target = document.querySelector("section.board");
  for (var i = 0; i < columnsGlobal; i++) {
    var columnNode = document.createElement("div");
    columnNode.className = "column";
    for (var j = 0; j < rows; j++) {
      var dotNode = document.createElement("div");
      dotNode.className = "dot";
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

function updateMessage(){
  var messageElement = document.querySelector("#flash");
  messageElement.innerHTML = color + "'s turn";
}
