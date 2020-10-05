import Keyring from '@polkadot/keyring';
import { cryptoWaitReady, mnemonicValidate } from '@polkadot/util-crypto';
export class HalvaKeyring {
  static async GenerateKeys(count: number, mnemo: string, type: 'sr25519' | 'ed25519'): Promise<Keyring> {
    await cryptoWaitReady();
    if (!mnemonicValidate(mnemo)) throw new Error('Mnemonic phrase not valid');

    const keyring = new Keyring({ type });

    for (let i = 0; i < count; i++) {
      keyring.addPair(keyring.createFromUri(`${mnemo}//${i}`));
    }

    return keyring;
  }
}
