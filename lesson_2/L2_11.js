// Question 1
// What method can we use to bind a function permanently to a particular
// execution context?

// Can use the bind method to permanently bind a function to a particular
// execution context. The bind method is passed the object that the 
// return function will be permanently bound to.

// Question 2
// What will the following code log to the console?

// let obj = {
//   message: 'JavaScript',
// };

// function foo() {
//   console.log(this.message);
// }

// foo.bind(obj);

// This will not log anything to the console. The foo function is bound
// obj object on line 9, however this method returns a new function 
// so the console.log method will not be invoked within the foo function.

// Question 3
// What will the following code output?

// let obj = {
//   a: 2,
//   b: 3,
// };

// function foo() {
//   return this.a + this.b;
// }

// let bar = foo.bind(obj);

// console.log(foo());
// console.log(bar());

// This will log "NaN" and "5" to the console. 
// On line 10 the foo function is bound to the obj object with the return
// function assigned to the bar variable. 
// On line 12 the foo function is invoked, however, it has global context
// so the a and b properties will both be undefined. undefined + undefined
// will then be evaluated to NaN and logged to the console.
// On line 13 the bar function is invoked, the bar function is bound to the
// obj object and will thus log 5 (2 + 3).

// Question 4
// What will the code below log to the console?

// let positivity = {
//   message: 'JavaScript makes sense!',
// };

// let negativity = {
//   message: 'JavaScript makes no sense!',
// };

// function foo() {
//   console.log(this.message);
// }

// let bar = foo.bind(positivity);

// negativity.logMessage = bar;
// negativity.logMessage();

// This will log 'Javascript makes sense!' to the console. On line 13 the 
// foo function is bound to the positivity object, with the returned function
// assigned to the bar variable. 
// bar is then assigned to the logMessage property on negativity on line 15
// and is invoked on line 16. However the bar function is permanently bound
// to the positivity object and thus will have access to positivity's 
// message property which is logged to the console.

// Question 5
// What will the code below output?

// let obj = {
//   a: 'Amazebulous!',
// };
// let otherObj = {
//   a: "That's not a real word!",
// };

// function foo() {
//   console.log(this.a);
// }

// let bar = foo.bind(obj);

// bar.call(otherObj);

// This will log 'Amazebulous!' to the console. On line 12 the foo function
// is bound to the obj object, with the returned function assigned to the
// bar variable. The bar variable is then invoked using the call method
// with otherObj passed as its intended execution context, however,
// bar is permanently bound to the obj object since the bind method was
// used and thus the intended execution context parameter (otherObj) 
// will be ignored.  