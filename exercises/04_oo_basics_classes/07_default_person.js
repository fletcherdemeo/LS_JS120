class Person {
  constructor(name) {
    this.name = name || 'John Doe';
  }
}

let person1 = new Person();
let person2 = new Person("Pepe");

console.log(person1.name); // John Doe
console.log(person2.name); // Pepe