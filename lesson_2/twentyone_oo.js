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

  getHandAsStr(numOfCardsToNotShow) {
    let numOfCardsToShow = this.hand.length - numOfCardsToNotShow;
    return this.hand
      .slice(0, numOfCardsToShow)
      .map(card => {
        return `${card.rank} of ${card.suit}`;
      }).join('; ');
  }

  getHandPoints(numOfCardsToNotShow = 0) {
    let numOfCardsToShow = this.hand.length - numOfCardsToNotShow;
    return this.hand
      .slice(0, numOfCardsToShow)
      .reduce((acc, curr) => acc + curr.points, 0);
  }

  displayHandAndPoints(playerName, numOfCardsToNotShow = 0) {
    let cards = this.getHandAsStr(numOfCardsToNotShow);
    let points = this.getHandPoints(numOfCardsToNotShow);
    console.log(`${playerName} has: ${cards} for ${points} points`);
  }

  hit(card) {
    this.hand.push(card);
    //STUB
  }

  stay() {
    //STUB
  }

  isBusted() {
    return this.getHandPoints() > 21;
  }

  score() {
    //STUB
  }
}

class Player extends Participant {
  constructor() {
    super();
    this.type = "Player";
    //STUB
    // What sort of state does a player need?
    // Score? Hand? Amount of money available?
  }

  reveal() {
    return this.displayHandAndPoints(this.type);
  }
}

class Dealer extends Participant {
  constructor() {
    super();
    this.type = "Dealer";
    //STUB
    // What sort of state does a dealer need?
    // Score? Hand? Deck of cards? Bow tie?
  }

  reveal(numOfCardsToNotShow) {
    return this.displayHandAndPoints(this.type, numOfCardsToNotShow);
  }

  hide() {
    //STUB
  }

  deal() {
    //STUB
    // does the dealer or the deck deal?
  }
}

class TwentyOneGame {
  constructor() {
    this.player = new Player();
    this.dealer = new Dealer();
    this.deck = new Deck();
  }

  start() {
    this.displayWelcomeMessage();
    this.dealCards();
    this.showCards();
    this.playerTurn();
    if (!this.player.isBusted()) {
      this.dealerTurn();
    }
    this.displayResult();
    this.displayGoodbyeMessage();
  }

  dealCards() {
    this.player.hand.push(this.deck.deal());
    this.dealer.hand.push(this.deck.deal());
    this.player.hand.push(this.deck.deal());
    this.dealer.hand.push(this.deck.deal());
  }

  showCards() {
    this.player.reveal();
    this.dealer.reveal(1);
  }

  playerTurn() {
    while (!this.player.isBusted()) {
      const prompt = `Do you want to (h)it or (s)tay?`;
      let choice = readline.question(prompt).toLowerCase();
  
      if (choice === 'h') {
        this.player.hit(this.deck.deal());
        this.player.reveal();
      } else if (choice === 's') {
        this.player.stay();
        break;
      }  
    }
  }

  dealerTurn() {
    while (!this.dealer.isBusted()) {
      this.dealer.reveal();

      if (this.dealer.getHandPoints() > 17) {
        break;
      }

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
    let playerPoints = this.player.getHandPoints();
    let dealerPoints = this.dealer.getHandPoints();
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
}

let game = new TwentyOneGame();
game.start();