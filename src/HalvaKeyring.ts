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
    return keyring;
  }

  static async CreateGrandpaKeys(count: number, mnemo: string): Promise<Keyring> {
    await cryptoWaitReady();
    if (!mnemonicValidate(mnemo)) throw new Error('Mnemonic phrase not valid');

    const keyring = new Keyring({ type: 'ed25519' });
    for (let i = 0; i < count; i++) {
      keyring.addPair(keyring.createFromUri(`${mnemo}//${i}`));
    }
    return keyring;
  }
}
