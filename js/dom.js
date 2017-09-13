// Module to isolate DOM manipulation from game logic
const board = () => document.querySelector("section.board");
const columns = () => document.querySelectorAll(".column");

function createColumn(index) {
  const column = document.createElement("div");
  column.className = "column";
  column.setAttribute("data-column-index", index);
  return column;
}

function createBoard(totalColumns, totalRows) {
  const target = board();
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

function createDot(index) {
  const dot = document.createElement("div");
  dot.className = "dot";
  dot.setAttribute("data-row-index", index);
  return dot;
}

function updateElementbyId(id, message) {
  const messageElement = document.querySelector("#" + id);
  messageElement.innerHTML = message;
}

function selectFromElement(element, selector) {
  return element.querySelectorAll(selector);
}

module.exports = {
  board,
  columns,
  createColumn,
  createBoard,
  updateElementbyId,
  selectFromElement
};
