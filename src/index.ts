import { readFileSync, writeFileSync } from 'fs';
import { JsonSpecBuilder } from './JsonSpecBuilder';

export * from './SpecBuilder';
export * from './HalvaSpecModifier';
export * from './entity/KeyringBundle';
export * from './middlewares/BalanceMiddleware';
export * from './middlewares/auraMiddleware';
export * from './middlewares/GrandpaMiddleware';

export const loadFromJSON = (json: string): JsonSpecBuilder => {
  return new JsonSpecBuilder(json);
};

export const loadFromFile = (path: string): JsonSpecBuilder => {
  return new JsonSpecBuilder(readFileSync(path, 'utf8'));
};

export const loadFromEncodingFile = (path: string, encoding: BufferEncoding): JsonSpecBuilder => {
  return new JsonSpecBuilder(readFileSync(path, encoding));
};

export const writeToFile = (path: string, data: string): void => {
  writeFileSync(path, data, 'utf8');
};

export const writeTonEncodingFile = (path: string, data: string, encoding: BufferEncoding): void => {
  writeFileSync(path, data, encoding);
};
