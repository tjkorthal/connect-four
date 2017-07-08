# connect-four
The game Connect Four written in JavaScript. Two players alternate between placing dots with the intention of having four of their color in a row, either horizontally, vertically, or diagonally, before the other player can. The current release can be played [here](https://tjkorthal.github.io/connect-four/)!

Inspired by tobychin's design of his [binary clock](https://github.com/tobychin/binary-clock).

## Installing / Getting started

To play the game simply clone the project and open index.html in a web browser.

## Developing

### Dependencies

* Node.js
* Browserify
* tape
* faucet


### Prerequisites

You'll need [Node.js](https://nodejs.org/en/download/) installed

### Setting up Dev

Clone the project and cd into the directory, then install depenencies with NPM.

```shell
git clone https://github.com/tjkorthal/connect-four
cd connect-four/
npm install
```

### Building

Some magic needs to happen before changes can be used in the web app. I use Browserify to allow the modules to be required on the client side.

```shell
cd js/
browserify main.js > bundle.js
```

Move into the js directory and tell Browserify to package our code into bundle.js, which will be loaded in index.html.

## Tests

Tests are written utilizing tape and can be run by simply running the NPM test script. The output is piped through faucet to pretty print test results.

```shell
npm test
```
Output:
```
> @tjkorthal/connect-four@1.0.0 test /Users/tjkorthal/Projects/connect-four
> node tests/test.js | faucet

✓ capitalize capitalizes the first letter of a string
✓ switchColor changes between the 2 colors used in the game
✓ strategies return the next coordinate in a direction
✓ containsCoordinate returns a boolean
✓ checkSequence returns the number of points in a sequence
# tests 15
# pass  15
✓ ok
```

## Style guide

Code should more or less conform to [Airbnb's styleguide](https://github.com/airbnb/javascript). I use ESLint and its VSCode extension to highlight formatting errors.
