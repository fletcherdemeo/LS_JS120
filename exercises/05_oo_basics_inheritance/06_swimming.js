// Correct the following program so it will work properly. Just make 
// the smallest possible change to ensure that objects of Maltese and 
// Fish class have access to the swim method.

const swimMixin = {
  swim() {
    return `${this.name} is swimming.`;
  }
}

class Fish {
  constructor(name) {
    this.name = name;
  }
}

class Dog {
  constructor(name) {
    this.name = name;
  }
}

class Maltese extends Dog {}

Object.assign(Fish.prototype, swimMixin);
Object.assign(Maltese.prototype, swimMixin);

let dog1 = new Maltese("Buddy");
let fish1 = new Fish("Nemo");

console.log(dog1.swim());
console.log(fish1.swim());

// Buddy is swimming.
// Nemo is swimming.