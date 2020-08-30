export interface LeafActionData {
  path: (string | number)[]
  creatorKey: string
  CREATOR_KEY: string
  compound?: boolean
  custom: boolean
}

export interface LeafStandardAction<PayloadT = unknown> {
  type: string,
  leaf: LeafActionData,
  payload?: PayloadT
}

export interface LeafStandardActionWithPayload<PayloadT> extends LeafStandardAction<PayloadT> {
  payload: PayloadT
}

export interface LeafCompoundAction extends LeafStandardActionWithPayload<(LeafStandardAction | LeafCompoundAction)[]> {
  leaf: LeafActionData & {
    compound: true,
    bundled: string[]
  }
}

export function isLeafCompoundAction(action: LeafStandardAction): action is LeafCompoundAction {
  return !!action.leaf.compound
}

export {
  LeafStandardAction as LSA,
  LeafStandardActionWithPayload as LSAWithPayload,
  LeafStandardActionWithPayload as LSAwP,
}