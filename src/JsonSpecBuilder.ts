import { SpecSchema, Convert } from './SpecSchema';

export class JsonSpecBuilder {
  SpecSchema: SpecSchema;
  constructor(json: string) {
    this.SpecSchema = Convert.toSpecSchema(json);
  }

  public addGrandpaAuthorities(value: Array<number | string>) {
    this.SpecSchema.genesis.runtime.grandpa.authorities.push(value);
  }

  public AddAuraAuthorities(value: string) {
    this.SpecSchema.genesis.runtime.aura.authorities.push(value);
  }

  public addBalanceArray(balance: Array<number | string>) {
    this.SpecSchema.genesis.runtime.balances.balances.push(balance);
  }

  public addBalance(key: string, value: number) {
    this.SpecSchema.genesis.runtime.balances.balances.push([key, value]);
  }

  public get GetChainSpec() {
    return this.SpecSchema;
  }
  public get GetChainData() {
    return Convert.specSchemaToJson(this.SpecSchema);
  }
}
