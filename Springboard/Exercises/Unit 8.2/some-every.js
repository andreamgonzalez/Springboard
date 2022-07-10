function mySome(arr, callback){
    for (let i = 0; i < arr.length; i++){
        if(callback(i))
        return true;
    }
    return false;
}

function myEvery(arr, callback){
    for (let i = 0; i < arr.length; i++){
        if(!callback(i))
        return false;
    }
    return true;
}
