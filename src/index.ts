import { readFileSync, writeFileSync } from 'fs';
import { JsonSpecBuilder } from './JsonSpecBuilder';

export * from './SpecBuilder';

export const loadFromJSON = (json: string): JsonSpecBuilder => {
  return new JsonSpecBuilder(json);
};

export const loadFromFile = (path: string): JsonSpecBuilder => {
  return new JsonSpecBuilder(readFileSync(path, 'utf8'));
};

export const loadFromEncodingFile = (path: string, encoding: BufferEncoding): JsonSpecBuilder => {
  return new JsonSpecBuilder(readFileSync(path, encoding));
};

export const writeToFile = (path: string, data: string) => {
  writeFileSync(path, data, 'utf8');
};

export const writeTonEcodingFile = (path: string, data: string, encoding: BufferEncoding) => {
  writeFileSync(path, data, encoding);
};
