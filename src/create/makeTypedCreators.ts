import { ArrayCreators, CreateFn } from "../types";
import makeArrayCreators from "../array/makeArrayCreators";
import makeStringCreators from "../string/makeStringCreators";
import { isPlainObject } from "ramda-adjunct";
import makeObjectCreators from '../object/makeObjectCreators';

// function makeTypedCreators<L extends Array<unknown>>(leafState: L, path: (string | number)[]): CreateFn<ArrayCreators>

// function makeTypedCreators<L extends any>(leafState: L, path: (string | number)[]): CreateFn<{}>

function makeTypedCreators<L>(leafState: L, path: (string | number)[]): CreateFn<any> {
  // Array creators
  if (Array.isArray(leafState)) {
    return makeArrayCreators(leafState, path)
  }

  // String creators
  if (typeof leafState === 'string') {
    return makeStringCreators(leafState, path)
  }

  // Object creators
  if (isPlainObject(leafState)) {
    return makeObjectCreators(leafState, path)
  }

  return (_?: string) => ({})
}

export default makeTypedCreators