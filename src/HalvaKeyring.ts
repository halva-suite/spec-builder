import Keyring from '@polkadot/keyring';
import { cryptoWaitReady, mnemonicValidate } from '@polkadot/util-crypto';
import { u8aToHex } from '@polkadot/util';
export class HalvaKeyring {
  static async CreateAuraKeys(count: number, mnemo: string): Promise<Keyring> {
    await cryptoWaitReady();
    if (!mnemonicValidate(mnemo)) throw new Error('Mnemonic phrase not valid');

    const keyring = new Keyring({ type: 'sr25519' });
    for (let i = 0; i < count; i++) {
      keyring.addPair(keyring.createFromUri(`${mnemo}//0/${i}`));
    }
    const pairs = keyring.getPairs();
    console.log('\n Aura keys  (public | address):');
    for (let i = 0; i < pairs.length; i++) {
      console.log(`${u8aToHex(pairs[i].publicKey)} ------ ${pairs[i].address}`);
    }
    return keyring;
  }

  static async CreateGrandpaKeys(count: number, mnemo: string): Promise<Keyring> {
    await cryptoWaitReady();
    if (!mnemonicValidate(mnemo)) throw new Error('Mnemonic phrase not valid');

    const keyring = new Keyring({ type: 'ed25519' });
    for (let i = 0; i < count; i++) {
      keyring.addPair(keyring.createFromUri(`${mnemo}//${i}`));
    }
    const pairs = keyring.getPairs();
    console.log('\n Grandpa keys (public | address):');
    for (let i = 0; i < pairs.length; i++) {
      console.log(`${u8aToHex(pairs[i].publicKey)} ------ ${pairs[i].address}`);
    }
    return keyring;
  }
}
