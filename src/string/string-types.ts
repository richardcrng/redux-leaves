import { LSAWithPayload, LeafStandardAction } from "../types";

export enum StringCreatorKeys {
  CONCAT = 'CONCAT'
}

export type StringCreators<S = unknown, T = unknown> = {
  concat(str: string): LSAWithPayload<string, StringCreatorKeys.CONCAT>
}

export type StringActions<K extends keyof StringCreators> = ReturnType<StringCreators[K]>

export function isStringConcatAction(action: LeafStandardAction): action is StringActions<'concat'> {
  return action.leaf.CREATOR_KEY === StringCreatorKeys.CONCAT
}