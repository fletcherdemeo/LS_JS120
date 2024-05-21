// What will the following code log?

class Something {
  constructor() {
    this.data = "Hello";
  }

  dupData() {
    return this.data + this.data;
  }

  static dupData() {
    return "ByeBye";
  }
}

let thing = new Something();
console.log(Something.dupData());
console.log(thing.dupData());

// This will log ByeBye and HelloHello to the console. 
// The Something class has two instance properties (data, dupData) and 
// one class property (dupData) as represented via the static keyword. 

// The class property dupData is a function, also known as a class method,
// and can be instantiated by calling it on the class Something as shown 
// on line 18. This will return the string ByeBye which is then logged 
// to the console. 

// When the Something class is instantiated and assigned to the thing 
// variable on line 17 the thing variable will reference an object that 
// has two properties, data and dupData, when dupData is called on 
// thing on line 19 it will return the value of the data property 
// concatenated.
