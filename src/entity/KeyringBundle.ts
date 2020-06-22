import Keyring from '@polkadot/keyring';

export default class KeyringBundle {
  constructor(aura: Keyring, grandpa: Keyring) {
    this.Aura = aura;
    this.Grandpa = grandpa;
  }

  public Aura: Keyring;

  public Grandpa: Keyring;
}
