export interface LeafActionData {
  path: (string | number)[]
  creatorKey: string
  CREATOR_KEY: string
  compound?: false
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

export {
  LeafStandardAction as LSA,
  LeafStandardActionWithPayload as LSAWithPayload,
  LeafStandardActionWithPayload as LSAwP,
}