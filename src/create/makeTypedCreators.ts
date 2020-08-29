import { CreateFn } from "../types";
import makeArrayCreators from "../array/makeArrayCreators";
import makeStringCreators from "../string/makeStringCreators";
import { isPlainObject } from "ramda-adjunct";
import makeObjectCreators from '../object/makeObjectCreators';
import makeBooleanCreators from "../boolean/makeBooleanCreators";
import makeNumberCreators from "../number/makeNumberCreators";

function makeTypedCreators<L>(leafState: L, path: (string | number)[]): CreateFn<any> {
  // Array creators
  if (Array.isArray(leafState)) {
    return makeArrayCreators(leafState, path)
  }

  // String creators
  if (typeof leafState === 'string') {
    return makeStringCreators(leafState, path)
  }

  if (typeof leafState === 'boolean') {
    return makeBooleanCreators(leafState, path)
  }

  if (typeof leafState === 'number') {
    return makeNumberCreators(leafState, path)
  }

  // Object creators
  if (isPlainObject(leafState)) {
    return makeObjectCreators(leafState, path)
  }

  return (_?: string) => ({})
}

export default makeTypedCreators