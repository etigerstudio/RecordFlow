#! /usr/bin/env node

const parser = require('./parser/rf_parser');
const version = require('./common/constant').version;
const fs = require('fs');
const warehouse = require('./warehouse/warehouse');
const config = require('./common/config');
const readline = require('readline');


if (process.argv.length >= 3) {
    parseFile();
} else {
    repl();
}


function parseFile() {
    initWareHouse();

    let content = fs.readFileSync(process.argv[2], "utf8");
    parser.parse(content);

    deinitWareHouse();
}

function repl() {
    console.log(`<- recordflow ${version} ->\n`);
    initWareHouse();

    const rl = readline.createInterface({
        input: process.stdin,
        output: process.stdout
    });
    rl.setPrompt(': ');
    rl.prompt();

    rl.on('line', (input) => {
        parser.parse(input);
        rl.prompt();
    });

    rl.on('pause', () => {
        process.stdout.write('\n');
        deinitWareHouse();
    });
}

function initWareHouse() {
    config.interactive = false;
    warehouse.load();
    config.interactive = true;
}

function deinitWareHouse() {
    config.interactive = false;
    warehouse.save();
    config.interactive = true;
}