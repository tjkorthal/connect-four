const ConnectFour = require('./connect-four.js');

ConnectFour.initialize();
document.getElementById("reset").addEventListener("click", function () {
  ConnectFour.reset(ConnectFour) });
document.getElementById("start").addEventListener("click", function () {
  document.querySelector(".menu.modal").className += " hide" });
