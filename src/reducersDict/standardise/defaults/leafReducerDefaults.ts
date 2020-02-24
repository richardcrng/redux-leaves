import { LeafActionData } from "../../../types/action.type";

const argsToPayload = (first?: any) => first

const actionType = (leaf: LeafActionData) : string => {
  const { path, CREATOR_KEY } = leaf;
  return [...path, CREATOR_KEY].join('/')
}

const mutate = false

const leafReducerDefaults = {
  argsToPayload,
  actionType,
  mutate
}

export default leafReducerDefaults