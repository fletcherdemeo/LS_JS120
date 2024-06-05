let person = {
  firstName: 'Rick ',
  lastName: 'Sanchez',
  fullName: this.firstName + this.lastName,
};

console.log(person.fullName);

// The person variable is declared on line 1. It is initialized to an object
// with firstName, lastName and fullName properties. At point of initialization 
// the this context refers to the 'global' this, which will not have
// firstName or lastName properties and thus will evaluate undefined + undefined
// to NaN. When we access this property on line 7 fullName refers to 
// NaN which was evaluated during initialisation.
