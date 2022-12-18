const express = require('express');
const app = express();
const ExpressError = require('./expressError');

const {stringToNums, calculateMode, calculateMean, calculateMedian } = require('./helpers.js');

app.get('/mean', (req, res, next) => { //next is here for error handling
    
    // return req.query.nums.split(',');
    
    if (!req.query.nums) {
        throw new ExpressError('You must pass a query key of nums with a comma-separated list of numbers.', 400)
      }
    let numsArr = req.query.nums.split(','); //separates array items input into query string [1,2,3,...]

    let nums = stringToNums(numsArr);

    if( nums instanceof Error){
        throw new ExpressError(nums.message);
    }

    let result = {operation: 'mean', result: calculateMean(nums)}

    return res.send(result);
});


app.get('/median', (req, res, next) => {
    if (!req.query.nums) {
        throw new ExpressError('You must pass a query key of nums with a comma-separated list of numbers.', 400)
      }
    let numsArr = req.query.nums.split(','); //separates array items input into query string [1,2,3,...]
    nums = stringToNums(numsArr);

    let nums = stringToNums(numsArr);

    if( nums instanceof Error){
        throw new ExpressError(nums.message);
    }

    let result = {operation: 'median', result: calculateMedian(nums)}

    return res.send(result);
});

app.get('/mode', (req, res, next) => {
    if (!req.query.nums) {
        throw new ExpressError('You must pass a query key of nums with a comma-separated list of numbers.', 400)
      }
    let numsArr = req.query.nums.split(','); //separates array items input into query string [1,2,3,...]
    nums = stringToNums(numsArr);

    let nums = stringToNums(numsArr);

    if( nums instanceof Error){
        throw new ExpressError(nums.message);
    }

    let result = {operation: 'median', result: calculateMode(nums)}

    return res.send(result);
});

//Error Handlers -----

app.use( function(req, res, next) {
    const err = new ExpressError("Not Found", 404);
    return next(err);
})


app.use(function (err, req, res, next) {
    res.status(err.status || 500);
  
    return res.json({
      error: err,
      message: err.message
    });
  });



app.listen(3000, () => {
    console.log('Port 3000');
})
