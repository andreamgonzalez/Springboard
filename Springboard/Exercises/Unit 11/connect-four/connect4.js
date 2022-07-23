/** Connect Four
 *
 * Player 1 and 2 alternate turns. On each turn, a piece is dropped down a
 * column until a player gets four-in-a-row (horiz, vert, or diag) or until
 * board fills (tie)
 */
let red = '#d13636'
let WIDTH = 7;
let HEIGHT = 6;

let currPlayer = 'red'; // active player: 1 or 2
let board = []; // array of rows, each row is array of cells  (board[y][x])
let slotsFilled = 0;
/** makeBoard: create in-JS board structure:
 *    board = array of rows, each row is array of cells  (board[y][x])
 */

let message = document.querySelector('.message');
message.innerText = 'Ay team ' + currPlayer + `, it's your turn!`;
message.style.color= '#d13636';

function makeBoard() {
  // TODO: set "board" to empty HEIGHT x WIDTH matrix array
  for (let y = 0; y < HEIGHT; y++) {
    const row = [];
    for (let x = 0; x < WIDTH; x++) {
      row.push(null);
    }
    board.push(row);
  }
}

/* Springboards Take
function makeBoard() {
  for (let y = 0; y < HEIGHT; y++) {
    board.push(Array.from({ length: WIDTH }));
  }
}
*/

/** makeHtmlBoard: make HTML table and row of column tops. */

function makeHtmlBoard() {

  const htmlBoard = document.querySelector('#board');

  //create a <tr> with set id -> "column-top" for gameplay user interaction
  const top = document.createElement("tr");
  top.setAttribute("id", "column-top");
  //Add a clickon event that will call handleClick.
  top.addEventListener("click", handleClick);

  //Create {width}(7) columns on the board
  for (let x = 0; x < WIDTH; x++) {
    //for each, create <td> with id with the value of x.
    const headCell = document.createElement("td");
    headCell.setAttribute("id", x);
    //append to top row
    top.append(headCell);
  }
  htmlBoard.append(top);

  //Create {HEIGHT}(6) rows on the board
  for (let y = 0; y < HEIGHT; y++) {
    const row = document.createElement("tr");
    //for each row create columns with a <td> with id of value y-x.
    for (let x = 0; x < WIDTH; x++) {
      const cell = document.createElement("td");
      cell.setAttribute("id", `${y}-${x}`);
      row.append(cell);
    }
    htmlBoard.append(row);
  }
}

/** findSpotForCol: given column x, return top empty y (null if filled) */

  //Iterate through column(x) in ascending order/lowest to highest on the board ()
function findSpotForCol(x) {
    for (let firstY = HEIGHT - 1; firstY >= 0; firstY--) {
      //checks that firstY in row in the column does not exist aka is not taken/been played yet
      if (!board[firstY][x]) {
        //returns if above is true
        return firstY;
      }
    } //otherwise column is considered full therefore return null
    return null;
};

/* Springboards Take
function findSpotForCol(x) {
  for (let y = HEIGHT - 1; y >= 0; y--) {
    if (!board[y][x]) {
      return y;
    }
  }
  return null;
  return 0;
}
*/

/** placeInTable: update DOM to place piece into HTML table of board */

function placeInTable(y, x) {
    const piece = document.createElement('div');
    piece.classList.add('piece', `player${currPlayer}`);
    piece.style.top = -50 * (y + 2);

    const slot = document.getElementById(`${y}-${x}`);
    slot.append(piece);
    //count the slot now taken incase there is no winner

    slotsFilled++
}

/** endGame: announce game end */

function endGame(msg) {
  setTimeout(function(){
    message.innerText = 'Congrats Team ' + currPlayer + '!! You Won!';

   }, 600);
  setTimeout( () => restartGame(), 5000);
}

/** handleClick: handle click of column top to play piece */

function handleClick(e) {
  // get x from ID of clicked cell
  const x = +e.target.id;

  // get next spot in column (if none, ignore click)
  const y = findSpotForCol(x);
  if (y === null) {
    return;
  }

  // place piece in board and add to HTML table
  board[y][x] = currPlayer;
  placeInTable(y, x);

  // check for win
  if (checkForWin()) {
    return endGame(`Team ${currPlayer} won the game!`);
  }

  // check for tie
  if(slotsFilled === HEIGHT * WIDTH){
    return endGame(`gee, nobody won!`);
  }

  // switch players
  currPlayer = currPlayer === 'red' ? 'blue' : 'red';

  let message = document.querySelector('.message');
  message.innerText = 'Ay team ' + currPlayer + `, it's your turn!`;
  if (currPlayer === 'red' ? message.style.color='#d13636' : message.style.color='rgb(38, 102, 155)');
}

/** checkForWin: check board cell-by-cell for "does a win start here?" */

function checkForWin() {
  function _win(cells) {
    // Check four cells to see if they're all color of current player
    //  - cells: list of four (y, x) cells
    //  - returns true if all are legal coordinates & all match currPlayer

    return cells.every(
      ([y, x]) =>
        y >= 0 &&
        y < HEIGHT &&
        x >= 0 &&
        x < WIDTH &&
        board[y][x] === currPlayer
    );
  }

  // TODO: read and understand this code. Add comments to help you.

  for (let y = 0; y < HEIGHT; y++) {
    for (let x = 0; x < WIDTH; x++) {
      // get "check list" of 4 cells (starting here) for each of the different ways to win
      let horiz = [[y, x], [y, x + 1], [y, x + 2], [y, x + 3]];
      let vert = [[y, x], [y + 1, x], [y + 2, x], [y + 3, x]];
      let diagDR = [[y, x], [y + 1, x + 1], [y + 2, x + 2], [y + 3, x + 3]];
      let diagDL = [[y, x], [y + 1, x - 1], [y + 2, x - 2], [y + 3, x - 3]];
      // find winner (only checking each win-possibility as needed)
      if (_win(horiz) || _win(vert) || _win(diagDR) || _win(diagDL)) {
        return true;
      }
    }
  }
}

//------------------------------Restart Game----------------------
const restart = document.querySelector(".restart");
restart.addEventListener("click", restartGame);

function restartGame(e) {
  let pieces = document.querySelectorAll(".piece");
  for (let x = 0; x < pieces.length; x++) pieces[x].remove();
  board.length = 0;
  currPlayer = 'red';
  slotsFilled = 0;
  makeBoard();
  message.innerText = 'Ay team ' + currPlayer + `, it's your turn!`;
  message.style.color= '#d13636';
}

makeBoard();
makeHtmlBoard();
