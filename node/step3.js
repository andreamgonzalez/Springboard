const fs = require('fs');
const process = require('process');
const axios = require('axios');

function handleOutput(text, out){ //now accepts two args
    if(out) {
        fs.writeFile(out, text, 'utf-8', function(err) {
            if(err) {
                console.error(`Could not write out ${out}: ${err}`);
                process.exit(1);
            }
        });
    } else {
        console.log(text);
    }
}

function cat(path, out){ //now accepts two args
    fs.readFile(path, 'utf-8', function(err, data){
        if(err){
            console.log(err);
            process.exit(1);
        } else {
            // console.log('DATA:', data);
            // process.exit(0);
            handleOutput(data, out)
        }
    })
}

async function webCat(url, out){
    try {
        let resp = await axios.get(url);
        handleOutput(resp.data, out);
    }
    catch (err) {
        console.error(`Error Fetching ${url}: ${err}`);
        process.exit(1);
    }
}

let path;
let out;

if (process.argv[2] === '--out') { //if command line argument is "--out" do the following else print the xontents using argv[2]
    out = process.argv[3];
    path = process.argv[4];
} else {
    path = process.argv[2];
}

if (path.slice(0,4) == 'http') { //checks that index 0 through four equal http
    webCat(path, out);
} else {
    cat(path, out);
}