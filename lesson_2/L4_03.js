// Question 1
// Use a factory function to create pet objects. The factory should let 
// us create and use pets like this:

// function createPet(type, name) {
//   return {
//     animal: type,
//     name: name,
//     sleep: function() {
//       console.log('I am sleeping');
//     },
//     wake: function() {
//       console.log('I am awake');
//     }
//   }
// }

// let pudding = createPet("Cat", "Pudding");
// console.log(`I am a ${pudding.animal}. My name is ${pudding.name}.`);
// pudding.sleep(); // I am sleeping
// pudding.wake();  // I am awake

// let neptune = createPet("Fish", "Neptune");
// console.log(`I am a ${neptune.animal}. My name is ${neptune.name}.`);
// neptune.sleep(); // I am sleeping
// neptune.wake();  // I am awake

// Question 2
// Use the OLOO pattern to create an object prototype that we can use 
// to create pet objects. The prototype should let us create and use 
// pets like this:

// let PetPrototype = {
//   init: function(animal, name) {
//     this.animal = animal 
//     this.name = name;
//     return this;
//   },

//   sleep: function() {
//     console.log('I am sleeping');
//   },

//   wake: function() {
//     console.log('I am awake');
//   }
// }

// let pudding = Object.create(PetPrototype).init("Cat", "Pudding");
// console.log(`I am a ${pudding.animal}. My name is ${pudding.name}.`);
// pudding.sleep(); // I am sleeping
// pudding.wake();  // I am awake

// let neptune = Object.create(PetPrototype).init("Fish", "Neptune");
// console.log(`I am a ${neptune.animal}. My name is ${neptune.name}.`);
// neptune.sleep(); // I am sleeping
// neptune.wake();  // I am awake

// Question 3
// Consider the objects created by the programs in problems 1 and 2. 
// How do objects for the same animal differ from each other?

// Using the factory function pattern each object that is created
// has a sleep and wake method property.
// Using the OLOO pattern the sleep and wake properties are inherited from
// the PetPrototype object.
// This is evident if we log the contents of each object for each example:
// Run with example 1:
// console.log(pudding);
// console.log(neptune);
// Run with example 2:
// console.log(pudding);
// console.log(neptune);
