const express = require('express');
let axios = require('axios');
let morgan = require('morgan');
const  app = express();

app.use(morgan('dev'));
app.use(express.json());

developers = { "developers": ["joelburton", "elie"]}

app.use(express.urlencoded({ extended: true }));

app.post('/', async function(req, res, next) {
  try {
    let results = req.body.developers;
    let resp = await Promise.all(results.map(async d => {
    const result = await axios.get(`https://api.github.com/users/${d}`);
    console.log(result);
    return result;
    }));
    let out = resp.map(r => ({ name: r.data.name, bio: r.data.bio }));

    return res.send(JSON.stringify(out));
  } catch {
    next(err);
  }
});

app.listen(3000, function(err){
  if (err) console.log(err);
  console.log("Server listening on PORT 3000", 3000);
});
