/* Routes for shopping cart. */
const express = require('express');
const app = express();
const routes = require("./routes/items");
const ExpressError = require("./expressError");
const middleware = require('./middleware/middleware');

app.use(express.json()); //need this in order to get info into req.body

// this applies to all requests at all paths
app.use(middleware.logger);
// end middleware.logger

//  apply a prefix to every route in userRoutes
app.use("/items", routes);
// end userRoutes

// route handler with middleware
// app.get("/vegan/:item", middleware.eggsNotAllowed, function (req, res, next) {
//     return res.send(req.params.item + "is allowed on the shopping list");
// });

// 404 handler
app.use( function (req, res, next) {
    return new ExpressError("Not Found", 404);
});

// generic error handler
app.use(function(err, req, res, next) {
    let status = err.status || 500;

    return res.status(status).json({
        error:{
            msg: err.message, 
            status: status
        }
    });
});


app.listen(3000, function () {
    console.log('App on port 3000');
  })
  // end app.listen