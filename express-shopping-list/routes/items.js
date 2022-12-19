/**
 * Routes for shopping cart
 */

const express = require("express");
const Item = require("../utilities/item");
const router = express.Router();

/** GET / => [item, ...] */
router.get("", (req, res, next) => {
    //List all items in shopping list
    try{
        return res.json({ items: Item.listItems() });
    }catch (err) {
        return next(err);
    }
});

/** POST / {name, price} => new-item */
router.post("", (req, res, next) => {
    //Add item to shopping list
    try{
        let newItem = new Item(req.body.name, req.body.price);
        return res.json({ items: newItem });
    }catch (err) {
        return next(err);
    }
});

/** GET /[name] => item */
router.get("/:name", (req, res, next) => {
    //Retrieve item from shopping list
    try{
        return res.json({ item: Item.search(req.params.name) });
    }catch (err) {
        return next(err);
    }
});

/** PATCH /[name] => item */
router.patch(":/name", (req, res, next) => {
    //Update item in shopping list
    try{
        return res.json({ item: Item.update(req.params.name, req.body) });
    }catch (err) {
        return next(err);
    }
});

/** DELETE /[name] => "Removed" */
router.delete(":/name", (req, res, next) => {
    //Delete item in shopping list
    try{
        Item.remove(req.params.name);
        return res.json({ msg : "Item Deleted" });
    }catch (err) {
        return next(err);
    }
});

module.exports = router;