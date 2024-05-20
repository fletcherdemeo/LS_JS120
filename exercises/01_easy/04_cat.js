// class Pet {
//   constructor(name, age) {
//     this.name = name;
//     this.age = age;
//   }
// }

// class Cat extends Pet {
//   constructor(name, age, color) {
//     super(name, age);
//     this.color = color;
//   }

//   info() {
//     console.log(`My cat ${this.name} is ${this.age} years old and has ${this.color} fur.`);
//   }
// }

// let pudding = new Cat('Pudding', 7, 'black and white');
// let butterscotch = new Cat('Butterscotch', 10, 'tan and white');

// console.log(pudding.info());
// console.log(butterscotch.info());

// My cat Pudding is 7 years old and has black and white fur.
// My cat Butterscotch is 10 years old and has tan and white fur.

// An alternative approach to this problem would be to modify the Pet 
// class to accept a colors parameter. If we did this, we wouldn't need 
// to supply an constructor method for Cat.

// Why would we be able to omit the constructor method? Would it be a 
// good idea to modify Pet in this way? Why or why not? How might you 
// deal with some of the problems, if any, that might arise from 
// modifying Pet?

class Pet {
  constructor(name, age, colors) {
    this.name = name;
    this.age = age;
    this.colors = colors;
  }
}

class Cat extends Pet {
  info() {
    console.log(`My cat ${this.name} is ${this.age} years old and has ${this.color} fur.`);
  }
}

let pudding = new Cat('Pudding', 7, 'black and white');
console.log(pudding instanceof Pet);
let butterscotch = new Cat('Butterscotch', 10, 'tan and white');

console.log(pudding.info());
console.log(butterscotch.info());

// We can omit the constructor method because if not provided then it will
// default to call super when extending a class. 
// It could be a good way to modify Pet in this way depending on how
// other Pet instances behave and the properties that they have, this is 
// because potentially there are many pets that have we would want to have
// a color property for.
// The super class could set optional parameters (color) to null or undefined
// by default.