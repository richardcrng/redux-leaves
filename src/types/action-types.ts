export interface LeafActionData<CreatorKeyT extends string = string> {
  path: (string | number)[]
  creatorKey: string
  CREATOR_KEY: string
  compound?: false
  custom?: boolean
}

export interface LeafStandardAction<CreatorKeyT extends string = string, PayloadT = unknown> {
  type: string,
  leaf: LeafActionData<CreatorKeyT>,
  payload?: PayloadT
}

export interface LeafStandardActionWithPayload<PayloadT, CreatorKeyT extends string = string> extends LeafStandardAction<CreatorKeyT, PayloadT> {
  payload: PayloadT
}

export {
  LeafStandardAction as LSA,
  LeafStandardActionWithPayload as LSAWithPayload,
  LeafStandardActionWithPayload as LSAwP
}