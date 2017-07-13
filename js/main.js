const ConnectFour = require('./connect-four.js'),
      playerOneEl = document.querySelector("select[name='playerOne']"),
      playerTwoEl = document.querySelector("select[name='playerTwo']");

playerOneEl.addEventListener("change", function () {
  if(playerTwoEl.value === playerOneEl.value){
    playerTwoEl.value = "Select";
  }
  document.querySelectorAll("select[name='playerTwo'] option").forEach((el) => constrainOptions(el, playerOneEl.value));
});

playerTwoEl.addEventListener("change", function () {
  if(playerOneEl.value === playerTwoEl.vaue){
    playerOneEl.value = "Select";
  }
  document.querySelectorAll("select[name='playerOne'] option").forEach((el) => constrainOptions(el, playerTwoEl.value));
});

document.getElementById("reset").addEventListener("click", function () {
  ConnectFour.reset(ConnectFour)
});

document.getElementById("start").addEventListener("click", start);

function constrainOptions(el, optionValue) {
  if(el.hasAttribute("disabled") && el.value !== optionValue){
    el.removeAttribute("disabled")
  } else if (!el.hasAttribute("disabled") && el.value === optionValue) {
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
