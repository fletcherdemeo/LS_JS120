// Question 1
// Suppose we want to use code to keep track of products in our hardware
// store's inventory. A first stab might look something like this:

// let scissorsId = 0;
// let scissorsName = 'Scissors';
// let scissorsStock = 8;
// let scissorsPrice = 10;

// let drillId = 1;
// let drillName = 'Cordless Drill';
// let drillStock = 15;
// let drillPrice = 45;

// This code presents a number of problems, however. What if we want to
// add another kind of drill? Given what we've learned about object
// orientation in the previous assignment, how could we use objects to
// organize these two groups of data?

// Can create an object for each inventory items

function createProduct(id, name, stock, price) {
  return {
    id: id,
    name: name,
    stock: stock,
    price: price,
    describe: function() {
      console.log(`=> Name: ${this.name}`);
      console.log(`=> ID: ${this.id}`);
      console.log(`=> Price: $${this.price}`);
      console.log(`=> Stock: ${this.stock}`);  
    },
    setPrice: function(price) {
      if (price < 0) {
        console.log('Price is invalid');
      } else {
        this.price = price;
      }  
    }
  }
}

let scissors = createProduct(0, 'Scissors', 8, 10);
let drill = createProduct(1, 'Cordless Drill', 15, 45);
let spoon = createProduct(2, 'Spoon', 12, 4);
let knife = createProduct(3, 'Knife', 15, 4);

console.log(scissors);
console.log(drill);
console.log(spoon);
console.log(knife);
