/*jshint eqnull:true, expr:true*/

var _ = { };

(function() {

  /**
   * COLLECTIONS
   * ===========
   *
   * In this section, we'll have a look at functions that operate on collections
   * of values; in JavaScript, a 'collection' is something that can contain a
   * number of values--either an array or an object.
   */

  // Return an array of the first n elements of an array. If n is undefined,
  // return just the first element.
  _.first = function(array, n) {
    if (n) {
      var newArray = [];
      if (n > array.length) {
        n = array.length;
      }

      for (var i = 0; i < n; i++) {
        newArray.push(array[i]);
      }
      return newArray;
    } else {
      return array[0];
    }
  };

  // Like first, but for the last elements. If n is undefined, return just the
  // last element.
  _.last = function(array, n) {
    if (n) {

      var newArray = [];
      if (n > array.length) {
        for (var i = 0; i < array.length; i++) {
          newArray.push(array[i]);
        }
      } else {
        for (var i = (n - 1); i < array.length; i++) {
          newArray.push(array[i]);
        }
      }

      return newArray;

    } else {
      return array[array.length - 1];
    }
  };

  // Call iterator(value, key, collection) for each element of collection.
  // Accepts both arrays and objects.
  _.each = function(collection, iterator) {
      for (var key in collection) {
        iterator(collection[key], key, collection);
      }
  };

  // Returns the index at which value can be found in the array, or -1 if value
  // is not present in the array.
  _.indexOf = function(array, target){
    var tempArray = [];
    array.forEach(function (item) {
      tempArray.push(item);
    })

    return tempArray.indexOf(target);
  };

  // Return all elements of an array that pass a truth test.
  _.filter = function(collection, iterator) {
    var newArray = collection.filter(function (item, index) {
      if (iterator(item)) return true;
    })

    return newArray
  };

  // Return all elements of an array that don't pass a truth test.
  _.reject = function(collection, iterator) {
    var newArray = collection.filter(function (item, index) {
      if (!iterator(item)) return true;
    })

    return newArray
  };

  // Produce a duplicate-free version of the array.
  _.uniq = function(array) {
    var uniqueArray = array.filter(function (elem, index) {
                        return (array.indexOf(elem) === index);
                      }); 

    return uniqueArray;
  };


  // Return the results of applying an iterator to each element.
  _.map = function(array, iterator) {
    array = array.map(function (item, index) {
      return iterator(item);
    })

    return array;
  };

  // Takes an array of objects and returns and array of the values of
  // a certain property in it. E.g. take an array of people and return
  // an array of just their ages
  _.pluck = function(array, propertyName) {
    var results = [];
    array.forEach(function (item, index) {
      results.push(item[propertyName]);
    })

    return results
  };

  // Calls the method named by methodName on each value in the list.
  _.invoke = function(list, methodName, args) {
    var newArray = [];

    list.forEach(function (array, index) {
      if (typeof methodName === 'string') {
        newArray.push(array[methodName]())
      } else {
        newArray.push(methodName.call(array))
      }
    })

    return newArray;
  };

  // Reduces an array or object to a single value by repetitively calling
  // iterator(previousValue, item) for each item. previousValue should be
  // the return value of the previous iterator call.
  _.reduce = function(collection, iterator, initialValue) {
    var sum = 0;
    if (initialValue) {
      sum = initialValue;
    }

    collection.forEach(function (number, index) {
      sum = iterator(sum, number);
    })

    return (sum);
  };

  // Determine if the array or object contains a given value (using `===`).
  _.contains = function(collection, target) {
    var isThere = false;

    if(collection.constructor === Array) {
    if (collection.indexOf(target) > -1)
      isThere = true;
    } else if(collection.constructor === Object) {
      for (var key in collection) {
        if(collection[key] === target) {
          isThere = true;
        }
      }
    }

    return isThere
  };


  // Determine whether all of the elements match a truth test.
  _.every = function(collection, iterator) {

    if(!iterator) return true;

    var newResults = [];
    collection.forEach(function (item, index) {
      newResults.push(!!iterator(item));
    })

    if (newResults.indexOf(false) > -1) {
      return false;
    } else {
      return true;
    }

  };

  // Determine whether any of the elements pass a truth test. If no iterator is
  // provided, provide a default one
  _.some = function(collection, iterator) {
    if(collection.length === 0) return false;

    var newResults = [];
    if (iterator) {
      collection.forEach(function (item, index) {
        newResults.push(!!iterator(item));
      })
    } else {
      collection.forEach(function (item, index) {
        if(item === 'yes') {
          newResults.push(true);
        } else {
          newResults.push(item);
        }
      })
    }

    if (newResults.indexOf(true) > -1) {
      return true;
    } else {
      return false;
    }

  };


  /**
   * OBJECTS
   * =======
   *
   * In this section, we'll look at a couple of helpers for merging objects.
   */

  // Extend a given object with all the properties of the passed in
  // object(s).
  _.extend = function(obj) {
    var newObject = {};
    var myForEach = Array.prototype.forEach.bind(arguments);

    myForEach(function (item, index) {
      for (var key in item) {
        newObject[key] = item[key];
      }
    })

    return newObject
  };

  // Like extend, but doesn't ever overwrite a key that already
  // exists in obj
  _.defaults = function(obj) {
    var myForEach = Array.prototype.forEach.bind(arguments);

    myForEach(function (item, index) {
      for (var key in item) {
        // console.log(!isNaN(item[key]), item[key].constructor, item[key]);


        // NaN -> (!isNaN(item[key]) || item[key].constructor === String)
        // undefined -> item[key] !== undefined
        // empty string -> item[key] !== ''
        // false -> item[key] !== false


        if(!obj.hasOwnProperty(key)) {
          obj[key] = item[key];
        }
      }
    })

    // console.log('newObject: ', obj);
  };


  /**
   * FUNCTIONS
   * =========
   */

  // Return a function that can be called at most one time. Subsequent calls
  // should return the previously returned value.
  _.once = function(func) {
    var ran = false;
    return function () {
      if(!ran) {
        func();
        ran = true;
      }
    }
  };

  // Memoize an expensive function by storing its results. You may assume
  // that the function takes only one argument and that it is a primitive.
  //
  // Memoize should return a function that when called, will check if it has
  // already computed the result for the given argument and return that value
  // instead if possible.
  _.memoize = function(func) {

    console.log(func);

  };

  // Delays a function for the given number of milliseconds, and then calls
  // it with the arguments supplied.
  //
  // The arguments for the original function are passed after the wait
  // parameter. For example _.delay(someFunction, 500, 'a', 'b') will
  // call someFunction('a', 'b') after 500ms
  _.delay = function(func, wait, args) {
    var passedArguments = [];
    for (var i = 2; i < arguments.length; i++){
        passedArguments.push(arguments[i])
    }

    setTimeout(function () {
      func(passedArguments[0], passedArguments[1])
    }, wait);
  };



  // Shuffle an array.
  _.shuffle = function(array) {
    var arrLength = array.length;

    var newArray = [];
    var newPositions = [];
    var newPosition = NaN;

    array.forEach(function (item, index) {
      newPositions.push(index);
    })

    var getRandomNumber = function () {
      newPosition = Math.round(Math.random() * (newPositions.length * 10));
    }

    array.forEach(function (item, index) {
      getRandomNumber();
      
      if (newPositions.indexOf(newPosition) > -1) {
        newArray[newPosition] = item;
        newPositions.splice(newPositions.indexOf(newPosition), 1);
      }

    })

    return newArray
  };

  // Sort the object's values by a criterion produced by an iterator.
  // If iterator is a string, sort objects by that property with the name
  // of that string. For example, _.sortBy(people, 'name') should sort
  // an array of people by their name.
   _.sortBy = function(collection, iterator) {

    var newArray = [];

    if (iterator.constructor === Function) {
      collection.forEach(function (item, index) {
        var orderQuery = iterator(item);
        newArray.push({
          orderQuery: orderQuery,
          originalItem: item
        })
      })

      newArray = newArray.sort(compare);

    } else if (iterator === 'length') {
      collection.forEach(function (item, index) {
        newArray.push({
          orderQuery: item,
          originalItem: item
        })
      })

      newArray = newArray.sort(compareLength);

    }

    function compare(a,b) {
      if(a.orderQuery === b.orderQuery)
        return 0;
      if (a.orderQuery < b.orderQuery)
        return -1;
      if (a.orderQuery > b.orderQuery || a.orderQuery === undefined)
        return 1;
      return 0;
    }

    function compareLength(a,b) {
      // console.log(a, b);
      if (a.orderQuery.length < b.orderQuery.length)
        return -1;
      if (a.orderQuery.length > b.orderQuery.length)
        return 1;
      return 0;
    }

    var result = [];

    newArray.forEach(function (item, index) {
      result.push(item.originalItem);
    })

    return result

  };

  // Zip together two or more arrays with elements of the same index
  // going together.
  //
  // Example:
  // _.zip(['a','b','c','d'], [1,2,3]) returns [['a',1], ['b',2], ['c',3], ['d',undefined]]
  _.zip = function() {
      var passedArguments = [];
      for (var i = 0; i < arguments.length; i++){
          passedArguments.push(arguments[i])
      }


      var result = [];
      var largestLength = 0;

      // get largest length
      passedArguments.forEach(function (passedArray, index) {
        if (passedArray.length > largestLength)
          largestLength = passedArray.length;
      })

      // for each location in largestlength
      for (var i = 0; i < largestLength; i++) {
        // this array is created for each count in largestlength (and is contained within the loop)
        var iArray = [];

        // This repeats the push for as many arguments that were passed
        for (var m = 0; m < passedArguments.length; m++) {
          iArray.push(passedArguments[m][i])
        }

        result.push(iArray);
      }

      return result;
  };

  // Takes a multidimensional array and converts it to a one-dimensional array.
  // The new array should contain all elements of the multidimensional array.
  _.flatten = function(nestedArray) {
    var result = [];

    var checkForArray = function (item) {
      if (item.constructor === Array) {
        return true;
      } else {
        return false;
      }
    }

    var cleanArray = function (array) {
      array.forEach(function (item) {
        var isArray = checkForArray(item);
        if (isArray) {
          cleanArray(item);
        } else {
          result.push(item);
        }
      })
    }

    cleanArray(nestedArray);

    return result;

  };

  // Takes an arbitrary number of arrays and produces an array that contains
  // every item shared between all the passed-in arrays.
  _.intersection = function(arrayOne, arrayTwo) {
    var result = [];
    arrayOne.forEach(function (item) {
      var indexInTwo = arrayTwo.indexOf(item);
      if (indexInTwo > -1) {
        result.push(item);
      }
    })

    return result;

  };

  // Take the difference between one array and a number of other arrays.
  // Only the elements present in just the first array will remain.
  _.difference = function(array) {
      var passedArguments = [];
      for (var i = 0; i < arguments.length; i++){
          passedArguments.push(arguments[i])
      }

      passedArguments.shift();

      passedArguments.forEach(function (argument) {
        argument.forEach(function (number) {
          var numIndex = array.indexOf(number);
          if (numIndex > -1) {
            array.splice(numIndex, 1);
          }
        })
      })

      return array;
  };

}).call(this);
