import { HalvaKeyring } from '.';
import Keyring from '@polkadot/keyring';
import { mnemonicGenerate } from '@polkadot/util-crypto';
import { readFileSync } from 'fs';
import { writeToFile } from './helpers/FileHelper';

/* eslint-disable @typescript-eslint/no-explicit-any */
type Middleware<T> = (context: HalvaMiddlewareContext) => any;

export default interface HalvaMiddlewareContext {
  jsonSchema: any;
  ed25519Keys: Keyring;
  sr25519Keys: Keyring;
  customArgs: any;
  path: string;
  mnemonic: string;
  balance: string;
  count: number;
}

export class HalvaMiddlewareRunner {
  path: string;
  mnemonic: string;
  jsonSchema: any;
  balance: string;
  count: number;
  customArgs: any;
  ed25519Keys: Keyring;
  sr25519Keys: Keyring;
  middlewares: Middleware<HalvaMiddlewareContext>[];
  constructor(path: string, balance: string, count: number, customArgs?: any) {
    this.balance = balance;
    this.count = count;
    this.path = path;
    this.middlewares = [];
    if (customArgs) this.customArgs = customArgs;
  }

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  apply(...middleware: Middleware<HalvaMiddlewareContext>[]): HalvaMiddlewareRunner {
    this.middlewares.push(...middleware);
    return this;
  }

  async run(json?: string): Promise<HalvaMiddlewareRunner> {
    if (!json) json = readFileSync(this.path, 'utf8');
    if (!this.mnemonic) this.mnemonic = mnemonicGenerate();
    this.ed25519Keys = await HalvaKeyring.GenerateKeys(this.count, this.mnemonic, 'ed25519');
    this.sr25519Keys = await HalvaKeyring.GenerateKeys(this.count, this.mnemonic, 'sr25519');
    this.jsonSchema = JSON.parse(json);
    if (!this.middlewares.length) throw new Error('Middlewares is null');
    for (const m of this.middlewares) {
      this.jsonSchema = m({
        jsonSchema: this.jsonSchema,
        sr25519Keys: this.sr25519Keys,
        ed25519Keys: this.ed25519Keys,
        path: this.path,
        mnemonic: this.mnemonic,
        balance: this.balance,
        count: this.count,
        customArgs: this.customArgs,
      });
    }
    return this;
  }

  setMnemonic(mnemonic: string): HalvaMiddlewareRunner {
    this.mnemonic = mnemonic;
    return this;
  }

  output(path: string): void {
    writeToFile(path, JSON.stringify(this.jsonSchema, null, 2));
  }
}

export class HalvaSpecModifier {
  static init(path: string, balance: string, count: number): HalvaMiddlewareRunner {
    return new HalvaMiddlewareRunner(path, balance, count);
  }
}
