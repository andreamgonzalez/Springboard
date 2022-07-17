//-----------------------------Same keys and values-----------------------------
function createInstructor(firstName, lastName){
    return {
        firstName: firstName,
        lastName: lastName
    }
}

/* Write an ES2015 Version */
const createInstructor = (firstName, lastName) => ({
    firstName,
    lastName
});

//-----------------------------Computed Property Names--------------------------

var favoriteNumber = 42;

var instructor = {
    firstName: "Colt"
}

instructor[favoriteNumber] = "That is my favorite!"

/* Write an ES2015 Version */
let favoriteNum = 42;
const instructor = {
    firstName: 'Colt',
    [favoriteNum]: "That is my favorite!"
}

//-----------------------------Object Methods---------------------------------
var instructor = {
    firstName: "Colt",
    sayHi: function(){
        return "Hi!";
    },
    sayBye: function(){
        return this.firstName + " says bye!";
    }
}
/* Write an ES2015 Version */

let instructor = {
    [firstName]: 'Colt',
    sayHi() {
        return 'Hi!';
    },
    sayBye() {
        return this.firstName + " says bye!";
    }
}

//---------------------------createAnimal function-----------------------------
const d = createAnimal("dog", "bark", "Woooof!")
// {species: "dog", bark: ƒ}
d.bark()  //"Woooof!"

const s = createAnimal("sheep", "bleet", "BAAAAaaaa")
// {species: "sheep", bleet: ƒ}
s.bleet() //"BAAAAaaaa"


function animal (species, verb, noise) {
    return  {
        species,
        [verb](){
            return noise;
        }
    }
}
