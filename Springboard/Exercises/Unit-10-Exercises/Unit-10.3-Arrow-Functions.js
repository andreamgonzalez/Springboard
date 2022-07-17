//ES5 Map Callback

function double(arr) {
  return arr.map(function(val) {
    return val * 2;
  });
}


//Arrow Function Version

const double = arr => arr.map((val) => val*2);

//----------------------------------------------//

function squareAndFindEvens(numbers){
  var squares = numbers.map(function(num){
    return num ** 2;
  });
  var evens = squares.filter(function(square){
    return square % 2 === 0;
  });
  return evens;
}


//Arrow Function Version

const squareAndFindEvens = numbers => numbers.map( num => num **2).filter(squaredNum => squaredNum % 2 === 0);
