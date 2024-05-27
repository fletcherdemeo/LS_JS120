// Problem 
// Write a function objectsEqual that accepts two object arguments
// and returns true or false depending on whether the objects have
// the same key/value pairs.

// Algorithm
// - get list of keys for obj1
//   - if key is not in obj2 return false
//   - if obj1[key] !== obj2[key] return false
// - get list of keys for obj2
//   - if key is not in obj1 return false
//   - if obj2[key] !== obj1[key] return false
// - otherwise return true

// Code
function propertiesEqual(obj1, obj2) {
  for (let key in obj1) {
    if (!obj2.hasOwnProperty(key)) return false;
    if (obj1[key] !== obj2[key]) return false;
  }

  return true;
}

function objectsEqual(obj1, obj2) {
  if (propertiesEqual(obj1, obj2) && propertiesEqual(obj2, obj1)) {
    return true;
  } 

  return false;
}

console.log(objectsEqual({a: 'foo'}, {a: 'foo'}));                      // true
console.log(objectsEqual({a: 'foo', b: 'bar'}, {a: 'foo'}));            // false
console.log(objectsEqual({a: 'foo', b: 'bar'}, {b: "bar", a: 'foo'}));  // true
console.log(objectsEqual({}, {}));                                      // true
console.log(objectsEqual({a: 'foo', b: undefined}, {a: 'foo', c: 1}));  // false
console.log(objectsEqual({a: 'foo', b: undefined}, {a: 'foo'}));        // false
console.log(objectsEqual({a: 'foo', b: []}, {a: 'foo', b: []}));        // false

