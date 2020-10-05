/* eslint-disable @typescript-eslint/no-explicit-any */
import HalvaMiddlewareContext from '../HalvaSpecModifier';

export const balanceMiddleware = (context: HalvaMiddlewareContext): any => {
  if (!context.jsonSchema.genesis?.runtime?.palletBalances?.balances) throw new Error('Invalid JSON');
  const keys = [...context.sr25519Keys.getPairs(), ...context.ed25519Keys.getPairs()];
  const { balances } = context.jsonSchema.genesis.runtime.palletBalances;

  context.jsonSchema.genesis.runtime.palletBalances.balances = [
    ...balances,
    ...keys.map((pair) => ([
      pair.address,
      parseInt(context.balance, 10),
    ]),
  )];

  return context.jsonSchema;
};
