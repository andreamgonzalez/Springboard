 const items = require("../fakeDb");

 class Item {
    constructor(name, price) {
        this.name = name;
        this.price = price;

        items.push(this);
    }

    static listItems() {
        return items
    }

    static search(name) {
        //class method searches the actual fakedb for the name hence item.name
        let item = items.find(item => item.name === name);

        if(item === undefined) {
            throw {message: "Not Found", status: 404}
        }

        return item;
    }

    static update(name, data){
        let item = Item.search(name); // uses class method to find name provided

        if(item === undefined) {
            throw {message: "Not Found", status: 404}
        }

        item.name = data.name;
        item.price = data.price;

        return item;
    }
    
    static remove(name) {
        let itemIndex = items.findIndex(item => item.name === name);

        if(itemIndex === -1) {
            throw {message: "Not Found", status: 404}
        }

        items.splice(itemIndex, 1);
    }
 }

 //exports the Item class to rest of app
 module.exports = Item;