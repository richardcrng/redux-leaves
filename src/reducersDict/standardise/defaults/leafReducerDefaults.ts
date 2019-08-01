import LeafActionData from "../../../types/Leaf/Action/Data";

const argsToPayload = (first: any) => first

const actionType = (leaf: LeafActionData) : string => {
  const { path, condition, CREATOR_KEY } = leaf;
  const suffix = condition
    ? `${condition}.${CREATOR_KEY}`
    : CREATOR_KEY
  return [...path, suffix].join('/')
}

const mutate = false

export const leafReducerDefaults = {
  argsToPayload,
  actionType,
  mutate
}