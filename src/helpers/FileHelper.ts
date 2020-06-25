import { readFileSync, writeFileSync } from 'fs';

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const loadFromFile = (path: string): any => {
  return JSON.parse(readFileSync(path, 'utf8'));
};

export const writeToFile = (path: string, data: string): void => {
  writeFileSync(path, data, 'utf8');
};
