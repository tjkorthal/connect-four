const ConnectFour = require('./connect-four.js'),
      playerOneEl = document.querySelector("select[name='playerOne']"),
      playerTwoEl = document.querySelector("select[name='playerTwo']");

playerOneEl.addEventListener("change", function () {
  defineConstraint(playerOneEl);
});

playerTwoEl.addEventListener("change", function () {
  defineConstraint(playerTwoEl);
});

document.getElementById("reset").addEventListener("click", function () {
  ConnectFour.reset(ConnectFour)
});

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
