// Question 1
// If we have a Car class and a Truck class, how can you use the Speed 
// object as a mix-in to make them goFast? How can you check whether 
// your Car or Truck can now go fast?

// const Speed = {
//   goFast() {
//     console.log(`I'm a ${this.constructor.name} and going super fast!`);
//   }
// };

// class Car {
//   goSlow() {
//     console.log(`I'm safe and driving slow.`);
//   }
// }
// Object.assign(Car.prototype, Speed);

// class Truck {
//   goVerySlow() {
//     console.log(`I'm a heavy truck and like going very slow.`);
//   }
// }
// Object.assign(Truck.prototype, Speed);

// let newCar = new Car();
// console.log(newCar.goSlow());
// console.log(newCar.goFast());
// let newTruck = new Truck();
// console.log(newTruck.goVerySlow());
// console.log(newTruck.goFast());

// Question 2
// In the last question, we used a mix-in named Speed that contained a 
// goFast method. We included the mix-in in the Car class and then called 
// the goFast method from an instance of the Car class. You may have 
// noticed that the string printed when we call goFast includes the name 
// of the type of vehicle we are using. How is that done?

// It includes the name of the type of vehicle because the method is being
// called on an instance of the Car or Truck classes. JavaScript will search
// in the instance to find the goFast method, when it can't be found it will
// continue up the prototype chain where it will be found in the Car and
// Truck prototypes thanks to the Object.assign method calls we have used.
// The goFast method will then have the execution context from the instance 
// that calls it and thus have access to the constructor property on this.

// Question 3
// Ben and Alyssa are working on a vehicle management system. Thus far, 
// they have created classes named Auto and Motorcycle to represent 
// automobiles and motorcycles. After they noticed that the information 
// and calculations performed was common to both vehicle types, they 
// decided to break out the commonality into a separate class named 
// WheeledVehicle. Their code, thus far, looks like this:

const Vehicle = {
  range() {
    return this.fuelCap *  this.fuelEfficiency;
  }
}

class WheeledVehicle {
  constructor(tirePressure, kmTravelledPerLiter, fuelCapInLiter) {
    this.fuelEfficiency = kmTravelledPerLiter;
    this.fuelCap = fuelCapInLiter;
    this.tires = tirePressure;
  }

  tirePressure(tireIdx) {
    return this.tires[tireIdx];
  }

  inflateTire(tireIdx, pressure) {
    this.tires[tireIdx] = pressure;
  }
}
Object.assign(WheeledVehicle.prototype, Vehicle);

class Auto extends WheeledVehicle {
  constructor() {
    // the array represents tire pressure for four tires
    super([30,30,32,32], 50, 25.0);
  }
}

class Motorcycle extends WheeledVehicle {
  constructor() {
    // array represents tire pressure for two tires
    super([20,20], 80, 8.0);
  }
}

// This new class doesn't fit well with our existing class hierarchy:
// Catamarans don't have tires, and aren't wheeled vehicles. However, 
// we still want to share the code for tracking fuel efficiency and 
// range. Modify the class definitions and move code into a mix-in, 
// as needed, to share code between the Catamaran and the wheeled 
// vehicle classes.

class Catamaran {
  constructor(propellerCount, hullCount, kmTravelledPerLiter, fuelCapInLiter) {
    this.fuelEfficiency = kmTravelledPerLiter;
    this.fuelCap = fuelCapInLiter;
    this.propellerCount = propellerCount;
    this.hullCount = hullCount;
  }
}
Object.assign(Catamaran.prototype, Vehicle);

let cat = new Catamaran(2, 2, 10, 5);
console.log(cat.range());
let car = new Auto();
console.log(car.range());
