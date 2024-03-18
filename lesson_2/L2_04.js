// Question 1

// let qux = { foo: 1 };
// let baz = Object.create(qux);
// console.log(baz.foo + qux.foo);

// What will the following code log to the console? Explain why it 
// logs that value.

// This will log 2 to the console. 
// On line 1 the qux variable is declared and initialized to an object
// with the property foo with a value of 1. 
// On line 2 the baz variable is declared and initialized to the
// return value from the Object.create method invocation, with qux passed
// as an argument. The Object.create method will return a new object
// which has the prototype of the object that is passed to it.
// On line 3 the console.log method is invoked with baz.foo + qux.foo
// passed as an argument. The foo property does not exist on the baz object
// so javascript will search up the prototypal chain to see if that property
// exists - it does exist in qux so 1 is returned.

// Question 2

// let qux = { foo: 1 };
// let baz = Object.create(qux);
// baz.foo = 2;

// console.log(baz.foo + qux.foo);

// What will the following code log to the console? Explain why it 
// logs that value.

// This will log 3 to the console.
// On line 1 the qux variable is declared and initialized to an object
// with the property foo with a value of 1.
// On line 2 the baz variable is declared and initialized to the return
// value from the Object.create method invocation, with qux passed as an
// argument. The Object.create method will return a new object which
// has the prototype of the object that is passed to it.
// On line 3 the foo property on baz is assigned to 2 - this property
// does not currently exist on baz so will be created and set to this
// value.
// On line 5 the console.log method is invoked with baz.foo (which has
// a value of 2) + qux.foo (which has a value of 1) passed as an argument
// - this will return 3, which will be logged to the console.

// Question 3

// let qux = { foo: 1 };
// let baz = Object.create(qux);
// qux.foo = 2;

// console.log(baz.foo + qux.foo);

// What will the following code log to the console? Explain why it 
// logs that value.

// This will log 4 to the console.
// The baz variable that is declared and initialized to the return value
// of the Object.create method on line 2 will have the prototype of
// the object that is passed to it as an argument - which is qux.
// On line 3 the foo property is reassigned to 2.
// On line 5 the console.log method is invoked with baz.foo + quz.foo
// passed as an argument. As the foo property does not exist on baz,
// JS will search up the prototypal chain - where it will find the foo
// property on qux. This will result in 2 + 2 being evaluated which will
// return 4, which is logged to the console.

// Question 4

// Write a function that searches the prototype chain of an object for
// a given property and assigns it a new value. If the property does not
// exist in any of the prototype objects, the function should do nothing.
// The following code should work as shown:

// function assignProperty(obj, key, val) {
//   if (!obj) return;

//   if (!obj.hasOwnProperty(key)) {
//     let proto = Object.getPrototypeOf(obj);
//     assignProperty(proto, key, val);
//   } else {
//     obj[key] = val;
//   }
// }

// let fooA = { bar: 1 };
// let fooB = Object.create(fooA);
// let fooC = Object.create(fooB);

// assignProperty(fooC, "bar", 2);
// console.log(fooA.bar); // 2
// console.log(fooC.bar); // 2

// assignProperty(fooC, "qux", 3);
// console.log(fooA.qux); // undefined
// console.log(fooC.qux); // undefined
// console.log(fooA.hasOwnProperty("qux")); // false
// console.log(fooC.hasOwnProperty("qux")); // false

// Question 5
// for (let property in foo) {
//   console.log(`${property}: ${foo[property]}`);
// }

// Object.keys(foo).forEach(property => {
//   console.log(`${property}: ${foo[property]}`);
// });

// If foo is an arbitrary object, will these loops always log the same
// results to the console? Explain why they do or do not. If they don't
// always log the same information, show an example of when the results
// differ.

// They will not always log the same results to the console. The for in loop
// will include the prototypal properties of an object whilst the Object.keys
// method will only return an object's own properties.

// Example below demonstrates where these differences will be seen.
// let proto = { bar: 1 };
// let foo = Object.create(proto);
// foo.qux = 2;

// How do you create an object that doesn't have a prototype? How can
// you determine whether an object has a prototype?

// You can create an object that doesn't have a prototype by creating an
// object with the Object.create method and passing null as an argument.

// You can determine whether an object has a prototype or not by using the
// Object.getPrototypeOf method. This method will return the prototype
// object or null if it does not have one.