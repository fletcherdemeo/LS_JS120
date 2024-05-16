// Practice Problems
// Consider the following code:

function Greeting() {}

Greeting.prototype.greet = function(message) {
  console.log(message);
};

function Hello() {}

Hello.prototype = Object.create(Greeting.prototype);

Hello.prototype.hi = function() {
  this.greet('Hello!');
};

function Goodbye() {}

Goodbye.prototype = Object.create(Greeting.prototype);

Goodbye.prototype.bye = function() {
  this.greet("Goodbye");
};

// Case 1
// let hello = new Hello();
// hello.hi();

// 'Hello' will be logged to the console. On line 27 the hello variable
// is declared and initialized to a new Hello instance. Hello's prototype
// is set to a new object returned from the Object.create method invocation
// with Greeting.prototype passed as it's prototype argument. The hi property
// is then assigned to a method that calls the greet method on 'this'.
// greet is not found within the hello object so JavaScript will go up the
// prototypal chain where it will be found on the Greeting prototype.

// Case 2
// let hello = new Hello();
// hello.bye();

// This will return an error as the bye property can not be found on the
// hello object, nor in its prototype chain (Hello.prototype -> 
// Greeting.prototype -> Object.prototype). bye is a method on the Goodbye
// prototype.

// Case 3
// let hello = new Hello();
// hello.greet();

// This will log 'undefined' to the console. The hello object will have access 
// to the greet method via the prototype chain (found within Greeting.prototype
// object). However because this method is invoked without any arguments
// the value of the message parameter will be undefined.

// Case 4
// let hello = new Hello();
// hello.greet('Goodbye');

// This will log 'Goodbye' to the console. The hello object will have access 
// to the greet method via the prototype chain (found within Greeting.prototype
// object). The string 'Goodbye' is passed as argument which will be logged.

// Case 5
// Hello.hi();

// This will return an error as the hi method is being directly invoked
// on the Hello constructor. The hi method will have global execution context
// and will thus point to the global object in node, the global object does 
// not have a hi property and will thus return an error.