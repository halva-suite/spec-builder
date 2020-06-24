#!/usr/bin/env node
import yargs from 'yargs';
import { SpecBuilder } from './index';

let a = 10;
let specPath = '';
let balance = 1000000;
let mnemonic = '';

const options = yargs
  .usage('Usage: $0 [options]')
  .option('a', { alias: 'count', describe: `Count (default: ${a})`, type: 'number' })
  .option('i', { alias: 'path', describe: 'Path to spec.json', type: 'string', demandOption: true })
  .option('m', { alias: 'mnemonic', describe: 'Mnemonic phrase (default: auto-gen)', type: 'string' })
  .option('am', { alias: 'auraMiddleware', describe: 'Add aura Authorities', type: 'boolean' })
  .option('bm', { alias: 'balanceMiddleware', describe: 'Add balance Authorities', type: 'boolean' })
  .option('gm', { alias: 'grandpaMiddleware', describe: 'Add grandpa Authorities', type: 'boolean' })
  .option('b', { alias: 'balance', describe: `Balance (default: ${balance})`, type: 'number' }).argv;

if (!options.i) {
  throw new Error('Path is empty');
} else {
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
  if (!options.am && !options.bm && !options.gm)
    SpecBuilder.CreateAccounts(a, balance, specPath, true, true, true, mnemonic);
  else SpecBuilder.CreateAccounts(a, balance, specPath, options.am, options.bm, options.gm, mnemonic);
} else {
  if (!options.am && !options.bm && !options.gm) SpecBuilder.CreateAccounts(a, balance, specPath, true, true, true);
  else SpecBuilder.CreateAccounts(a, balance, specPath, options.am, options.bm, options.gm);
}
