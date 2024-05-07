let readline = require('readline-sync');

class Card {
  constructor(suit, rank, points) {
    this.suit = suit,
    this.rank = rank,
    this.points = points
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
      })
    })
  }

  deal() {
    let randomInd = Math.floor(Math.random() * this.cards.length);
    return this.cards.splice(randomInd, 1)[0];
  }
}

class Participant {
  constructor() {
    this.hand = [];
  }

  getScore() {
    return this.hand.reduce((acc, curr) => acc + curr.points, 0);
  }

  getHandAsStr() {
    return this.hand
      .map(card => `${card.rank} of ${card.suit}`)
      .join('; ');
  }

  reveal() {
    let cards = this.getHandAsStr();
    let points = this.getScore();
    let playerType = this.constructor.name;
    console.log(`${playerType} has: ${cards} for ${points} points`);
  }

  hit(card) {
    this.hand.push(card);
  }

  isBusted() {
    return this.getScore() > 21;
  }
}

class Player extends Participant {
  constructor() {
    super();
  }
}

class Dealer extends Participant {
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
  constructor() {
    this.startNewGame();
  }

  start() {
    this.displayWelcomeMessage();
    while (true) {
      this.dealCards();
      this.showCards();
      this.playerTurn();

      if (!this.player.isBusted()) {
        this.dealerTurn();
      }
      this.displayResult();

      if (!this.playAgain()) {
        this.displayGoodbyeMessage();
        break;  
      }

      this.startNewGame();
    }
  }

  startNewGame() {
    console.clear();
    this.player = new Player();
    this.dealer = new Dealer();
    this.deck = new Deck();
  }

  dealCards() {
    this.player.hand.push(this.deck.deal());
    this.dealer.hand.push(this.deck.deal());
    this.player.hand.push(this.deck.deal());
    this.dealer.hand.push(this.deck.deal());
  }

  showCards() {
    this.player.reveal();
    this.dealer.hide();
    this.dealer.reveal();
    this.dealer.addHiddenCardBackToHand();
  }

  playerTurn() {
    while (!this.player.isBusted()) {
      const prompt = `Do you want to (h)it or (s)tay? `;
      let choice = readline.question(prompt).toLowerCase();
  
      if (choice === 'h') {
        this.player.hit(this.deck.deal());
        this.player.reveal();
      } else if (choice === 's') {
        break;
      }  
    }
  }

  dealerTurn() {
    while (!this.dealer.isBusted() && this.dealer.getScore() < 17) {

      this.dealer.reveal();
      this.dealer.hit(this.deck.deal());
    }

    this.dealer.reveal();
  }

  displayWelcomeMessage() {
    console.log('Welcome to Twenty-One');
  }

  displayGoodbyeMessage() {
    console.log('Thanks for playing Twenty-One');
  }

  getResult() {
    let playerPoints = this.player.getScore();
    let dealerPoints = this.dealer.getScore();
    if (playerPoints > 21) {
      return 'dealer';
    } else if (dealerPoints > 21) {
      return 'player';
    } else if (playerPoints > dealerPoints) {
      return 'player';
    } else if (dealerPoints > playerPoints) {
      return 'dealer';
    } else {
      return 'tie';
    }
  }

  displayResult() {
    let result = this.getResult();
    if (result === 'player') {
      console.log('Congratulations you won that hand');
    } else if (result === 'dealer') {
      console.log('Unlucky, dealer won that hand!');
    } else {
      console.log('Tied hands!');
    }
  }

  playAgain() {
    const prompt = `Do you want to play again? (y)es or (n)o `;
    let choice = readline.question(prompt).toLowerCase();
    return choice === 'y';
  }
}

let game = new TwentyOneGame();
game.start();