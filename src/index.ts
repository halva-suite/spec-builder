import { Convert } from './SpecSchema';
import { readFileSync } from 'fs';
import { JsonSpecBuilder } from './JsonSpecBuilder';

export * from './SpecBuilder';

export const loadFromJSON = (json: string): JsonSpecBuilder => {
  return new JsonSpecBuilder(Convert.toSpecSchema(json));
}

export const loadFromFile = (path: string): JsonSpecBuilder => {
  return new JsonSpecBuilder(Convert.toSpecSchema(readFileSync(path, 'utf8')));
}

export const loadFromEncodingFile = (path: string, encoding: BufferEncoding): JsonSpecBuilder => {
  return new JsonSpecBuilder(Convert.toSpecSchema(readFileSync(path, encoding)));
}



