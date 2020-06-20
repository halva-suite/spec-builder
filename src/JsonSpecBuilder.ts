import { SpecSchema, Convert } from "./SpecSchema";

export class JsonSpecBuilder {

    SpecSchema: SpecSchema;
    constructor(jsonScehma: SpecSchema) {
        this.SpecSchema = jsonScehma;
    }

    AddGrandpaAuthorities(value: Array<number | string>) {
        this.SpecSchema.genesis.runtime.grandpa.authorities.push(value);
    }

    AddAuraAuthorities(value: string) {
        this.SpecSchema.genesis.runtime.aura.authorities.push(value);
    }

    AddBalanceArray(balance: Array<number | string>) {
        this.SpecSchema.genesis.runtime.balances.balances.push(balance);
    }

    AddBalance(key: string, value: number) {
        this.SpecSchema.genesis.runtime.balances.balances.push([key, value]);
    }

    get GetChainSpec() {
        return this.SpecSchema;
    }
    get GetChainData() {
        return Convert.specSchemaToJson(this.SpecSchema);
    }
}