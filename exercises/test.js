// // function factoryFunction(name, age, gender) {
// //   return {
// //     name: name,
// //     age: age,
// //     gender: gender,

// //     whatAge: function() {
// //       console.log(`${this.name} is ${this.age}`);
// //     }
// //  }
// // }

// // let fletcher = factoryFunction('Fletcher', 31, 'Male');
// // fletcher.whatAge();
// // console.log(fletcher);

// // function PersonConstructor(name, age, gender) {
// //   this.name = name;
// //   this.age = age;
// //   this.gender = gender;
// // }
// // PersonConstructor.prototype.whatAge = function() {
// //   console.log(`${this.name} is ${this.age}`);
// // }

// // function Employee(name, age, gender, job) {
// //   PersonConstructor.call(this, name, age, gender);
// //   this.job = job;
// // }
// // Employee.prototype = Object.create(PersonConstructor.prototype);
// // Employee.prototype.constructor = Employee;

// // let fletcher = new Employee('Fletcher', 31, 'Male', 'analyst');
// // // console.log(fletcher);
// // // fletcher.whatAge();
// // // console.log(fletcher);
// // fletcher.whatAge();

// // let human = {species: 'human'};
// // let fletcher = Object.create(human);
// // console.log(Object.getPrototypeOf(fletcher) === human);
// // console.log(human.isPrototypeOf(fletcher));

// // let obj1 = {
// //   a: 'This is obj1',

// //   foo() {
// //     let bar = () => console.log(this.a);
// //     bar();
// //   },
// // };

// // let obj2 = {
// //   a: 'This is obj2',
// // };

// // obj1.foo();                   // This is obj1

// // obj2.foo = obj1.foo;
// // obj2.foo();                   // This is obj2


// let testFunc = function(num) {
//   console.log(this.name, num);
// }

// let obj = {
//   name: 'Test',
//   arr: [1, 2, 3],
//   foo() {
//     // this.arr.forEach(num => console.log(this.name, num));
//     this.arr.forEach(testFunc.bind(this));
//   }
// }

// // let arr = [1, 2, 3];
// // arr.forEach(testFunc);

// obj.foo();

// console.log(Array.prototype);

for (prop in Array.prototype) {
  console.log(prop);
}