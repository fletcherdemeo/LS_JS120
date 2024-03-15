const readline = require('readline-sync');
const WINNING_MOVES = {
  rock: ['lizard', 'scissors'],
  paper: ['rock', 'spock'],
  scissors: ['paper', 'lizard'],
  spock: ['scissors', 'rock'],
  lizard: ['spock', 'paper'],
};

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

    getLikelihoods() {
      let sizeOfArray = Object.values(this.likelihoods)
        .reduce((acc, curr) => acc + curr);
      let choices = new Array(sizeOfArray);
      let start = 0;
      for (let type in this.likelihoods) {
        let end = start + this.likelihoods[type];
        choices.fill(type, start, end);
        start += this.likelihoods[type];
      }

      return choices;
    },

    choose() {
      this.calculateLikelihoods();
      const choices = this.getLikelihoods();
      let randomIndex = Math.floor(Math.random() * choices.length);
      this.move = choices[randomIndex];
    }
  };

  return Object.assign(playerObject, computerObject);
}

function createHuman() {
  let playerObject = createPlayer();

  let humanObject = {
    choose() {
      let choice;

      while (true) {
        console.log('Please choose rock, paper, scissors, spock or lizard:');
        choice = readline.question();
        if (['rock', 'paper', 'scissors', 'spock', 'lizard'].includes(choice)) break;
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

  displayGoodbyeMessage() {
    console.log('Thanks for playing Rock, Paper, Scissors, Spock, Lizard. Goodbye!');
  },

  displayWinner() {
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

  updateHistories(playerResult, compResult) {
    this.human.history[this.human.move].push(playerResult);
    this.computer.history[this.computer.move].push(compResult);
  },

  determineWinner() {
    let humanMove = this.human.move;
    let compMove = this.computer.move;

    console.log(`You chose: ${humanMove}`);
    console.log(`The computer chose: ${compMove}`);

    if (humanMove === compMove) {
      console.log("It's a tie");
      this.updateHistories('tie', 'tie');
    } else if (WINNING_MOVES[humanMove].includes(compMove)) {
      console.log('You win!');
      this.human.score += 1;
      this.updateHistories('win', 'loss');
    } else {
      console.log('Computer wins!');
      this.computer.score += 1;
      this.updateHistories('loss', 'win');
    }

    this.displayWinner();
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

  play() {
    this.displayWelcomeMessage();
    while (true) {
      while (this.human.score < 5 && this.computer.score < 5) {
        this.human.choose();
        this.computer.choose();
        this.determineWinner();
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
// update on github and update eslint rules to avoid long line error
