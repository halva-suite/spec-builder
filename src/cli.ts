#!/usr/bin/env node
import { SpecBuilder } from './index';

const { argv } = require('yargs')

let a = 10;
let specPath = '';
let balance = 1000000;
let mnemonic = ''

if (!argv.i) {
    throw new Error('Path is empty');
}
else {
    specPath = argv.i;
}
if (argv.a) {
    a = argv.a;
}
if (argv.b) {
    balance = argv.b;
}
if (argv.m) {
    mnemonic = argv.m;
}
else {
    SpecBuilder.CreateAccounts(a, balance, specPath);
}

SpecBuilder.CreateAccounts(a, balance, specPath, mnemonic);

//If there is no mnemonic phrase, it will be generated automatically

