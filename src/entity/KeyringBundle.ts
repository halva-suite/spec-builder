import Keyring from '@polkadot/keyring';

export default interface KeyringBundle {
  Aura: Keyring;
  Grandpa: Keyring;
}
