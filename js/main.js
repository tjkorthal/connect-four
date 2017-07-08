const ConnectFour = require('./connect-four.js');

ConnectFour.initialize();
document.getElementById("reset").addEventListener("click", function () { ConnectFour.reset(ConnectFour)});
