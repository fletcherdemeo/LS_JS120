class Vehicle {
  constructor(make, model, wheels) {
    this.make = make;
    this.model = model;
    this.wheels = wheels;
  }

  info() {
    return `${this.make} ${this.model}`;
  }

  getWheels() {
    return this.wheels;
  }
}

class Car extends Vehicle {
  static WHEELS = 4;

  constructor(make, model) {
    super(make, model, Car.WHEELS);
  }
}

class Motorcycle extends Vehicle {
  static WHEELS = 2;

  constructor(make, model) {
    super(make, model, Motorcycle.WHEELS);
  }
}

class Truck extends Vehicle {
  static WHEELS = 6;

  constructor(make, model, payload) {
    super(make, model, Truck.WHEELS);
    this.payload = payload;
  }
}