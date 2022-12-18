/**
 * Convert strings to numbers
 * @param {Array} strNumsParam array of strings
 * @returns {Array|Error} an array or an error object
 */

function stringToNums(strNumsParam) {
    let convertedNumsArr = []

    for (let i = 0; i < strNumsParam.length; i++){
        let convertedToNumber = Number(strNumsParam[i]);

        if(Number.isNaN(convertedToNumber)) {
            return new Error(`The value ${strNumsParam[i]} is not a valid number.`);
        }
        convertedNumsArr.push(convertedToNumber);
    }
    return convertedNumsArr;
}

function calculateMean(numsArray) {

    if(numsArray.length === 0) return 0;
        return numsArray.reduce( (acc, curr) => {
            return acc + curr;
        }) / numsArray.length;
}


function calculateMedian(numsArray) {
    numsArray.sort( (a, b) => a-b);
    let i = Math.floor(numsArray.length / 2);

    let median;

    if(numsArray.length % 2 === 0){
        median = (numsArray[i] + numsArray[i-1]) / 2;
    } else {
        median = numsArray[i];
    }
    return median;
}

function counter(numsArray) {
    return numsArray.reduce(function (acc, next ){
        acc[next] = (acc[next] || 0 ) + 1;
        return acc;
    }, {}); //return object of keys and values(counts for each key)
}

function calculateMode(numsArray){
    let counter = counter(numsArray); 
    //iterate through counter object
    let count = 0;
    let highest;

    for(let num in counter) {
        if(counter[num] > count) {
            highest = num;
            count = counter[num];
        }
    }
    return +highest;
}


module.exports = {
    counter, 
    stringToNums,
    calculateMean,
    calculateMedian,
    calculateMode,
}