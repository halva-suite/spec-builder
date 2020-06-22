/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/ban-ts-ignore */
/* eslint-disable no-empty */
/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-use-before-define */
/* eslint-disable no-prototype-builtins */
// To parse this data:
//
//   import { Convert, SpecSchema } from "./file";
//
//   const specSchema = Convert.toSpecSchema(json);
//
// These functions will throw an error if the JSON doesn't
// match the expected interface, even if the JSON is valid.

export interface SpecSchema {
  name?: string;
  id?: string;
  chainType?: string;
  bootNodes?: any[];
  telemetryEndpoints?: null;
  protocolId?: null;
  properties?: null;
  consensusEngine?: null;
  genesis?: Genesis;
}

export interface Genesis {
  runtime?: Runtime;
}

export interface Runtime {
  system?: System;
  aura?: Aura;
  grandpa?: Grandpa;
  balances?: Balances;
  sudo?: Sudo;
}

export interface Aura {
  authorities?: string[];
}

export interface Balances {
  balances?: Array<Array<number | string>>;
}

export interface Grandpa {
  authorities?: Array<Array<number | string>>;
}

export interface Sudo {
  key?: string;
}

export interface System {
  changesTrieConfig?: null;
  code?: string;
}

// Converts JSON strings to/from your types
// and asserts the results of JSON.parse at runtime
export class Convert {
  public static toSpecSchema(json: string): SpecSchema {
    return cast(JSON.parse(json), r('SpecSchema'));
  }

  public static specSchemaToJson(value: SpecSchema): string {
    return JSON.stringify(uncast(value, r('SpecSchema')), null, 2);
  }
}

function invalidValue(typ: any, val: any): never {
  throw Error(`Invalid value ${JSON.stringify(val)} for type ${JSON.stringify(typ)}`);
}

function jsonToJSProps(typ: any): any {
  if (typ.jsonToJS === undefined) {
    const map: any = {};
    typ.props.forEach((p: any) => (map[p.json] = { key: p.js, typ: p.typ }));
    typ.jsonToJS = map;
  }
  return typ.jsonToJS;
}

function jsToJSONProps(typ: any): any {
  if (typ.jsToJSON === undefined) {
    const map: any = {};
    typ.props.forEach((p: any) => (map[p.js] = { key: p.json, typ: p.typ }));
    typ.jsToJSON = map;
  }
  return typ.jsToJSON;
}

function transform(val: any, typ: any, getProps: any): any {
  function transformPrimitive(typ: string, val: any): any {
    if (typeof typ === typeof val) return val;
    return invalidValue(typ, val);
  }

  function transformUnion(typs: any[], val: any): any {
    // val must validate against one typ in typs
    const l = typs.length;
    for (let i = 0; i < l; i++) {
      const typ = typs[i];
      try {
        return transform(val, typ, getProps);
      } catch (_) {}
    }
    return invalidValue(typs, val);
  }

  function transformEnum(cases: string[], val: any): any {
    if (cases.indexOf(val) !== -1) return val;
    return invalidValue(cases, val);
  }

  function transformArray(typ: any, val: any): any {
    // val must be an array with no invalid elements
    if (!Array.isArray(val)) return invalidValue('array', val);
    return val.map((el) => transform(el, typ, getProps));
  }

  function transformDate(val: any): any {
    if (val === null) {
      return null;
    }
    const d = new Date(val);
    if (isNaN(d.valueOf())) {
      return invalidValue('Date', val);
    }
    return d;
  }

  function transformObject(props: { [k: string]: any }, additional: any, val: any): any {
    if (val === null || typeof val !== 'object' || Array.isArray(val)) {
      return invalidValue('object', val);
    }
    const result: any = {};
    Object.getOwnPropertyNames(props).forEach((key) => {
      const prop = props[key];
      const v = Object.prototype.hasOwnProperty.call(val, key) ? val[key] : undefined;
      result[prop.key] = transform(v, prop.typ, getProps);
    });
    Object.getOwnPropertyNames(val).forEach((key) => {
      if (!Object.prototype.hasOwnProperty.call(props, key)) {
        result[key] = transform(val[key], additional, getProps);
      }
    });
    return result;
  }

  if (typ === 'any') return val;
  if (typ === null) {
    if (val === null) return val;
    return invalidValue(typ, val);
  }
  if (typ === false) return invalidValue(typ, val);
  while (typeof typ === 'object' && typ.ref !== undefined) {
    typ = typeMap[typ.ref];
  }
  if (Array.isArray(typ)) return transformEnum(typ, val);
  if (typeof typ === 'object') {
    return typ.hasOwnProperty('unionMembers')
      ? transformUnion(typ.unionMembers, val)
      : typ.hasOwnProperty('arrayItems')
      ? transformArray(typ.arrayItems, val)
      : typ.hasOwnProperty('props')
      ? transformObject(getProps(typ), typ.additional, val)
      : invalidValue(typ, val);
  }
  // Numbers can be parsed by Date but shouldn't be.
  if (typ === Date && typeof val !== 'number') return transformDate(val);
  return transformPrimitive(typ, val);
}

function cast<T>(val: any, typ: any): T {
  return transform(val, typ, jsonToJSProps);
}

function uncast<T>(val: T, typ: any): any {
  return transform(val, typ, jsToJSONProps);
}

function a(typ: any) {
  return { arrayItems: typ };
}

function u(...typs: any[]) {
  return { unionMembers: typs };
}

function o(props: any[], additional: any) {
  return { props, additional };
}
// @ts-ignore
function m(additional: any) {
  // @ts-ignore
  return { props: [], additional };
}

function r(name: string) {
  return { ref: name };
}

const typeMap: any = {
  SpecSchema: o(
    [
      { json: 'name', js: 'name', typ: u(undefined, '') },
      { json: 'id', js: 'id', typ: u(undefined, '') },
      { json: 'chainType', js: 'chainType', typ: u(undefined, '') },
      { json: 'bootNodes', js: 'bootNodes', typ: u(undefined, a('any')) },
      { json: 'telemetryEndpoints', js: 'telemetryEndpoints', typ: u(undefined, null) },
      { json: 'protocolId', js: 'protocolId', typ: u(undefined, null) },
      { json: 'properties', js: 'properties', typ: u(undefined, null) },
      { json: 'consensusEngine', js: 'consensusEngine', typ: u(undefined, null) },
      { json: 'genesis', js: 'genesis', typ: u(undefined, r('Genesis')) },
    ],
    false
  ),
  Genesis: o([{ json: 'runtime', js: 'runtime', typ: u(undefined, r('Runtime')) }], false),
  Runtime: o(
    [
      { json: 'system', js: 'system', typ: u(undefined, r('System')) },
      { json: 'aura', js: 'aura', typ: u(undefined, r('Aura')) },
      { json: 'grandpa', js: 'grandpa', typ: u(undefined, r('Grandpa')) },
      { json: 'balances', js: 'balances', typ: u(undefined, r('Balances')) },
      { json: 'sudo', js: 'sudo', typ: u(undefined, r('Sudo')) },
    ],
    false
  ),
  Aura: o([{ json: 'authorities', js: 'authorities', typ: u(undefined, a('')) }], false),
  Balances: o([{ json: 'balances', js: 'balances', typ: u(undefined, a(a(u(3.14, '')))) }], false),
  Grandpa: o([{ json: 'authorities', js: 'authorities', typ: u(undefined, a(a(u(0, '')))) }], false),
  Sudo: o([{ json: 'key', js: 'key', typ: u(undefined, '') }], false),
  System: o(
    [
      { json: 'changesTrieConfig', js: 'changesTrieConfig', typ: u(undefined, null) },
      { json: 'code', js: 'code', typ: u(undefined, '') },
    ],
    false
  ),
};
