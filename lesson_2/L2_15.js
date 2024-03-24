// Question 1
// The code below should output "Christopher Turk is a Surgeon".
// Without running the code, what will it output? If there is a
// difference between the actual and desired output, explain the
// difference.

// let turk = {
//   firstName: 'Christopher',
//   lastName: 'Turk',
//   occupation: 'Surgeon',
//   getDescription() {
//       return this.firstName + ' ' + this.lastName + ' is a '
//                                   + this.occupation + '.';
//   }
// };

// function logReturnVal(func) {
//   let returnVal = func();
//   console.log(returnVal);
// }

// logReturnVal(turk.getDescription);

// No this code will log "undefined undefined is a undefined."
// The turk.getDescription method is psased to the logReturnVal function
// as an argument. Passing a function as an argument strips it of its
// context so when the function is invoked on line 18 it has global context.

// Question 2
// Modify the program from the previous problem so that logReturnVal
// accepts an additional context argument. If you then run the program
// with turk as the context argument, it should produce the desired
// output.

// let turk = {
//   firstName: 'Christopher',
//   lastName: 'Turk',
//   occupation: 'Surgeon',
//   getDescription() {
//       return this.firstName + ' ' + this.lastName + ' is a '
//                                   + this.occupation + '.';
//   }
// };

// function logReturnVal(func, context) {
//   let returnVal = func.call(context);
//   console.log(returnVal);
// }

// logReturnVal(turk.getDescription, turk);

// Question 3
// Suppose that we want to extract getDescription from turk, but we
// always want it to execute with turk as its execution context. How
// would you modify your code to do that?

// let turk = {
//   firstName: 'Christopher',
//   lastName: 'Turk',
//   occupation: 'Surgeon',
//   getDescription() {
//       return this.firstName + ' ' + this.lastName + ' is a '
//                                   + this.occupation + '.';
//   }
// };

// function logReturnVal(func) {
//   let returnVal = func();
//   console.log(returnVal);
// }

// logReturnVal(turk.getDescription.bind(turk));

// Question 4
// Consider the following code:
// const TESgames = {
//   titles: ['Arena', 'Daggerfall', 'Morrowind', 'Oblivion', 'Skyrim'],
//   seriesTitle: 'The Elder Scrolls',
//   listGames: function() {
//     this.titles.forEach(function(title) {
//       console.log(this.seriesTitle + ': ' + title);
//     });
//   }
// };

// TESgames.listGames();

// Will this code produce the following output? Why or why not?
// The Elder Scrolls: Arena
// The Elder Scrolls: Daggerfall
// The Elder Scrolls: Morrowind
// The Elder Scrolls: Oblivion
// The Elder Scrolls: Skyrim

// The code will not produce this output - it will produce 
// "undefined: Arena"
// "undefined: Daggerfall"
// "undefined: Morrowind"
// "undefined: Oblivian"
// "undefined: Skyrim"
// On like 11 the listGames() method is invoked with its context being
// the TESgames object. In the listGames function body the forEach method
// is used which will have global context and thus the reference to 
// this.seriesTitle will reference the global context rather than the 
// TESgames context and return undefined - this will be logged alongside
// each of the titles. 

// Question 5
// Use let self = this; to ensure that TESgames.listGames uses TESGames
// as its context and logs the proper output.

// const TESgames = {
//   titles: ['Arena', 'Daggerfall', 'Morrowind', 'Oblivion', 'Skyrim'],
//   seriesTitle: 'The Elder Scrolls',
//   listGames: function() {
//     let self = this;
//     self.titles.forEach(function(title) {
//       console.log(self.seriesTitle + ': ' + title);
//     });
//   }
// };

// TESgames.listGames();

// Question 6
// Use let self = this; to ensure that TESgames.listGames uses TESGames
// as its context and logs the proper output.

// const TESgames = {
//   titles: ['Arena', 'Daggerfall', 'Morrowind', 'Oblivion', 'Skyrim'],
//   seriesTitle: 'The Elder Scrolls',
//   listGames: function() {
//     this.titles.forEach(function(title) {
//       console.log(this.seriesTitle + ': ' + title);
//     }, this);
//   }
// };

// TESgames.listGames();

// Question 7
// const TESgames = {
//   titles: ['Arena', 'Daggerfall', 'Morrowind', 'Oblivion', 'Skyrim'],
//   seriesTitle: 'The Elder Scrolls',
//   listGames: function() {
//     this.titles.forEach((title) => {
//       console.log(this.seriesTitle + ': ' + title);
//     });
//   }
// };

// TESgames.listGames();

// Question 8
// Consider the following code:
// let foo = {
//   a: 0,
//   incrementA: function() {
//     function increment() {
//       this.a += 1;
//     }

//     increment();
//   }
// };

// foo.incrementA();
// foo.incrementA();
// foo.incrementA();

// What will the value of foo.a be after this code runs?

// foo.a will have the value of 0 after the code is run.
// The function increment loses its execution context when invoked as a 
// function. When the incrementA method is invoked on lines 12, 13 and 14 
// the function increment's execution context will be the global this and
// thus foo.a will be unchanged.

// Question 9
// Use one of the methods we learned in this lesson to invoke increment
// with an explicit context such that foo.a gets incremented with each
// invocation of incrementA.

let foo = {
  a: 0,
  incrementA: function() {
    let increment = () => {this.a += 1};

    increment();
  }
};

foo.incrementA();
foo.incrementA();
foo.incrementA();