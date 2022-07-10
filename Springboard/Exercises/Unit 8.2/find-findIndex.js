function myFind(arr, callback){
    for(let i = 0; i < arr.length; i++) {
        if(callback(arr[i], i, arr) === true)
        return arr[i]; //arr[i] will return the contents of that index vs just i the index itself
    }
}

let myArray = [1,2,3,4,5,6,7,8,9];


myFind(myArray, function(val){
    return val > 8;
});



function myFindIndex (arr, callback) {
    for(let i = 0; i < arr.length; i++){
        if(callback(arr[i]) === true)
        return i;
    }
}

myFindIndex(myArray, function(val){
    return val === 5;
});
