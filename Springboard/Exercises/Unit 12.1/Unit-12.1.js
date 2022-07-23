class Vehicle {
    constructor(make, model, year){
        this.make = make,
        this.model = model,
        this.year = year
    }
    honk() {
        return 'Beep.';
    }

    toString() {
        return `The Vehicle is a ${this.make} ${this.model} from ${this.year}.`;
    }

}

let myVehicle = new Vehicle ('Toyota', 'Corolla', '2010');
myVehicle.honk();
myVehicle.toString();

class Car extends Vehicle {
    constructor(make, model, year, numWheels){
        super(make, model, year);
        this.numWheels = 4;
    }

}

let myCar = new Car ('Toyota', 'Corolla', '2010');
myCar.numWheels;

class Motorcycle extends Vehicle {
    constructor(make, model, year, numWheels){
        super(make, model, year)
        this.numWheels = 2;
    }
    revEngine() {
        return 'Vroom!!!'
    }

}

let myMotorcycle = new Motorcycle('Honda', 'NightHawk', 2000);
myMotorcycle.revEngine();

class Garage {
    constructor(capacity){
        this.vehicles = [],
        this.capacity = capacity
    }
    add(newVehicle) {
        if(!(newVehicle instanceof Vehicle)){
            return "Only vehicles are allowed in here!";
        }
        if(this.vehicles.length >= this.capacity) {
            return "Sorry, we're full."
        }
        this.vehicles.push(newVehicle)
            return "Vehicle added!";
    }
}
