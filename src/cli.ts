#!/usr/bin/env node
import yargs from 'yargs';
import { HalvaSpecModifier } from './HalvaSpecModifier';
import { auraMiddleware } from './middlewares/AuraMiddleware';
import { grandpaMiddleware } from './middlewares/GrandpaMiddleware';
import { balanceMiddleware } from './middlewares/BalanceMiddleware';
import { keyloggerMiddleware } from './middlewares/KeyloggerMiddleware';

let a = 10;
let specPath = '';
let balance = '1152921504606847000';
let mnemonic: string;

const options = yargs
  .usage('Usage: $0 [options]')
  .option('a', { alias: 'count', describe: `Count (default: ${a})`, type: 'number' })
  .option('i', { alias: 'path', describe: 'Path to spec.json', type: 'string', demandOption: true })
  .option('m', { alias: 'mnemonic', describe: 'Mnemonic phrase (default: auto-gen)', type: 'string' })
  .option('am', { alias: 'auraMiddleware', describe: 'Add aura Authorities', type: 'boolean' })
  .option('bm', { alias: 'balanceMiddleware', describe: 'Add balance Authorities', type: 'boolean' })
  .option('gm', { alias: 'grandpaMiddleware', describe: 'Add grandpa Authorities', type: 'boolean' })
  .option('b', { alias: 'balance', describe: `Balance (default: ${balance})`, type: 'string' }).argv;

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
}

async function start(): Promise<void> {
  let builder = HalvaSpecModifier.init(specPath, balance, a);
  if (mnemonic) builder = builder.setMnemonic(mnemonic);
  if (options.am) builder = builder.apply(auraMiddleware);
  if (options.gm) builder = builder.apply(grandpaMiddleware);
  if (options.bm) builder = builder.apply(balanceMiddleware);
  builder = builder.apply(keyloggerMiddleware);
  (await builder.run()).output(specPath);
}

start();
