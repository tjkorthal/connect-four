// Public API for Connect Four game
const ConnectFour = require('./connect-four');

module.exports = {
  initialize: ConnectFour.initialize,
  reset: ConnectFour.reset
}
