const fs = require('fs');
const process = require('process');
const axios = require('axios');

function cat(path){
    fs.readFile(path, 'utf-8', function(err, data){
        if(err){
            console.log(err);
            process.exit(1);
        } else {
            console.log('DATA:', data);
            process.exit(0);
        }
    })
}

async function webCat(url){
    try {
        let resp = await axios.get(url);
        console.log(resp);
    }
    catch (error) {
        console.log(error);
    }
}

// cat(process.argv[2]);

let path = process.argv[2];

if (path.slice(0,4) == 'http') { //checks that index 0 through four equal http
    webCat(path);
} else {
    cat(path);
}