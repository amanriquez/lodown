'use strict';



/**
 * each: Designed to loop over a collection, Array or Object, and applies the 
 * action Function to each value in the collection.
 * 
 * @param {Array or Object} collection: The collection over which to iterate.
 * @param {Function} action: The Function to be applied to each value in the 
 * collection
 */
 
function each(collection, action) {
    if(Array.isArray(collection)) {
        for(var i = 0; i < collection.length; i++) {
            action(collection[i], i, collection);
        }
    } else {
        for (var key in collection) {
            action(collection[key], key, collection);
        }
    }
}
module.exports.each = each;


/**
 * IDENTITY: returns any value unchanged.
 * 
 * @param {Value} any type of input
 * 
 * @output --> value;
 * 
 * 1.-return input argument
 * 
 */
 
 function identity(value){
     return value;
 }
 
 
 module.exports.identity = identity;
 
 /**
 * 
 * TYPEOF: returns a string of the type of input given, more specific than native
 * typeof because it differentiates arrays and null from literal objects. 
 * 
 * @param {value} any primitive or complex type. 
 * 
 * @output --> string of value type. 
 * 
 * Process:
 * 1.- Check for the three types of values that return object and make them return
 * what they actually are
 * 2.- now you can return everything else with native typeof.
 * 
 * example: typeOf([1,2,3]) ---> 'array'
 * 
 */
 
 function typeOf(value){
     
     
     if (Array.isArray(value)) return 'array';
     if (value instanceof Date) return 'date';
     if(value === null) return 'null';
     
     return typeof value;
     
 }
 
 
 module.exports.typeOf = typeOf;
 
 /**
 * FIRST: Given an array and a number, returns an array with the first <number> of
 * items in the array. If the number is larger than the number of items it returns 
 * the same array, if the number is not given or NaN it returns first item in the array. 
 * 
 * @param {Array} array to obtain given number of elements for new array
 * @param {Number} the number of elements to return
 * 
 * output -> new array with first <number> of elements.
 * 
 * Example: first([1,2,3,4], 2) --> [1,2];
 * 
 * Process:
 * 1.-check for edge scenarios: if not an array or number is negative, return [];
 * 2.-if number is undefined or Nan return array[0];
 * 3.-if number is larger than array length return array
 * 4.-for each element, if it's index in the array is smaller than <number> push
 * it into a new array. 
 * 
 * 
 */
 
 function first(array, number){
     
     if (!Array.isArray(array) || number < 0 ) return array[0];
     if (number === undefined || isNaN(number)) return [];
     if (number > array.length) return array;
     let newArr = [];
     
     each(array, e =>{
         if (array.indexOf(e) < number){
             newArr.push(e);
         }
     });
     return newArr;
 }
 
 //could also use slice 
 
 module.exports.first = first;
 
 /**
 * LAST: Like first, but starting from the last index position. That is to say, it
 * returns the <last> number of elements of an array. If the number is undefined or
 * not a number, return only the last element in the array. 
 * 
 * @param {Array} array to iterate over.
 * @param {Number} of elements to return
 * 
 * output -> new array with last <number> of elements
 * 
 * example: last([1,2,3,4,5], 3) --> [3,4,5]
 * 
 */
 
 function last(array, number){
     
    if (!Array.isArray(array)) return [];
    if (number === undefined || isNaN(number)) return array[array.length -1];
    if (number > array.length) return array;
    
    let newArr = [];
    
    each(array, e => {
        if (array.indexOf(e) >= array.length - number){
            newArr.push(e);
        }
    });
     
     return newArr;
     
 }
 
 module.exports.last = last;
 
 
 /**
 * INDEXOF: returns the first occurence index of any given value 
 * in any given array. if value is not in array it returns -1.
 * 
 * @param {array} the array to iterate over
 * @param {value} the value to look for to return its index.
 * 
 * example --> indexOf([1,2,3,4,5], 1) --> 0
 * 
 * Process:
 * 1.-for each element in array, if an item is found, exit loop returning its index
 * 2.- if nothing is found return -1.
 * 
 * 
 */
 
 function indexOf(array, value){
     
      let result = -1;

    each(array, (e, i) => {
      if (e === value && result === -1) {
        result = i;
      }
    });

    return result;
     
 }
 
 
module.exports.indexOf = indexOf;
 
 
 /**
 * CONTAINS: returns true if a given array contains a given value, false otherwise.
 * 
 * @param {array} to iterate over
 * @param {value} to check for and return boolean.
 * 
 * output -> boolean
 * 
 * example: contains([1,2,3,4], 3) --> true;
 * 
 * process:
 * 1.- Does array contain an index value of value? yes, return true, no, false. 
 * 
 * 
 */
 
function contains(array, value){
     
       return (array.indexOf(value) !== -1) ? true:false;
     
 }
 
 module.exports.contains = contains;
 
 /**
 * UNIQUE: takes an array and returns an array with all duplicates removed. 
 * 
 * @param {array} array to remove duplicates from.
 * 
 * example -> unique([1,2,2,2,3,4,4,5]) --> [1,2,3,4,5]
 * 
 * process:
 * 
 * 1.-using filter, pass a callback function that tests if the index of an item is 
 * the same that indexOf would return, since indexOf only gives you the index of
 * the first element. 
 * 
 * 
 */
 
 function unique(array){
     
    return array.filter( (e, i, a) => i === a.indexOf(e));
     
 }
 
 
 
 module.exports.unique = unique;
 
 /**
 * FILTER: takes as arguments an array and a function(element, index, array), it returns
 * a new array with all the elements that returned true upon calling that function, getting
 * rid of all falsey values. 
 * 
 * @param {array} array of elements to be passed into function 
 * @param {function} function(e, i a), boolean test to pass on each element of array.
 * 
 * output -> new array with values that returned true 
 * 
 * example->   filter([1,2,3,4], e => e > 2) --> [3,4];
 * 
 * Process:
 * 1.- create new empty array
 * 2.- iterate over array with each, and pass the function through each element,
 * if it returns a true or truthy value, push it into new array. if not, do nothing.
 * 3.- return new array. 
 * 
 */
 
 function filter(array, func){
     
     let newArr = [];
     
     each(array, (e, i, a) => {
         if (func(e, i, a)){
             newArr.push(e);
         }
     });
     return newArr;
 }
 
 module.exports.filter = filter;
 
 /**
 * REJECT: logical inverse of filter, given an array and a function returns a new array
 * with everything that returned false or falsey after passing the function
 * 
 * @param {array} array to iterate over and test easch element
 * @param {function} function to pass to return boolean value
 * 
 * output --> 
 * 
 * example: reject([1,2,3,4], e => e > 2) --> [1,2];
 * 
 * Process: 
 * 
 * 1.- logical inverse of filter, iterate over array and push everything that returns
 * false into a new array. use bang operator.
 * 
 */
 
 function reject(array, func){
  
  let newArr = [];
  
  each(array, function(e, i, a) {
      
      if (!func(e, i, a)){
          newArr.push(e);
      }
      
  });
  return newArr;

 }
 
 
 module.exports.reject = reject;
 
 
 /**
 * PARTITION: given an array and a test function, it returns an array of two sub-arrays, one 
 * with every value that passed the test and returns truthy and another with every value 
 * that didn't and returns falsey. 
 * 
 * @param {Array} Array over which to iterate
 * @param {Function} to test for each element in <array> passing it the arguments:
 * element, key, <array>
 * 
 * Example: partition([1,2,3,4,5], e => e > 3); -> [[4,5],[1,2,3]]
 * 
 * Process:
 * 
 * 1.- Create empty array with two empty sub-arrays
 * 2.- for Each element in the array, pass the test function, if it returns true
 * push it to newArray[0], if it returns false push it to newArray[1];
 * 3.- return newArr. 
 * 
 */
 
 function partition(array, func){
     
     let newArr = [[],[]];
     each(array, function(e, i, a){
         if (func(e, i, a)){
             newArr[0].push(e);
         } else{
             newArr[1].push(e);
         }
     });
     return newArr;
 }
 
 module.exports.partition = partition;
 
 /**
 * MAP: takes a collection (array or object) and a function as parameters, it passes
 * the function through each element in the collection and returns a new array with all
 * the return values. Kind of like each but with a return value, the new array. 
 * 
 * @param {array} array of elements that will be passed through function
 * @param {function} to pass through elements, function(e, i, a) or function(value, key, collection)
 * 
 * output -> new array with all the return value. 
 * 
 * example: map([1,2,3,4], e => e + 2) --> [3,4,5,6];
 * 
 * Process:
 * 1.- iterate through each element of collection with each
 * 2.- Pass each element through your function and push return value to new array
 * 3.- return new array. 
 * 
 * 
 */
 
 function map(array, func){
     
     let newArr =[];
     
     each(array, function(e, i, a){
         
        newArr.push(func(e,i,a));
     });
     
    return newArr;
 }
 
 
 module.exports.map = map;
 
 /**
 * PLUCK: given an array of objects and a given property, this function returns an array
 * containing the value of the given property for each object element in the array. 
 * 
 * 
 * @param {array of objects}
 * @param {key} a property to look 
 * 
 * 1.-map over array with the input function to just return the value of each key for
 * the given object
 * 
 * 
 */
 
 function pluck(array, key){
     
     return map(array, e => e[key]);
     
 }
 
 
 
 module.exports.pluck = pluck;
 
 /**
 * EVERY: takes a collection (array or object) and a function, it passes the function 
 * to every element in the array. if at least one of them returns false, EVERY returns false,
 * if all of them pass the test and return true, then it returns true. if no function is
 * provided, return true if every element is truthy, otherwise return false. 
 * 
 * output -> boolean.
 * 
 * @param {collection} array or object to iterate over
 * @param {function} array, function(e, i,a) or object, function(value, key, collection);
 * 
 * example -> every([1,2,3,4,5], e => e > 4) --> false;
 * 
 * Process:
 * 1.- check if there was no function provided, and check if at least one element
 * is falsey, return false, if not return true;
 * 2.- Create as result variable and set it to true
 * 3.- loop over the collection with each, if at least one element returns falsey,
 * result variable is equal to false.
 * 4.- return result. 
 * 
 */
 
 function every(collection, func){
     
     
     if (func === undefined){
        for (let element of collection){
            return (!element) ? false: true;
        }
    }
        let result = true;
    
        each(collection, (e,i,a) =>{
            if(!func(e, i, a)){
            result = false;
            }
        });
    return result;
 }
 
 module.exports.every = every;
 
 /**
 * SOME: takes as arguments a collection and a function. it passes each element
 * of the collection through the function and if the return value is true for at least one
 * element, return true. if it is false for all elements, return false. If a 
 * function is not provided, returns true if at least one element is truthy, otherwise returns false.
 * 
 * @param {collection} collection to iterate over
 * @param {function} array, function(e, i,a) or object, function(value, key, collection);
 * 
 * output -> boolean.
 * 
 * example -> every([1,2,3,4,5], e => e > 4) --> true;
 * 
 * Process: 
 * 
 * 1.- Similar to every, check for every elements truthiness if a function wasn't passed,
 * if at least one of them is truthy, return true.
 * 2.- set the result variable to false.
 * 3.- Iterate over the collection with each and if at least one return value of
 * the function being passed to those elements is true, change result to true.
 * 4.- return result. 
 * 
 * 
 */
 
 function some (collection, func){
    
    if (func === undefined){
        for (let element of collection){
            return (element) ? true: false;
        }
    }
        let result = false;
        each(collection, (e,i, a) =>{
            if(func(e, i, a)){
            result = true;
            }
        });

    return result;
    
}
 
module.exports.some = some;
 
 /**
 * REDUCE: takes as arguments an array, a function and a seed. It then
 * calls function for every element in the collection passing seed, element
 * and index. For the next iteration you use the return value of <function> as the
 * previous result(seed). On the very first iteration you use seed as the previous result. And if
 * no seed is given, use the first element of collection as seed. After the last iteration
 * it returns the return value of the final <function> call - the great SEED ACCUMULATOR. 
 * 
 * @param {array}
 * @param {function} function (seed, e, i);
 * @param {seed} optional, if not given seed is set to first element. 
 * 
 * output -> seed accumulator
 * 
 * example: reduce([1,2,3,4], (seed, next) => seed + next) --> 10
 * 
 */
 
 function reduce(array, func, seed){
     
     each(array, function(e, i, a) {
         
         if (seed === undefined){
             seed = e;
         } else{
             seed = func(seed, e, i);
         }
     });
        return seed;
 }
 
 
 module.exports.reduce = reduce;
 
 /**
 * EXTEND: Takes in any number of object arguments, and assigns the properties and keys 
 * of every object on the list into the first object. 
 * 
 * @param {object}
 * @param {more objects...}
 * 
 * output -> The first object with all the properties and corresponding values of every other 
 * object that was input as a parameter. 
 * 
 * example -> extend({1: one}, {2: two}, {3: three}) --> {1: one, 2: two, 3: three}
 * 
 * Process: 
 * 1.- Make an array of all arguments given
 * 2.- loop over the array, pull the keys and values and assign them to first object.
 * 
 * 
 */
 
 function extend(object){
     
     let objects = Array.from(arguments);
     
     each(objects, (e, i, a) => {
        Object.assign(object, e);
 });
 
 return object;
 
     
 }
 
 module.exports.extend = extend;
 
 /**
 * DEFAULTS:
 * 
 * @param {}
 * @param {}
 * 
 * 
 */
 
 //module.exports.
 
 /**
 * ONCE:
 * 
 * @param {}
 * @param {}
 * 
 * 
 */
 
 //module.exports.
 
 /**
 * MEMOIZE:
 * 
 * @param {}
 * @param {}
 * 
 * 
 */
 
 //module.exports.
 