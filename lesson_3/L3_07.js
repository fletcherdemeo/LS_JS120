// Question 1
// What naming convention separates constructor functions from other 
// functions?
// - First letter of function being capitalised

// Question 2
// What happens if you run the following code? Why?
// function Lizard() {
//   this.scamper = function() {
//     console.log("I'm scampering!");
//   };
// }

// let lizzy = Lizard();
// lizzy.scamper(); // ?

// This code will return an error.
// The lizzy variable is assigned the return value of the Lizard() function
// call - without the new constructor keyword being used.
// This will return undefined and thus will throw an error when the 
// scamper property access is attempted.

// Question 3
// Alter the code in problem 2 so that it produces the desired output: 
// I'm scampering!.
function Lizard() {
  this.scamper = function() {
    console.log("I'm scampering!");
  };
}

let lizzy = new Lizard();
lizzy.scamper(); // ?