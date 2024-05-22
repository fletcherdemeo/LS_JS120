class Pet {
  constructor(type, name) {
    this.type = type;
    this.name = name;
  }

  getInfo() {
    return `a ${this.type} named ${this.name}`;
  }
}

class Owner {
  constructor(name) {
    this.name = name;
    this.pets = [];
  }

  numberOfPets() {
    return this.pets.length;
  }
}

class Shelter {
  constructor(name) {
    this.name = name;
    this.animals = []
    this.adoptions = {}
  }

  collect(pet) {
    this.animals.push(pet);
  }

  adopt(owner, pet) {
    this.adoptions[owner.name] = this.adoptions[owner.name] || [];
    this.adoptions[owner.name].push(pet);

    owner.pets.push(pet);
  }

  printUnadoptedPets() {
    console.log(`${this.name} has the following unadopted pets:`)
    this.animals.forEach(animal => console.log(animal.getInfo()));
    console.log();
  }

  printAdoptions() {
    for (let owner in this.adoptions) {
      console.log(`${owner} has adopted the following pets:`);
      this.adoptions[owner].forEach(pet => console.log(pet.getInfo()));
      console.log();
    }
  }

  numberOfPets() {
    return this.animals.length;
  }
}

let asta         = new Pet('dog', 'Asta');
let laddie       = new Pet('dog', 'Laddie');
let fluffy       = new Pet('cat', 'Fluffy');
let kat          = new Pet('cat', 'Kat');
let ben          = new Pet('cat', 'Ben');
let chatterbox   = new Pet('parakeet', 'Chatterbox');
let bluebell     = new Pet('parakeet', 'Bluebell');
let butterscotch = new Pet('cat', 'Butterscotch');
let pudding      = new Pet('cat', 'Pudding');
let darwin       = new Pet('bearded dragon', 'Darwin');
let kennedy      = new Pet('dog', 'Kennedy');
let sweetie      = new Pet('parakeet', 'Sweetie Pie');
let molly        = new Pet('dog', 'Molly');
let chester      = new Pet('fish', 'Chester');

let shelter = new Shelter('The Animal Shelter');
let phanson = new Owner('P Hanson');
let bholmes = new Owner('B Holmes');
shelter.collect(asta);
shelter.collect(laddie);
shelter.collect(fluffy);
shelter.collect(kat);
shelter.collect(ben);
shelter.collect(chatterbox);
shelter.collect(bluebell);
shelter.adopt(phanson, butterscotch);
shelter.adopt(phanson, pudding);
shelter.adopt(phanson, darwin);
shelter.adopt(bholmes, kennedy);
shelter.adopt(bholmes, sweetie);
shelter.adopt(bholmes, molly);
shelter.adopt(bholmes, chester);
shelter.printUnadoptedPets();
shelter.printAdoptions();
console.log(`${phanson.name} has ${phanson.numberOfPets()} adopted pets.`);
console.log(`${bholmes.name} has ${bholmes.numberOfPets()} adopted pets.`);
console.log(`${shelter.name} has ${shelter.numberOfPets()} unadopted pets.`);

// P Hanson has adopted the following pets:
// a cat named Butterscotch
// a cat named Pudding
// a bearded dragon named Darwin

// B Holmes has adopted the following pets:
// a dog named Molly
// a parakeet named Sweetie Pie
// a dog named Kennedy
// a fish named Chester

// P Hanson has 3 adopted pets.
// B Holmes has 4 adopted pets.