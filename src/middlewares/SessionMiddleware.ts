/* eslint-disable @typescript-eslint/no-explicit-any */
import HalvaMiddlewareContext from '../HalvaSpecModifier';

export const SessionMiddleware = (context: HalvaMiddlewareContext): any => {
    if (!context.jsonSchema.genesis?.runtime?.palletSession?.keys) throw new Error('Invalid JSON');
    const pairsEd = context.ed25519Keys.getPairs();
    const pairsSr = context.sr25519Keys.getPairs();
    let key = [];
    for (let i = 0; i < pairsEd.length; i++) {
        key.push([
            pairsSr[i].address,
            pairsSr[i].address,
            {
                grandpa: pairsEd[i].address,
                babe: pairsSr[i].address,
                im_online: pairsSr[i].address,
                parachain_validator: pairsSr[i].address,
                authority_discovery: pairsSr[i].address,
            },
        ]);
    }
    for (let i = 0; i < key.length; i++) {
        context.jsonSchema.genesis?.runtime?.palletSession?.keys.push(key[i]);
    }
    return context.jsonSchema;
};
