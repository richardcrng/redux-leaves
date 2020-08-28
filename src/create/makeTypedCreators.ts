import { ArrayCreators, ArrayCreatorKeys, CreateFn } from "../types";
import makeCreatorOfTypeFromPath from './makeCreatorOfTypeFromPath';
import makeArrayCreators from "../array/makeArrayCreators";

function makeTypedCreators<L extends Array<unknown>>(leafState: L, path: (string | number)[]): CreateFn<ArrayCreators>

function makeTypedCreators<L extends any>(leafState: L, path: (string | number)[]): CreateFn<{}>

function makeTypedCreators<L>(leafState: L, path: (string | number)[]): CreateFn<any> {
  // Array leafState
  if (Array.isArray(leafState)) {
    return makeArrayCreators(leafState, path)
  }

  return (_?: string) => ({})
}

export default makeTypedCreators