/* eslint-disable @typescript-eslint/no-explicit-any */
import HalvaMiddlewareContext from '../HalvaSpecModifier';

export const balanceMiddleware = (context: HalvaMiddlewareContext): any => {
  if (!context.jsonSchema.genesis.runtime.balances.balances) throw new Error('Invalid JSON');
  const pairsAura = context.sr25519Keys.getPairs();
  for (let i = 0; i < pairsAura.length; i++) {
    context.jsonSchema.genesis.runtime.balances.balances.push([pairsAura[i].address, context.balance]);
  }
  return context.jsonSchema;
};
