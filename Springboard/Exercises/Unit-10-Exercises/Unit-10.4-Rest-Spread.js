function filterOutOdds() {
    var nums = Array.prototype.slice.call(arguments);
    return nums.filter(function(num) {
      return num % 2 === 0
    });
  }

  //Refactored Using rest operator and arrow function

const filterOutOdds = (...arguments) => arguments.filter(num => num % 2 === 0)

const findMin = (...nums) => Math.min(...nums)

const mergeObjects = (first, second) => ({...first, ...second})

const doubleAndReturnArgs = (arr, ...args) => [...arr, ...args.map(val => val*2)]

const removeRandom = (items) => {
  let randomItem = Math.floor(Math.random() * items.length);
  return [ ...items.slice(0, randomItem), ...items.slice(randomItem + 1)];
}

const extend = (arr1, arr2) => [ ...arr1, ...arr2]

const addKeyVal = (obj, key, val) => ({...obj, [key]:val})

const removeKey = (obj, key) =>  {
  let newObj = {...obj};
  delete newObj[key];
  return newObj;
}

const combine = (obj1, obj2) => ({...obj1, ...obj2})

const update = (obj, key, val) => {
  let newObj = {...obj}
  newObj[key] = val;
  return newObj;
}
