class Animal {
  constructor(name, age, legs, species, status) {
    this.name = name;
    this.age = age;
    this.legs = legs;
    this.species = species;
    this.status = status;
  }
  introduce() {
    return `Hello, my name is ${this.name} and I am ${this.age} years old and ${this.status}.`;
  }
}

class Cat extends Animal {
  static LEGS = 4;
  static SPECIES = "cat";

  constructor(name, age, status) {
    super(name, age, Cat.LEGS, Cat.SPECIES, status);
  }

  introduce() {
    return `${super.introduce()}. Meow meow!`;
  }
}

class Dog extends Animal {
  static LEGS = 4;
  static SPECIES = "dog";

  constructor(name, age, status, master) {
    super(name, age, Dog.LEGS, Dog.SPECIES, status);
    this.master = master;
  }

  greetMaster() {
    return `Hello ${this.master}! Woof, woof!`
  }
}

let cat = new Cat("Pepe", 2, "happy");
console.log(cat.introduce() === "Hello, my name is Pepe and I am 2 years old and happy. Meow meow!");
// logs true

let dog = new Dog("Duffy", 15, "happy", "Fletcher")
console.log(dog.greetMaster());
console.log(dog.introduce());