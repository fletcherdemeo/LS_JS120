const readline = require('readline-sync');
const WINNING_MOVES = {
  rock: ['lizard', 'scissors'],
  paper: ['rock', 'spock'],
  scissors: ['paper', 'lizard'],
  spock: ['scissors', 'rock'],
  lizard: ['spock', 'paper'],
};
const NUMBER_OF_ROUNDS = 5;

// eslint-disable-next-line max-lines-per-function
function createPlayer() {
  return {
    move: null,
    score: 0,
    history: {
      rock: [], paper: [], scissors: [], spock: [], lizard: []
    },

    getRecord(resultType) {
      let record = {};

      for (let type in this.history) {
        let wins = this.history[type]
          .filter(game => game === resultType).length;
        let total = this.history[type].length;
        if (total > 0) {
          record[type] = Math.floor(wins / total * 100);
        }
      }

      return record;
    },
  };
}

// eslint-disable-next-line max-lines-per-function
function createComputer() {
  let playerObject = createPlayer();

  let computerObject = {
    odds: {
      rock: 20,
      paper: 20,
      scissors: 20,
      spock: 20,
      lizard: 20,
    },

    calculateOdds() {
      let odds = this.odds;
      let record = this.getRecord('win');

      for (let type in record) {
        if (record[type] > 70) odds[type] = 50;
        else if (record[type] > 60) odds[type] = 40;
        else if (record[type] > 50) odds[type] = 30;
        else if (record[type] > 40) odds[type] = 20;
        else if (record[type] > 30) odds[type] = 15;
        else if (record[type] > 20) odds[type] = 10;
        else odds[type] = 5;
      }

      let total = Object.values(odds)
        .reduce((acc, curr) => acc + curr);
      let adjustPercent = 100 / total;

      for (let type in odds) {
        odds[type] = Math.floor(odds[type] * adjustPercent);
      }
    },

    getOdds() {
      let sizeOfArray = Object.values(this.odds)
        .reduce((acc, curr) => acc + curr);
      let choices = new Array(sizeOfArray);
      let start = 0;
      for (let type in this.odds) {
        let end = start + this.odds[type];
        choices.fill(type, start, end);
        start += this.odds[type];
      }

      return choices;
    },

    choose() {
      this.calculateOdds();
      const choices = this.getOdds();
      let randomIndex = Math.floor(Math.random() * choices.length);
      this.move = choices[randomIndex];
    }
  };

  return Object.assign(playerObject, computerObject);
}

// eslint-disable-next-line max-lines-per-function
function createHuman() {
  let playerObject = createPlayer();

  let humanObject = {
    choose() {
      let choice;

      while (true) {
        console.log(
          'Please choose (r)ock, (p)aper, (sc)issors, (sp)ock or (l)izard:'
        );
        choice = readline.question();
        if (choice === 'r') choice = 'rock';
        else if (choice === 'p') choice = 'paper';
        else if (choice === 'sc') choice = 'scissors';
        else if (choice === 'sp') choice = 'spock';
        else if (choice === 'l') choice = 'lizard';
        if (
          ['rock', 'paper', 'scissors', 'spock', 'lizard',]
            .includes(choice)
        ) break;
        console.log('Sorry, invalid choice.');
      }

      this.move = choice;
    }
  };

  return Object.assign(playerObject, humanObject);
}

const RPSGame = {
  human: createHuman(),
  computer: createComputer(),

  displayWelcomeMessage() {
    console.log('Welcome to Rock, Paper, Scissors, Spock, Lizard!');
  },

  gameOver() {
    return (
      this.human.score < NUMBER_OF_ROUNDS &&
      this.computer.score < NUMBER_OF_ROUNDS
    );
  },

  displayChoices() {
    console.log(`You chose: ${this.human.move}`);
    console.log(`The computer chose: ${this.computer.move}`);
  },

  determineResult() {
    if (this.human.move === this.computer.move) {
      return 'tie';
    } else if (
      WINNING_MOVES[this.human.move].includes(this.computer.move)
    ) {
      return 'human';
    } else {
      return 'computer';
    }
  },

  displayWinner(result) {
    if (result === 'human') console.log('You won!');
    if (result === 'computer') console.log('Computer won!');
    if (result === 'tie') console.log("It's a tie");
  },

  incrementScores(result) {
    if (result === 'human') this.human.score += 1;
    if (result === 'computer') this.computer.score += 1;
  },

  updateHistories(result) {
    if (result === 'human') {
      this.human.history[this.human.move].push('win');
      this.computer.history[this.computer.move].push('loss');
    } else if (result === 'computer') {
      this.human.history[this.human.move].push('loss');
      this.computer.history[this.computer.move].push('win');
    } else {
      this.human.history[this.human.move].push('tie');
      this.computer.history[this.computer.move].push('tie');
    }
  },

  displayScore() {
    console.log(
      `Score is - human: ${this.human.score} computer: ${this.computer.score}`
    );
  },

  displayOverallWinner() {
    let overallWinner = this.human.score > this.computer.score ?
      'You are' :
      'Computer is';
    console.log(`${overallWinner} the overall winner!`);
  },

  playAgain() {
    this.human.score = 0;
    this.computer.score = 0;
    console.log('Would you like to play again? (y/n)');
    let answer;
    while (true) {
      answer = readline.question().toLowerCase();
      if (['yes', 'no', 'y', 'n'].includes(answer)) break;
      console.log('Please enter (y)es to play again or (n)o to exit:');
    }

    return answer[0] === 'y';
  },

  displayGoodbyeMessage() {
    console.log(
      'Thanks for playing Rock, Paper, Scissors, Spock, Lizard. Goodbye!'
    );
  },

  play() {
    console.clear();
    this.displayWelcomeMessage();
    while (true) {
      while (this.gameOver()) {
        this.human.choose();
        this.computer.choose();
        console.clear();
        this.displayChoices();
        let result = this.determineResult();
        this.displayWinner(result);
        this.incrementScores(result);
        this.updateHistories(result);
        this.displayScore();
      }
      this.displayOverallWinner();
      if (!this.playAgain()) break;
      console.clear();
    }

    console.clear();
    this.displayGoodbyeMessage();
  },
};

RPSGame.play();