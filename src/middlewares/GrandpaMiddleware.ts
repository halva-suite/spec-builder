/* eslint-disable @typescript-eslint/no-explicit-any */
import HalvaMiddlewareContext from '../HalvaSpecModifier';

export const grandpaMiddleware = (context: HalvaMiddlewareContext): any => {
  if (!context.jsonSchema.genesis?.runtime?.grandpa?.authorities) throw new Error('Invalid JSON');
  const pairsGrandpa = context.ed25519Keys.getPairs();
  for (let i = 0; i < pairsGrandpa.length; i++) {
    context.jsonSchema.genesis.runtime.grandpa.authorities.push([pairsGrandpa[i].address, 1]);
  }
  return context.jsonSchema;
};
