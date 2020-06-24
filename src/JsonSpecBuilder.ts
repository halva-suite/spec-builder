/* eslint-disable @typescript-eslint/no-explicit-any */
export class JsonSpecBuilder {
  SpecSchema: any;
  constructor(json: string) {
    this.SpecSchema = JSON.parse(json);
  }

  public addGrandpaAuthorities(value: Array<number | string>): void {
    this.SpecSchema.genesis.runtime.grandpa.authorities.push(value);
  }

  public addAuraAuthorities(value: string): void {
    this.SpecSchema.genesis.runtime.aura.authorities.push(value);
  }

  public addBalanceArray(balance: Array<number | string>): void {
    this.SpecSchema.genesis.runtime.balances.balances.push(balance);
  }

  public addBalance(key: string, value: number): void {
    this.SpecSchema.genesis.runtime.balances.balances.push([key, value]);
  }

  public get GetChainSpec(): any {
    return this.SpecSchema;
  }
  public get GetChainData(): string {
    return JSON.parse(this.SpecSchema);
  }
}
