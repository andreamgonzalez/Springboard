const fs = require('fs');
const process = require('process');
const axios = require('axios');
const readline = require('readline');
const app = require('express')();

function cat(file){
    let input = fs.createReadStream(file);
    try {
        let rl = readline.createInterface({
            input: input,
            terminal: false
        });
    
        rl.on('line', function(line){
            let getUrlType = new URL(line);
            let fileName = getUrlType.hostname;
            console.log(`Wrote to ${fileName}`);
            fetches(line, fileName);
        })
    } catch {
        console.log('error!!!');
        process.exit(1);
    }
}

async function fetches(url, fileName) {
    try {
        let resp = await axios.get(url);
        let data = JSON.stringify(resp.data);
        writes(fileName, data);
    }
    catch (err) {
        console.error(`Couldn't download' ${url}: ${err}`);
        // process.exit(1);
    }
}

function writes(fileName, data){
    try {
        fs.writeFile(fileName, data, 'utf-8', function(err) {
            console.log(`Wrote to ${fileName}`);
        });
    } catch {
        console.log("Error!!!");
        process.exit(1);
    }
}

cat('urls.txt');

app.listen(3000, () => {
    console.log(`Line by line app listening on port ${3000}`)
  })