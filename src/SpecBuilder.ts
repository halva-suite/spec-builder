import Keyring from '@polkadot/keyring';
import { cryptoWaitReady, mnemonicValidate, mnemonicGenerate } from '@polkadot/util-crypto';
import { u8aToHex } from '@polkadot/util'
import { loadFromJSON, loadFromFile, writeToFile } from '.';
export class SpecBuilder {

    static async CreateAccountsFromJSON(count: number, balance: number, json: string, mnemo?: string,) {
        if (!mnemo)
            mnemo = mnemonicGenerate();
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

    static async CreateAccounts(count: number, balance: number, path: string, mnemo?: string,) {
        if (!mnemo)
            mnemo = mnemonicGenerate();
        var keyringAura = await this.CreateKeysAura(count, mnemo);
        var keyringGrandpa = await this.CreateKeysGranpa(count, mnemo);
        var jsonSpec = loadFromFile(path);
        const pairsAura = keyringAura.getPairs();
        const pairsGranndpa = keyringGrandpa.getPairs();
        for (let i = 0; i < pairsAura.length; i++) {
            jsonSpec.AddBalance(pairsAura[i].address, balance);
            jsonSpec.AddAuraAuthorities(pairsAura[i].address);
            jsonSpec.AddGrandpaAuthorities([pairsGranndpa[i].address, 1]);
        }
        writeToFile(path, jsonSpec.GetChainData);
    }

    static async CreateKeysAura(count: number, mnemo: string): Promise<Keyring> {
        await cryptoWaitReady();
        if (!mnemonicValidate(mnemo))
            throw new Error("Mnemonic phrase not valid")

        const keyring = new Keyring({ type: 'sr25519' });
        for (let i = 0; i < count; i++) {
            keyring.addPair(keyring.createFromUri(`${mnemo}//0/${i}`));
        }
        const pairs = keyring.getPairs();
        console.log('\n Aura keys  (public | adress):');
        for (let i = 0; i < pairs.length; i++) {
            console.log(`${u8aToHex(pairs[i].publicKey)} ------ ${pairs[i].address}`)
        }
        return keyring;
    }

    static async CreateKeysGranpa(count: number, mnemo: string): Promise<Keyring> {
        await cryptoWaitReady();
        if (!mnemonicValidate(mnemo))
            throw new Error("Mnemonic phrase not valid")

        const keyring = new Keyring({ type: 'ed25519' });
        for (let i = 0; i < count; i++) {
            keyring.addPair(keyring.createFromUri(`${mnemo}//${i}`));
        }
        const pairs = keyring.getPairs();
        console.log('\n Grandpa keys (public | adress):');
        for (let i = 0; i < pairs.length; i++) {
            console.log(`${u8aToHex(pairs[i].publicKey)} ------ ${pairs[i].address}`)
        }
        return keyring;
    }
}
