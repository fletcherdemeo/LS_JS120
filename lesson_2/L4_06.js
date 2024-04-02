// Question 1
// Suppose we have the following classes:

// class Game {
//   play() {
//     return 'Start the game!';
//   }
// }

// class Bingo extends Game {
//   rulesOfPlay() {
//     // rules of play
//   }
// }

// What would happen if we added a play method to the Bingo class, 
// keeping in mind that there is already a method of this name in the 
// Game class from which the Bingo class inherits? Explain your answer. 
// What do we call it when we define a method like this?

// This would mean that a Bingo class instance loses access to the play 
// method from the Game object as JS would find this method within a Bingo
// instance and therefore not search further up the prototype chain.
// This is referred to as method overriding in JavaScript. 

// Question 2
// Let's practice creating a class hierarchy.

// Create a class named Greeting that has a single method named greet. 
// The method should take a string argument, and it should print that 
// argument to the console.

// Now, create two more classes that inherit from Greeting: one named 
// Hello, and the other Goodbye. The Hello class should have a hi method 
// that takes no arguments and logs "Hello". The Goodbye class should 
// have a bye method that logs "Goodbye". Use the greet method from the 
// Greeting class when implementing Hello and Goodbye; don't call 
// console.log from either Hello or Goodbye.

class Greeting {
  greet(text) {
    console.log(text);
  }
}

class Hello extends Greeting {
  hi() {
    this.greet('Hello');
  }
}

class Goodbye extends Greeting {
  bye() {
    this.greet('Goodbye');
  }
}

let hello = new Hello();
hello.hi();
let goodbye = new Goodbye();
goodbye.bye();