import Keyring from '@polkadot/keyring';
import { cryptoWaitReady, mnemonicValidate } from '@polkadot/util-crypto';
import { u8aToHex } from '@polkadot/util'
import { loadFromJSON, loadFromFile } from '.';
import { JsonSpecBuilder } from './JsonSpecBuilder';
export class SpecBuilder {

    async CreateAccountsFromJSON(count: number, mnemo: string, balance: number, json: string) {
        var keyringAura = await this.CreateKeysAura(count, mnemo);
        var keyringGrandpa = await this.CreateKeysGranpa(count, mnemo);
        var jsonSpec = loadFromJSON(json);
        const pairsAura = keyringAura.getPairs();
        const pairsGranndpa = keyringGrandpa.getPairs();
        for (let i = 0; i < pairsAura.length; i++) {
            jsonSpec.AddBalance(pairsAura[i].publicKey.toString(), balance);
            jsonSpec.AddAuraAuthorities(pairsAura[i].publicKey.toString());
            jsonSpec.AddGrandpaAuthorities([pairsGranndpa[i].publicKey.toString(), 1]);
        }
    }

    async CreateAccounts(count: number, mnemo: string, balance: number, path: string) {
        var keyringAura = await this.CreateKeysAura(count, mnemo);
        var keyringGrandpa = await this.CreateKeysGranpa(count, mnemo);
        var jsonSpec = loadFromFile(path);
        const pairsAura = keyringAura.getPairs();
        const pairsGranndpa = keyringGrandpa.getPairs();
        for (let i = 0; i < pairsAura.length; i++) {
            jsonSpec.AddBalance(pairsAura[i].publicKey.toString(), balance);
            jsonSpec.AddAuraAuthorities(pairsAura[i].publicKey.toString());
            jsonSpec.AddGrandpaAuthorities([pairsGranndpa[i].publicKey.toString(), 1]);
        }
    }

    async CreateKeysAura(count: number, mnemo: string): Promise<Keyring> {
        await cryptoWaitReady();
        if (!mnemonicValidate(mnemo))
            throw new Error("Mnemonic phrase not valid")

        const keyring = new Keyring({ type: 'sr25519' });
        // const mnemo = 'clip organ olive upper oak void inject side suit toilet stick narrow';
        for (let i = 0; i < 10; i++) {
            keyring.addPair(keyring.createFromUri(`${mnemo}//0/${i}`));
        }
        const pairs = keyring.getPairs();
        for (let i = 0; i < pairs.length; i++) {
            console.log(`${u8aToHex(pairs[i].publicKey)} ------ ${pairs[i].address}`)
        }
        return keyring;
    }

    async CreateKeysGranpa(count: number, mnemo: string): Promise<Keyring> {
        await cryptoWaitReady();
        if (!mnemonicValidate(mnemo))
            throw new Error("Mnemonic phrase not valid")

        const keyring = new Keyring({ type: 'ed25519' });
        // const mnemo = 'clip organ olive upper oak void inject side suit toilet stick narrow';
        for (let i = 0; i < 10; i++) {
            keyring.addPair(keyring.createFromUri(`${mnemo}//0/${i}`));
        }
        const pairs = keyring.getPairs();
        for (let i = 0; i < pairs.length; i++) {
            console.log(`${u8aToHex(pairs[i].publicKey)} ------ ${pairs[i].address}`)
        }
        return keyring;
    }
}
