import Keyring from '@polkadot/keyring';
import { cryptoWaitReady, mnemonicValidate, mnemonicGenerate } from '@polkadot/util-crypto';
import { u8aToHex } from '@polkadot/util'
import { loadFromJSON, loadFromFile } from '.';
export class SpecBuilder {

    static async CreateAccountsFromJSON(count: number, balance: number, json: string, mnemo?: string, ) {
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

    static async CreateAccounts(count: number, balance: number, path: string, mnemo?: string, ) {
        if (!mnemo)
            mnemo = mnemonicGenerate();
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

    static async CreateKeysAura(count: number, mnemo: string): Promise<Keyring> {
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

    static async CreateKeysGranpa(count: number, mnemo: string): Promise<Keyring> {
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
