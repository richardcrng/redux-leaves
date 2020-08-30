import { isNotUndefined } from "ramda-adjunct";
import { camelCase, constantCase } from 'change-case';
import { ActionWithPayload, Action } from "../types"

const makeCreatorOfTypeFromPath = (path: (string | number)[], custom: boolean = false) => (passedType?: string) => {
  const makeType = passedType
    ? (_: string) => passedType
    : (str: string) => [...path, constantCase(str)].join('/')

  function creatorOfType<
    PayloadT,
    CreatorKeyT extends string = string
  >(
    str: CreatorKeyT,
    payload: PayloadT,
    typeOverload?: string
  ): ActionWithPayload<PayloadT>

  function creatorOfType<
    PayloadT,
    CreatorKeyT extends string = string
  >(str: CreatorKeyT): Action<CreatorKeyT>

  function creatorOfType<
    PayloadT,
    CreatorKeyT extends string = string
  >(str: CreatorKeyT, payload?: PayloadT, typeOverload?: string) {
    return {
      type: typeOverload || makeType(str),
      leaf: {
        path,
        CREATOR_KEY: constantCase(str),
        creatorKey: camelCase(str),
        custom
      },
      ...isNotUndefined(payload) ? { payload } : {}
    }
  }
  
  return creatorOfType
}

export default makeCreatorOfTypeFromPath