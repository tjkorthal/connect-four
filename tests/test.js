const test = require('tape');
const ConnectFour = require('../js/connect-four.js');

test('capitalize capitalizes the first letter of a string', function (assert) {
  assert.equal(ConnectFour.capitalize('tylo'), 'Tylo');
  assert.equal(ConnectFour.capitalize('tylo ren'), 'Tylo ren');
  assert.end();
});

test('switchColor changes between the 2 colors used in the game', function (assert){
  const reset = ConnectFour.reset,
        updateScoreboard = ConnectFour.updateScoreboard;
  ConnectFour.reset = function () { return; };
  ConnectFour.updateScoreboard = function () { return; };
  ConnectFour.initialize();
  assert.equal(ConnectFour.switchColor('red'), 'yellow');
  assert.equal(ConnectFour.switchColor('yellow'), 'red');
  assert.equal(ConnectFour.switchColor('green'), 'red');
  assert.equal(ConnectFour.switchColor('Tyler'), 'red');
  assert.equal(ConnectFour.switchColor(4), 'red');
  assert.end();
  ConnectFour.reset = reset;
  ConnectFour.updateScoreboard = updateScoreboard;
});

test('strategies return the next coordinate in a direction', function (assert){
  assert.same(ConnectFour.diagonalStrategy1({ x: 0, y: 0 }), { x: 1, y: 1 });
  assert.same(ConnectFour.diagonalStrategy2({ x: 1, y: 0 }), { x: 0, y: 1 });
  assert.same(ConnectFour.horizontalStrategy({ x: 0, y: 0 }), { x: 1, y: 0 });
  assert.same(ConnectFour.verticalStrategy({ x: 0, y: 0 }), { x: 0, y: 1 });
  assert.end();
});

test('containsCoordinate returns a boolean', function (assert){
  const array = [{ x: 0, y: 0 }, { x: 1, y: 1 }, { x: 3, y: 2 }];
  assert.true(ConnectFour.containsCoordinate(array, { x: 0, y: 0 }));
  assert.false(ConnectFour.containsCoordinate(array, { x: 2, y: 1 }));
  assert.end();
});

test('checkSequence returns the number of points in a sequence', function (assert){
  const array = [{ x: 0, y: 0 }, { x: 1, y: 1 }, { x: 3, y: 2 }];
  assert.equal(ConnectFour.checkSequence(ConnectFour.diagonalStrategy1, array, { x: 0, y: 0 }, 1), 2 );
  assert.equal(ConnectFour.checkSequence(ConnectFour.diagonalStrategy1, array, { x: 4, y: 0 }, 1), 0 );
  assert.end();
});

test('playerWon returns if there is a run of 4 points in an array', function (assert){
  const diagonalArray = [{ x: 0, y: 0 }, { x: 1, y: 1 }, { x: 2, y: 2 }, { x: 3, y: 3 }],
        horizontalArray = [{ x: 0, y: 0 }, { x: 0, y: 1 }, { x: 0, y: 3 }, { x: 0, y: 2 }],
        verticalArray = [{ x: 0, y: 0 }, { x: 1, y: 0 }, { x: 2, y: 0 }, { x: 3, y: 0 }],
        noWin = [{ x: 0, y: 0 }, { x: 1, y: 0 }, { x: 3, y: 2 }, { x: 3, y: 3 }];
  assert.true(ConnectFour.playerWon(diagonalArray));
  assert.true(ConnectFour.playerWon(horizontalArray));
  assert.true(ConnectFour.playerWon(verticalArray));
  assert.false(ConnectFour.playerWon(noWin));
  assert.end();
});
