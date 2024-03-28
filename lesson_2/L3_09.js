// Question 1
// What does the following code log to the console? Try to answer
// without running the code. Can you explain why the code produces the
// output it does?

// let RECTANGLE = {
//   area: function() {
//     return this.width * this.height;
//   },
//   perimeter: function() {
//     return 2 * (this.width + this.height);
//   },
// };

// function Rectangle(width, height) {
//   this.width = width;
//   this.height = height;
//   this.area = RECTANGLE.area();
//   this.perimeter = RECTANGLE.perimeter();
// }

// let rect1 = new Rectangle(2, 3);

// console.log(rect1.area);
// console.log(rect1.perimeter);

// This will log NaN and NaN to the console. 
// On line 22 the rect1 variable is declared and initialized to a new
// object returned via the Rectangle function. This new object has properties
// for width, height, area and perimeter. The area and perimeter properties
// reference the return values from RECTANGLE.area and RECTANGLE.perimeter
// function calls. These function invocations have implicit context which
// would refer to the RECTANGLE object which does not have width and height
// properties which would result in NaN results (undefined * undefined).

// Question 2
// let RECTANGLE = {
//   area: function() {
//     return this.width * this.height;
//   },
//   perimeter: function() {
//     return 2 * (this.width + this.height);
//   },
// };

// function Rectangle(width, height) {
//   this.width = width;
//   this.height = height;
//   this.area = RECTANGLE.area;
//   this.perimeter = RECTANGLE.perimeter;
// }

// let rect1 = new Rectangle(2, 3);

// console.log(rect1.area());
// console.log(rect1.perimeter());

// By ensuring that the area and permiter methods are invoked on the 
// rect1 object so that they have the correct execution context.

// Question 3
// Write a constructor function called Circle that takes a radius as an
// argument. You should be able to call an area method on any objects 
// created by the constructor to get the circle's area. Test your 
// implementation with the following code:
// function Circle(radius) {
//   this.radius = radius;
// }

// Circle.prototype.area = function() {
//   return Math.PI * (this.radius * this.radius);
// }

// let a = new Circle(3);
// let b = new Circle(4);

// console.log(a.area().toFixed(2)); // => 28.27
// console.log(b.area().toFixed(2)); // => 50.27
// console.log(a.hasOwnProperty('area')); // => false

// Question 4
// What will the following code log to the console and why?
// function Ninja() {
//   this.swung = true;
// }

// let ninja = new Ninja();

// Ninja.prototype.swingSword = function() {
//   return this.swung;
// };

// console.log(ninja.swingSword());

// This will log true to the console.
// The ninja variable refers to a new object created by the Ninja function,
// which will have a swung property set to true, and its __proto__ property 
// set to Ninja.prototype. On line 7 the swingSword property on the prototype 
// object of Ninja is set to a function. 
// When this method is then invoked on line 11 JavaScript searches ninja and 
// finds that it isn't available, it hten searches its __proto__ (which is 
// Ninja.prototype) where it is found and executed.

// Question 5
// What will the following code output and why? Try to answer without 
// running the code.
// function Ninja() {
//   this.swung = true;
// }

// let ninja = new Ninja();

// Ninja.prototype = {
//   swingSword: function() {
//     return this.swung;
//   },
// };

// console.log(ninja.swingSword());

// This will return an error.
// The ninja variable refers to a new object created by the Ninja function,
// which will have a swung property set to true, and its __proto__ property 
// set to Ninja.prototype. On line 7 the prototype property on Ninja is 
// reassigned to a new object with a swingSword function property.
// After this is executed the ninja.__proto__ will point to a different
// object than Ninja.prototype and thus when the swingSword method is invoked
// on line 13 Javascript will not be able to find the method in ninja's 
// prototype chain and will return an error.

// Question 6
// Implement the method described in the comments below:
// function Ninja() {
//   this.swung = false;
// }

// Ninja.prototype.swing = function() {
//   this.swung = true;
//   return this;
// }

// // Add a swing method to the Ninja prototype which
// // modifies `swung` and returns the calling object

// let ninjaA = new Ninja();
// let ninjaB = new Ninja();

// console.log(ninjaA.swing().swung);      // logs `true`
// console.log(ninjaB.swing().swung);      // logs `true`

// Question 7
// let ninjaA;

// {
//   const Ninja = function() {
//     this.swung = false;
//   };

//   ninjaA = new Ninja();
// }

// // create a `ninjaB` object here; don't change anything else
// let ninjaB = new ninjaA.constructor();

// console.log(ninjaA.constructor === ninjaB.constructor); // => true

// Question 8
// Since a constructor is just a function, you can call it without the
// new operator. However, that can lead to unexpected results and errors, 
// especially for inexperienced programmers. Write a constructor 
// function that you can use with or without the new operator. The 
// function should return the same result with either form. Use the 
// code below to check your solution:

function User(first, last){
  if (!(this instanceof User)) {
    return new User(first, last);
  }

  this.name = first + ' ' + last;
}

let name = 'Jane Doe';
let user1 = new User('John', 'Doe');
let user2 = User('John', 'Doe');

console.log(name);         // => Jane Doe
console.log(user1.name);   // => John Doe
console.log(user2.name);   // => John Doe