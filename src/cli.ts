#!/usr/bin/env node
import { SpecBuilder } from './index';

const yargs = require("yargs");

let a = 10;
let specPath = '';
let balance = 1000000;
let mnemonic = ''

const options = yargs
    .usage("Usage: $0 [options]")
    .option("a", { alias: "count", describe: `Count (default: ${a})`, type: "number" })
    .option("i", { alias: "path", describe: "Path to spec.json", type: "string", demandOption: true })
    .option("m", { alias: "mnemonic", describe: "Mnemonic phrase (default: auto-gen)", type: "string" })
    .option("b", { alias: "balance", describe: `Balance (default: ${balance})`, type: "number" })
    .argv;

if (!options.i) {
    throw new Error('Path is empty');
}
else {
    specPath = options.i;
}
if (options.a) {
    a = options.a;
}
if (options.b) {
    balance = options.b;
}
if (options.m) {
    mnemonic = options.m;
    SpecBuilder.CreateAccounts(a, balance, specPath, mnemonic);
}
else {
    SpecBuilder.CreateAccounts(a, balance, specPath);
}



