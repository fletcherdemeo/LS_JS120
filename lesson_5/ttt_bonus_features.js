let readline = require('readline-sync');

class Square {
  static UNUSED_SQUARE = ' ';
  static HUMAN_MARKER = 'X';
  static COMPUTER_MARKER = 'O';

  constructor(marker = Square.UNUSED_SQUARE) {
    this.marker = marker;
  }

  getMarker() {
    return this.marker;
  }

  setMarker(marker) {
    this.marker = marker;
  }

  toString() {
    return this.marker;
  }

  isUnused() {
    return this.marker === Square.UNUSED_SQUARE;
  }
}

class Board {
  constructor() {
    this.reset();
  }

  reset() {
    this.squares = {};
    for (let counter = 1; counter <= 9; counter += 1) {
      this.squares[counter] = new Square();
    }
  }

  display(initialRun) {
    if (!initialRun) this.clearBoard();
    console.log("");
    console.log("     |     |");
    console.log(`  ${this.squares['1']}  |  ${this.squares['2']}  |  ${this.squares['3']}`);
    console.log("     |     |");
    console.log("-----+-----+-----");
    console.log("     |     |");
    console.log(`  ${this.squares['4']}  |  ${this.squares['5']}  |  ${this.squares['6']}`);
    console.log("     |     |");
    console.log("-----+-----+-----");
    console.log("     |     |");
    console.log(`  ${this.squares['7']}  |  ${this.squares['8']}  |  ${this.squares['9']}`);
    console.log("     |     |");
    console.log("");
  }

  clearBoard() {
    console.clear();
    console.log("");
    console.log("");
  }

  isFull() {
    return this.unusedSquares().length === 0;
  }

  unusedSquares() {
    let keys = Object.keys(this.squares);
    return keys.filter(key => this.squares[key].isUnused());
  }

  countMarkersFor(player, keys) {
    let markers = keys.filter(key => {
      return this.squares[key].getMarker() === player.getMarker();
    });

    return markers.length;
  }

  markSquareAt(key, marker) {
    this.squares[key].setMarker(marker);
  }
}

class Player {
  constructor(marker) {
    this.marker = marker;
    this.score = 0;
  }

  getMarker() {
    return this.marker;
  }

  getScore() {
    return this.score;
  }

  incrementScore() {
    this.score += 1;
  }
}

class Human extends Player {
  constructor() {
    super(Square.HUMAN_MARKER);
  }
}

class Computer extends Player {
  constructor() {
    super(Square.COMPUTER_MARKER);
  }
}

class TTTGame {
  static MATCH_GOAL = 3;
  static POSSIBLE_WINNING_MOVES = [
    [ "1", "2", "3" ],
    [ "4", "5", "6" ],
    [ "7", "8", "9" ],
    [ "1", "4", "7" ],
    [ "2", "5", "8" ],
    [ "3", "6", "9" ],
    [ "1", "5", "9" ],
    [ "3", "5", "7" ]
  ];

  constructor() {
    this.board = new Board();
    this.human = new Human();
    this.computer = new Computer();
    this.firstPlayer = this.human;
    this.initialRun = true;
  }

  play() {
    this.displayWelcomeMessage();
    this.playMatch();
    this.displayGoodbyeMessage();
  }

  playMatch() {
    console.log(`First player to win ${TTTGame.MATCH_GOAL} games wins the match`);

    while (true) {
      this.playGame();
      this.recordScore();
      this.displayScore();
      if (this.matchOver() || !this.playAgain()) break;
      this.firstPlayer = this.changePlayer(this.firstPlayer);
    }

    this.displayMatchWinner();
  }

  playGame() {
    let currentPlayer = this.firstPlayer;
    this.board.reset();

    while (true) {
      this.board.display(this.initialRun);
      this.initialRun = false;
      this.playerMoves(currentPlayer);
      if (this.gameOver()) break;
      currentPlayer = this.changePlayer(currentPlayer);
    }

    this.displayResults();
  }

  playAgain() {
    const validChoices = ['y', 'n'];
    let choice;

    while (true) {
      const prompt = `Play again (y/n): `;
      choice = readline.question(prompt).toLowerCase();

      if (validChoices.includes(choice)) break;

      console.log("Sorry, that's not a valid choice.");
      console.log('');
    }

    return choice === 'y';
  }

  displayWelcomeMessage() {
    console.clear();
    console.log('Welcome to Tic Tac Toe!');
  }

  displayGoodbyeMessage() {
    console.log('Thanks for playing Tic Tac Toe! Goodbye!');
  }

  displayResults() {
    this.board.display();
    if (this.isWinner(this.human)) {
      console.log('You won! Congratulations!');
    } else if (this.isWinner(this.computer)) {
      console.log('I won! I won! Take that, human!');
    } else {
      console.log('A tie game. How boring.');
    }
  }

  displayMatchWinner() {
    let message;
    if (this.human.score > this.computer.score) {
      message = 'Congratulations you won the match!';
    } else {
      message = "Unlucky, I'm the matchwinner!";
    }

    console.log(message);
  }

  changePlayer(player) {
    return player === this.human ? this.computer : this.human;
  }

  playerMoves(player) {
    if (player === this.human) {
      this.humanMoves();
    } else if (player === this.computer) {
      this.computerMoves();
    }
  }

  humanMoves() {
    let choice;

    while (true) {
      let validChoices = this.board.unusedSquares();
      const prompt = `Choose a square (${TTTGame.joinOr(validChoices)}): `;
      choice = readline.question(prompt);

      if (validChoices.includes(choice)) break;

      console.log("Sorry, that's not a valid choice.");
      console.log('');
    }

    this.board.markSquareAt(choice, this.human.getMarker());
  }

  computerMoves() {
    let offensiveMove = this.winnableMoves(this.computer, this.human);
    let defensiveMove = this.winnableMoves(this.human, this.computer);
    let middleSquare = this.middleSquare();

    let choice = (
      offensiveMove ||
      defensiveMove ||
      middleSquare ||
      this.randomChoice()
    );

    this.board.markSquareAt(choice, this.computer.getMarker());
  }

  randomChoice() {
    let choice;
    let validChoices = this.board.unusedSquares();
    do {
      choice = Math.floor((9 * Math.random()) + 1).toString();
    } while (!validChoices.includes(choice));
    return choice;
  }

  getAtRiskRows(player1, player2) {
    return TTTGame.POSSIBLE_WINNING_MOVES
      .filter(row => {
        return (
          this.board.countMarkersFor(player1, row) === (
            TTTGame.MATCH_GOAL - 1
          ) &&
          this.board.countMarkersFor(player2, row) !== (
            TTTGame.MATCH_GOAL - 2
          )
        );
      });
  }

  winnableMoves(player1, player2) {
    let validChoices = this.board.unusedSquares();
    let rows = this.getAtRiskRows(player1, player2);

    let move;
    for (let ind1 = 0; ind1 < validChoices.length; ind1 += 1) {
      let option = validChoices[ind1];
      for (let ind2 = 0; ind2 < rows.length; ind2 += 1) {
        let row = rows[ind2];
        if (row.includes(option)) move = option;
      }
    }

    return move;
  }

  middleSquare() {
    let validChoices = this.board.unusedSquares();
    return validChoices.includes('5') ? '5' : null;
  }

  gameOver() {
    return this.board.isFull() || this.someoneWon();
  }

  someoneWon() {
    return this.isWinner(this.human) || this.isWinner(this.computer);
  }

  isWinner(player) {
    return TTTGame.POSSIBLE_WINNING_MOVES.some(row => {
      return this.board.countMarkersFor(player, row) === TTTGame.MATCH_GOAL;
    });
  }

  matchOver() {
    return (
      this.human.score  >= TTTGame.MATCH_GOAL ||
      this.computer.score >= TTTGame.MATCH_GOAL
    );
  }

  recordScore() {
    if (this.isWinner(this.human)) {
      this.human.incrementScore();
    } else if (this.isWinner(this.computer)) {
      this.computer.incrementScore();
    }
  }

  displayScore() {
    let humanScoreStr = `Human: ${this.human.score}`;
    let computerScoreStr = `Computer: ${this.computer.score}`;
    console.log(`CURRENT SCORE -- ${humanScoreStr} : ${computerScoreStr}`);
  }

  static joinOr(arr, delimiter = ', ', finalDelimiter = 'or') {
    if (arr.length <= 2) {
      return arr.join(` ${finalDelimiter} `);
    }

    let lastInd = arr.length - 1;
    let str1 = arr.slice(0, lastInd).join(delimiter);
    let str2 = `${finalDelimiter} ${arr[lastInd]}`;
    return `${str1}${delimiter}${str2}`;
  }
}

let game = new TTTGame();
game.play();