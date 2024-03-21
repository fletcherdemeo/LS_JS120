// Question 1
// What will the following code output? Try to determine the results
// without running the code.

// function func() {
//   return this;
// }

// let context = func();

// console.log(context);

// This code will log the global object (either global in node or window
// in browser). The func invocation on line 5 does not have an explicit
// context specified, implicit context will then determine that func was
// invoked within the global object (outisde of any other object).

// Question 2
// What will the following code output? Explain the difference, if any,
// between this output and that of problem 1.

// let obj = {
//   func: function() {
//     return this;
//   },
// };

// let context = obj.func();

// console.log(context);

// This will log the obj object to the console. Method invocations receive
// an implicit execution context that refers to teh object used to invoke
// it. The return value is tehn assigned to the variable context which is 
// logged.

// Question 3
// What will the following code output?

// message = 'Hello from the global scope!';

// function deliverMessage() {
//   console.log(this.message);
// }

// deliverMessage();

// let foo = {
//   message: 'Hello from the function scope!',
// };

// foo.deliverMessage = deliverMessage;

// foo.deliverMessage();

// This code will log 'Hello from the global scope!' and 
// 'Hello from the function scope!'.
// The function invocation on line 7 will have global scope and thus have
// access to the global message property (which is implicitly set on the
// global object as the let, const or var keywords have not been used).
// The method invocation on line 15 will have function scope as the deliverMessage
// property is set to the deliverMessage function on line 13, the foo object
// will thus have message and deliverMessage properties. Method invocations
// receive an implicit execution context that refers to teh object used to 
// invoke it - which is foo on line 15.

// Question 4
// What built-in methods have we learned about that we can use to 
// specify a function's execution context explicitly?

// function.call() and function.apply() are the two built-in methods
// that can be used to specify a function's execution context explicitly.
// Both are similar, with the first argument being the obj (or null) 
// that will specify the context and the following argument/s being the
// arguments for hte function that the method is called on.

// Question 5
// Take a look at the following code snippet. Use call to invoke the add 
// method but with foo as execution context. What will this return?

// let foo = {
//   a: 1,
//   b: 2,
// };

// let bar = {
//   a: 'abc',
//   b: 'def',
//   add: function() {
//     return this.a + this.b;
//   },
// };

// console.log(bar.add.call(foo));
// This code will return 3.
// The execution context is changed to the foo object whose a and b 
// properties refer to 1 and 2. The add function will thus have 
// access to these properties when the execution context is explicity
// set.