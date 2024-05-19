let readline = require('readline-sync');

class Card {
  constructor(suit, rank, points) {
    this.suit = suit;
    this.rank = rank;
    this.points = points;
  }
}

class Deck {
  static SUITS = ['clubs', 'diamonds', 'hearts', 'spades'];
  static RANKS = [
    {card: '2', points: 2},
    {card: '3', points: 3},
    {card: '4', points: 4},
    {card: '5', points: 5},
    {card: '6', points: 6},
    {card: '7', points: 7},
    {card: '8', points: 8},
    {card: '9', points: 9},
    {card: '10', points: 10},
    {card: 'J', points: 10},
    {card: 'Q', points: 10},
    {card: 'K', points: 10},
    {card: 'A', points: 11}
  ];

  constructor() {
    this.createDeck();
  }

  createDeck() {
    this.cards = [];
    Deck.SUITS.forEach(suit => {
      Deck.RANKS.forEach(rank => {
        let card = new Card(suit, rank.card, rank.points);
        this.cards.push(card);
      });
    });
  }

  deal() {
    let randomInd = Math.floor(Math.random() * this.cards.length);
    return this.cards.splice(randomInd, 1)[0];
  }

  remainingCards() {
    return this.cards.length;
  }
}

class Participant {
  static MAX_POINTS = 21;

  constructor() {
    this.hand = [];
  }

  getScore() {
    let allCardsScore = this.hand
      .filter(card => card.rank !== 'A')
      .reduce((acc, curr) => {
        return acc + curr.points;
      }, 0);

    let aces = this.hand.filter(card => card.rank === 'A').length;
    let acesScore = allCardsScore > 10 ? aces : 11 + (1 * (aces - 1));

    return aces > 0 ? allCardsScore + acesScore : allCardsScore;
  }

  getHandAsStr() {
    return this.hand
      .map(card => `${card.rank} of ${card.suit}`)
      .join('; ');
  }

  prompt(msg) {
    console.log(`=> ${msg}`);
  }

  reveal() {
    let cards = this.getHandAsStr();
    let points = this.getScore();
    let playerType = this.constructor.name;
    this.prompt(`${playerType} has: ${points} points from ${cards}`);
  }

  hit(card) {
    this.hand.push(card);
  }

  isBusted() {
    return this.getScore() > Participant.MAX_POINTS;
  }

  resetHand() {
    this.hand = [];
  }
}

class Player extends Participant {
  static MIN_BANK_BALANCE = 0;
  static MAX_BANK_BALANCE = 10;

  constructor() {
    super();
    this.bank = 5;
  }

  decreaseBankBalance() {
    this.bank -= 1;
  }

  increaseBankBalance() {
    this.bank += 1;
  }
}

class Dealer extends Participant {
  static MIN_POINTS = 17;

  constructor() {
    super();
  }

  hide() {
    this.hiddenCard = this.hand.splice(-1, 1)[0];
  }

  addHiddenCardBackToHand() {
    this.hand.push(this.hiddenCard);
  }
}

class TwentyOneGame {
  static MAX_POINTS = 21;

  constructor() {
    this.player = new Player();
    this.dealer = new Dealer();
    this.deck = new Deck();
    this.cardsPlayed = [];
  }

  start() {
    let firstRun = true;
    this.displayWelcomeMessage();
    while (true) {
      if (!firstRun) this.displayBankBalance();
      if (firstRun) firstRun = false;

      this.dealCards();
      this.showCards();
      this.playerTurn();

      if (!this.player.isBusted()) this.dealerTurn();

      this.adjustPlayerBankBalance();
      this.displayResult();

      if (
        this.player.bank === Player.MIN_BANK_BALANCE ||
        this.player.bank === Player.MAX_BANK_BALANCE
      ) break;

      if (!this.playAgain()) break;

      this.startNewHand();
    }

    this.displayGoodbyeMessage();
  }

  prompt(msg) {
      console.log(`=> ${msg}`);
  }  

  lineBreak() {
    console.log('\n');
  }

  startNewHand() {
    this.clearScreen();
    this.player.resetHand();
    this.dealer.resetHand();
  }

  dealNewCard(player) {
    let newCard = this.deck.deal();
    player.hit(newCard);
    this.cardsPlayed.push(newCard);
  }

  dealCards() {
    for (let cardsToDeal = 0; cardsToDeal < 2; cardsToDeal += 1) {
      this.dealNewCard(this.player);
      this.dealNewCard(this.dealer);
    }
  }

  showCards() {
    this.player.reveal();
    this.dealer.hide();
    this.dealer.reveal();
    this.dealer.addHiddenCardBackToHand();
  }

  playerTurn() {
    while (!this.player.isBusted()) {
      if (this.deck.remainingCards() <= 2) this.reshuffle();

      this.prompt(`Do you want to (h)it or (s)tay? `);
      let choice = readline.question().toLowerCase();
      this.lineBreak();

      if (choice === 'h') {
        this.dealNewCard(this.player);
        this.player.reveal();
      } else if (choice === 's') {
        break;
      }
    }

    if (this.player.isBusted()) this.prompt('Player is bust');
  }

  dealerTurn() {
    while (
      !this.dealer.isBusted() &&
      this.dealer.getScore() < Dealer.MIN_POINTS
    ) {
      if (this.deck.remainingCards() <= 2) this.reshuffle();

      this.dealer.reveal();
      this.dealNewCard(this.dealer);
    }

    this.dealer.reveal();
    if (this.dealer.isBusted()) this.prompt('Dealer is bust');
  }

  reshuffle() {
    this.deck.cards = this.cardsPlayed;
  }

  clearScreen() {
    console.clear();
  }

  displayWelcomeMessage() {
    this.clearScreen();
    this.prompt('Welcome to Twenty-One');
    this.prompt('You have $5 to bet. Each loss will cost $1, each win will earn $1');
    this.prompt("Game's over when you go broke ($0) or get rich ($10)");
    this.lineBreak();
  }

  displayGoodbyeMessage() {
    if (this.player.bank === Player.MIN_BANK_BALANCE) {
      this.prompt('You went bust!');
    }
    if (this.player.bank === Player.MAX_BANK_BALANCE) {
      this.prompt("You're rich!");
    }
    this.prompt('Thanks for playing Twenty-One');
  }

  getResult() {
    let playerPoints = this.player.getScore();
    let dealerPoints = this.dealer.getScore();
    if (playerPoints > TwentyOneGame.MAX_POINTS) {
      return 'dealer';
    } else if (dealerPoints > TwentyOneGame.MAX_POINTS) {
      return 'player';
    } else if (playerPoints > dealerPoints) {
      return 'player';
    } else if (dealerPoints > playerPoints) {
      return 'dealer';
    } else {
      return 'tie';
    }
  }

  adjustPlayerBankBalance() {
    let result = this.getResult();
    if (result === 'player') this.player.increaseBankBalance();
    if (result === 'dealer') this.player.decreaseBankBalance();
  }

  displayResult() {
    let result = this.getResult();
    if (result === 'player') {
      this.prompt('Congratulations you won that hand');
    } else if (result === 'dealer') {
      this.prompt('Unlucky, dealer won that hand!');
    } else {
      this.prompt('Tied hands!');
    }
  }

  displayBankBalance() {
    this.prompt(`Bank balance: $${this.player.bank}`);
  }

  playAgain() {
    while (true) {
      this.lineBreak();
      this.prompt(`Do you want to play again? (y)es or (n)o: `);
      let choice = readline.question().toLowerCase();
      if (choice === 'y' || choice === 'n') return choice === 'y';
    }
  }
}

let game = new TwentyOneGame();
game.start();