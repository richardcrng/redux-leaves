export interface LeafActionData<CK extends string = string> {
  path: (string | number)[]
  creatorKey: string
  CREATOR_KEY: string
  compound?: false
  custom?: boolean
}

export interface LeafStandardAction<CK extends string = string, P = unknown> {
  type: string,
  leaf: LeafActionData<CK>,
  payload?: P
}

export interface LSAWithPayload<P, CK extends string = string> extends LeafStandardAction<CK, P> {
  payload: P
}