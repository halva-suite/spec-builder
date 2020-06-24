/* eslint-disable @typescript-eslint/no-explicit-any */
import HalvaMiddlewareContext from '../HalvaSpecModifier';

export const auraMiddleware = (context: HalvaMiddlewareContext): any => {
  if (!context.jsonSchema.genesis?.runtime?.aura?.authorities) throw new Error('Invalid JSON');
  const pairsAura = context.sr25519Keys.getPairs();
  for (let i = 0; i < pairsAura.length; i++) {
    context.jsonSchema.genesis.runtime.aura.authorities.push(pairsAura[i].address);
  }
  return context.jsonSchema;
};
