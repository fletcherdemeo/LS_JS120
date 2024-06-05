// The method franchise.allMovies is supposed to return the following array:

// [
//   'How to Train Your Dragon 1',
//   'How to Train Your Dragon 2',
//   'How to Train Your Dragon 3'
// ]

let franchise = {
  name: 'How to Train Your Dragon',
  allMovies: function() {
    let self = this;
    return [1, 2, 3].map(function(number) {
      return self.name + ' ' + number;
    });
  },
};

console.log(franchise.allMovies());

// The anonymous callback function will lose its execution context when
// it is executed (all anonymous functions exhibit this behaviour) and 
// will be executed within the context of the global scope. In this 
// instance the 'global' scope will not have a property called name 
// resulting in the returned arrray being: 
// [undefined 1, undefined 2, undefined 3].
// This problem can be fixed by providing access to the name variable by
// creating a reference to this within the allMovies method (via the self 
// variable in this instance). 
