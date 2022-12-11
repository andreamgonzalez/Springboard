/** Command-line tool to generate Markov text. */

const fs = require('fs');
const markov = require('./markov');
const axios = require('axios');
const process = require('process');

function generateText(text) {
    let mm = new markov.MarkovMachine(text); //call upon a new class instance of Markov Machine and pass it some text
    console.log(mm.makeText());
}

function makeText(path) {
    fs.readFile(path, "utf-8", function(err, data){
        if (err) {
            console.error(`Cannot read file: ${path}: ${err}`);
            process.exit(1); //positive number indicating a failure
        } else {
            console.log(data);
        }
    })
}

async function makeUrlText(url) {
    let resp;

    try{
        resp = await axios.get(url);
    } catch (err) {
        console.error(`Can't read URL: ${url}: ${err}`);
        process.exit(1);
    }

    generateText(resp.data); //call function above to use the gather data from url into mm chains
}


let [method, path] = process.argv.slice(2);

if (method === 'file') {
    makeText(path);
} else if (method === 'url') {
    makeUrlText(path);
} else {
    console.error(`Invalid method used: ${method}. Method must be file or url`);
}