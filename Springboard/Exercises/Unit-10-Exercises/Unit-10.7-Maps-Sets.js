Maps and Sets Exercise

//What does the following code return?
new Set([1,1,2,2,3,4]) // Creates a set with a size 4 since it only contains unique values

// What does the following code return?
[...new Set("referee")].join("") // returns a string with no duplicate letter -> ref

// What does the Map m look like after running the following code?
let m = new Map();
m.set([1,2,3], true); {[1,2,3] => true}
m.set([1,2,3], false); {[1,2,3] => false, [1,2,3] => false}

//hasDuplicate--------------------
// Write a function called hasDuplicate which accepts an array and returns
// true or false if that array contains a duplicate

const hasDuplicate = arr => new Set(arr).size !== arr.length;

//vowelCount
// Write a function called vowelCount which accepts a string and returns a map where the keys
// are numbers and the values are the count of the vowels in the string.

function isVowel(string){
    let str = string.toLowerCase();
    return 'aeiou'.includes(str);
}

function vowelCount(someString){
    const str = someString.toLowerCase();
    const vowelMap = new Map();
    for(let char of str){
        if(isVowel(char)){
            if(vowelMap.has(char)){
                vowelMap.set(char, vowelMap.get(char)+1);
            } else {
                vowelMap.set(char, 1);
            }
        }
    }
    return vowelMap;
}
