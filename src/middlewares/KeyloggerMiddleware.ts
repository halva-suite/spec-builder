/* eslint-disable @typescript-eslint/no-explicit-any */
import HalvaMiddlewareContext from '../HalvaSpecModifier';
import { u8aToHex } from '@polkadot/util';

export const keyloggerMiddleware = (context: HalvaMiddlewareContext): any => {
  const ed25519pairs = context.ed25519Keys.getPairs();
  const sr25519pairs = context.sr25519Keys.getPairs();
  console.log('\n ed25519 pairs  (public | address):');
  for (let i = 0; i < ed25519pairs.length; i++) {
    console.log(`${u8aToHex(ed25519pairs[i].publicKey)} ------ ${ed25519pairs[i].address}`);
  }
  console.log('\n sr25519 pairs  (public | address):');
  for (let i = 0; i < sr25519pairs.length; i++) {
    console.log(`${u8aToHex(sr25519pairs[i].publicKey)} ------ ${sr25519pairs[i].address}`);
  }
  return context.jsonSchema;
};
